export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        /** Run mode development or production */
        NODE_ENV: string
        /** The port of HTTP server */
        HTTP: string
        /** The URL to redis server DB */
        REDIS: string
        /** The URL to mongo server DB */
        MONGO: string
        /** The database name on mongo */
        MONGODB: string
    }
  }
}
