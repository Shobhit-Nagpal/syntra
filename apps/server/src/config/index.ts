import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;
const ALLOWED_HOSTS = process.env.ALLOWED_HOSTS
  ? process.env.ALLOWED_HOSTS.split(",")
  : new Array<string>();

if (!API_VERSION || !PORT) {
  throw new Error("[config]: Configuration details missing");
}

type Environment = "development" | "production";

interface Config {
  apiVersion: string;
  port: number;
  allowedHosts: Array<string>;
}

const development = {
  apiVersion: API_VERSION,
  port: +PORT,
  allowedHosts: ALLOWED_HOSTS,
};

const production = {
  apiVersion: API_VERSION,
  port: +PORT,
  allowedHosts: ALLOWED_HOSTS,
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
