export const ROUTES = {
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    authCallback: '/auth/callback',
    activateAccount: '/activate-account',
    forgotPassword: '/forgot-password',
  },
  dashboard: {
    home: '/',
    movieDetails: '/movies/:movieId',
    buySession: '/sessions/:sessionId/buy',
  },
};
