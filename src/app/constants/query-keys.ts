export const queryKeys = {
  user: {
    profile: ['loggedUser', 'profile'],
  },
  invites: {
    list: (celebrationId: string) => ['invites', celebrationId],
  },
  waSettings: {
    status: (userId: string) => ['waSettings', userId],
  },
};
