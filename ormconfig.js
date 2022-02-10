module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "ssl": process.env.NODE_ENV === 'production' 
           ? { rejectUnauthorized: false } 
           : false,
    "synchronize": true,
    "logging": false,
    "entities": process.env.NODE_ENV === 'production'
                ? ["dist/src/entities/**/*.js"]
                : ["src/entities/**/*.ts"],
    "migrations": process.env.NODE_ENV === 'production'
                  ? ["dist/src/migration/**/*.js"]
                  : ["src/migration/**/*.ts"]
}