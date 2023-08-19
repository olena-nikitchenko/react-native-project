export const selectUserData = state => state.auth;
export const selectIsCurrentUser = state => state.auth.isCurrentUser;
export const selectIsLoading = state => state.auth.isLoading;
export const selectStateLogin = state => state.auth.name;
export const selectStateAvatar = state => state.auth.avatar;
export const selectStateEmail = state => state.auth.email;
