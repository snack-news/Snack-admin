import { IContent } from "@/@types/models/News";

interface IRootState {
  auth: IAuthState;
  news: INewsState;
}

interface IAuthState {
  uid: string;
  isUser: boolean;
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
}

interface INewsState {
  items: IContent[];
  totalItemCount: number;
}
