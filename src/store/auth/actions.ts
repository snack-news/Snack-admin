import { ActionContext, ActionTree } from "vuex";
import { whoAmI } from "@/api/auth";

type AuthContext = ActionContext<IAuthState, IRootState>;

async function fetchUserInformation (context: AuthContext): Promise<boolean> {
  const userInformation = await whoAmI();
  if (userInformation) {
    const { displayName, email, emailVerified, photoURL } = userInformation;
    context.commit('setUserInformation', { displayName, email, emailVerified, photoURL });

    return true;
  }

  return false;
}

export default <ActionTree<IAuthState, IRootState>> {
  fetchUserInformation
}
