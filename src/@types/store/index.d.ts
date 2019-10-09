interface IRootState {
  auth: IAuthState;
}

interface IAuthState {
  isUser: boolean;
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
}
