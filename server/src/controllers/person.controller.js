import responseHandler from "../handlers/response.handler.js";
import axiosClient from "../axios/axios.client.js";

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await axiosClient.get(
      `${baseUrl}/person/${personId}?api_key=${key}`
    );

    responseHandler.ok(res, person);
  } catch {
    responseHandler.error(res);
  }
};

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    const medias = await axiosClient.get(
      `${baseUrl}/person/${personId}/combined_credits?api_key=${key}`
    );
    responseHandler.ok(res, medias);
  } catch {
    responseHandler.error(res);
  }
};

export default { personDetail, personMedias };
