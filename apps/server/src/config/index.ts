import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;

if (!API_VERSION || !PORT) {
  throw new Error("[config]: Configuration details missing");
}

type Environment = "development" | "production";

interface Config {
  apiVersion: string;
  port: number;
}

const development = {
  apiVersion: API_VERSION,
  port: +PORT,
};

const production = {
  apiVersion: API_VERSION,
  port: +PORT,
};

const config: Record<Environment, Config> = {
  development,
  production,
};

function getConfig() {
  const environment = (process.env.NODE_ENV || "development") as Environment;
  return config[environment];
}

export default getConfig();
