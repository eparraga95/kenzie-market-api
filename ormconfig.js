module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "ssl": process.env.NODE_ENV === 'production' 
           ? { rejectUnauthorized: false } 
           : false,
    "synchronize": true,
    "logging": false,
    "entities": process.env.NODE_ENV === 'production'
                ? ["dist/entities/**/*.js"]
                : ["src/entities/**/*.ts"],
    "migrations": process.env.NODE_ENV === 'production'
                  ? ["dist/migration/**/*.js"]
                  : ["src/migration/**/*.ts"]
}