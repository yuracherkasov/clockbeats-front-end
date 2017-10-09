const PRODUCTION = process.env.NODE_ENV === 'production';

export const ORIGIN = PRODUCTION ? 'https://api-clockbeats-staging.herokuapp.com' : 'http://localhost:8080';