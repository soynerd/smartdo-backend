import env from 'dotenv'

env.config();


const credentials = {
    jwt : {
        secret: process.env.JWT_SECRET,
    },
    database: {
        url: process.env.DATABASE_URL,
        username: process.env.DATABASE_USERNAME ,
        password: process.env.DATABASE_PASSWORD ,
    },

    google : {
        clientID: process.env.GOOGLE_CLIENT_ID ,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },

    github : {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    baseUrl: process.env.BASE_URL,
    frontendUrl: process.env.FRONTEND_URL
}

export default credentials;