import { ActionContext, ActionTree } from "vuex";
import { signoutService, whoAmI } from "@/api/auth";
import { INullable } from "@/@types/utility";
import { User } from "firebase";
import { IAuthState, IRootState } from "@/@types/store";

type AuthContext = ActionContext<IAuthState, IRootState>;

async function fetchUserInformation ({ commit }: AuthContext): Promise<INullable<User>> {
  const userInformation = await whoAmI();
  if (userInformation) {
    const { displayName, email, emailVerified, photoURL, uid } = userInformation;
    commit('setUserInformation', { uid, displayName, email, emailVerified, photoURL });

    return userInformation;
  }

  return null;
}

async function signout ({ commit }: AuthContext): Promise<void> {
  await signoutService();
  commit('destroyUserInformation');
}

export default <ActionTree<IAuthState, IRootState>> {
  signout,
  fetchUserInformation
}
