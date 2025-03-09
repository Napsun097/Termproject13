const isProd = process.env.NODE_ENV === 'production'

const config = {
  isProd,
  serverUrlPrefix: isProd ? 'https://w13-admin.pupasoft.com/api' : 'http://localhost:1337/api',
  serverUrl: isProd ? 'https://w13-admin.pupasoft.com' : 'http://localhost:1337'
}

export default config;
