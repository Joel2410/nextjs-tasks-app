export const API =
  process.env.NODE_ENV == "development"
    ? process.env.DEV_API
    : process.env.PROD_API;
