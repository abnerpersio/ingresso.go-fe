export const queryKeys = {
  user: {
    profile: ['loggedUser', 'profile'],
  },
  invites: {
    list: (celebrationId: string) => ['invites', celebrationId],
  },
  movies: {
    list: ['movies'],
  },
};
