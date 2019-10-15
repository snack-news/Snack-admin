import { Route } from "vue-router";
import { Next } from "@/@types/library/vue-router";
import store from "@/store";
import { checkPermission } from "@/api/auth";

export default async function (to: Route, from: Route, next: Next) {
  const isRequiredAuthRouter = to.matched.some(({ meta }) => meta.isRequiredAuth);
  const userInformation = await store.dispatch('auth/fetchUserInformation');
  if (isRequiredAuthRouter) {
    if (userInformation) {
      const isAuthorization = await checkPermission(userInformation.uid);
      if (isAuthorization) {
        return next();
      }
    }
    return next({ name: "Signin" });
  }

  if (userInformation) {
    const isAuthorization = await checkPermission(userInformation.uid);
    if (isAuthorization) {
      return next({ name: "ArticleList" });
    }
  }
  return next();
}
