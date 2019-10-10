interface IRootState {
  auth: IAuthState;
}

interface IAuthState {
  uid: string;
  isUser: boolean;
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
}
