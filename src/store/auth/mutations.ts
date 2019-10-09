import { MutationTree } from "vuex";

interface IUserInformation {
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
}

function setUserInformation (state: IAuthState, payload: IUserInformation) {
  state.displayName = payload.displayName;
  state.email = payload.email;
  state.emailVerified = payload.emailVerified;
  state.photoURL = payload.photoURL;
}

export default <MutationTree<IAuthState>> {
  setUserInformation
}
