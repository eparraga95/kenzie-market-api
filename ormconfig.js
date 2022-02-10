module.exports = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "eduardo",
    "password": "1234",
    "database": "e6_db",
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