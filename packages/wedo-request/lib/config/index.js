import devConfig from './config.dev';
import prodConfig from './config.dev';
const config = process.env.NODE_ENV === "production"
    ? prodConfig
    : devConfig;
export default config;
