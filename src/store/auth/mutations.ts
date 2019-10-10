import { MutationTree } from "vuex";

interface IUserInformation {
  uid: string;
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
  state.uid = payload.uid;
}

function destroyUserInformation (state: IAuthState) {
  state.displayName = "";
  state.email = "";
  state.emailVerified = false;
  state.photoURL = "";
}

export default <MutationTree<IAuthState>> {
  setUserInformation,
  destroyUserInformation
}
