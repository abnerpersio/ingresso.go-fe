export const API = {
  auth: {
    signIn: '/v1/auth/sign-in',
    refreshToken: '/v1/auth/refresh-token',
    exchangeCode: '/v1/auth/code',
  },
  user: {
    profile: '/v1/user/profile',
  },
  movies: {
    list: '/v1/movies',
    details: '/v1/movies/:movieId',
    sessions: {
      list: '/v1/movies/:movieId/sessions',
      details: '/v1/movies/:movieId/sessions/:sessionId',
    },
  },
};
