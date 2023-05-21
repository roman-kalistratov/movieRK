import responseHandler from "../handlers/response.handler.js";
import axiosClient from "../axios/axios.client.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddlerware from "../middlewares/token.middleware.js";

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await axiosClient.get(
      `${baseUrl}/${mediaType}/${mediaCategory}?api_key=${key}&${page}`
    );

    return responseHandler.ok(res, response);
  } catch (err) {
    console.log(err);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await axiosClient.get(
      `${baseUrl}/genre/${mediaType}/list?api_key=${key}`
    );

    return responseHandler.ok(res, response);
  } catch(err) {
    console.log(err);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await axiosClient.get(
      `${baseUrl}/search/${
        mediaType === "people" ? "person" : mediaType
      }?api_key=${key}&page=${page}&query=${query}`
    );

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const params = { mediaType, mediaId };

    const media = await axiosClient.get(
      `${baseUrl}/${mediaType}/${mediaId}?api_key=${key}`
    );

    media.credits = await axiosClient.get(
      `${baseUrl}/${mediaType}/${mediaId}/credits?api_key=${key}`
    );

    media.videos = await axiosClient.get(
      `${baseUrl}/${mediaType}/${mediaId}/videos?api_key=${key}`
    );

    media.images = await axiosClient.get(
      `${baseUrl}/${mediaType}/${mediaId}/images?api_key=${key}`
    );

    const recommend = await axiosClient.get(
      `${baseUrl}/${mediaType}/${mediaId}/recommendations?api_key=${key}`
    );

    media.recommend = recommend.results;

    const tokenDecoded = tokenMiddlerware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel.find({ mediaId }).populate("user").sort("-createdAt");

    responseHandler.ok(res, media);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetail };