## The project features include:

- User authentication and authorization using JWT tokens.
- Ability to change passwords.
- Ability to search media or person.
- Ability to add comments for media.
- Ability to add media to favorites.
- Ability to view details for media.
- Ability to sort media by popularity and top ratings.

## Configuration
server/.env : 

```shell
 MONGODB_URL="Your connection to MongoDB"
 PORT=5000
 TOKEN_SECRET="Your random secret key"
 TMDB_BASE_URL=https://api.themoviedb.org/3
 TMDB_KEY="Your tmdb api key"
```

client/src/api/privateClient(publicClient):
```shell
 const baseURL = "http://localhost:5000//api/v1/"
```

## Building
client:
```shell
 cd client
 npm i
 npm start
```
server:
```shell
 cd server
 npm i
 npm start
```

# Resource
[Create React App](https://create-react-app.dev/)<br>
[Material UI](https://create-react-app.dev/)<br>
[React Toastify](https://github.com/fkhadra/react-toastify)<br>
[Mongoose](https://mongoosejs.com/)<br>
[ExpressJS](https://expressjs.com/)<br>
[Express Validator](https://express-validator.github.io/docs/)<br>
[React Router](https://reactrouter.com/)<br>
[Formik](https://formik.org/)<br>
[Yup](https://github.com/jquense/yup/)<br>
[Axios](https://axios-http.com/)<br>
[ThemovieDB](https://www.themoviedb.org/)<br>
[Swiper](https://swiperjs.com/)<br>
[JWT](https://github.com/auth0/node-jsonwebtoken)<br>

# Preview
![movierk vercel app_ (1)](https://github.com/roman-kalistratov/movieRK/assets/80212286/c0f647cb-6604-4e48-a556-d24b11431a40)
![movierk vercel app_ (4)](https://github.com/roman-kalistratov/movieRK/assets/80212286/10b79660-4f4b-4e2c-b1ec-d748ef3d25dc)
![movierk vercel app_](https://github.com/roman-kalistratov/movieRK/assets/80212286/74fd7d28-e0b5-46f9-8388-438bf179d2be)
![movierk vercel app_ (1)](https://github.com/roman-kalistratov/movieRK/assets/80212286/54b5cc90-df48-437a-8982-02000a6112a1)
![movierk vercel app_](https://github.com/roman-kalistratov/movieRK/assets/80212286/9d9a9a29-cd9d-4180-acd3-99854b8e1a87)


