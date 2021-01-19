# Vue-Time

A simplified SPA clone of Toggl.com

## Build Setup

### Authentication Server Setup

Auth server must be deployed on port 3333.
For Quick Setup Use AdonisJS (JWT, SQLite, CORS):

```bash
$ git clone https://github.com/do-community/jwt-auth-api.git
$ cd jwt-auth-api
$ npm install
$ mv .env.example .env
$ npx @adonisjs/cli@4.0.12 key:generate
$ generated: unique APP_KEY
$ npx @adonisjs/cli@4.0.12 migration:run
$ npm start
```

### Vue-Time Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
