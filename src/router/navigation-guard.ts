import { Route } from "vue-router";
import { Next } from "@/@types/library/vue-router";
import store from "@/store";
import { checkPermission } from "@/api/auth";

export default async function (to: Route, from: Route, next: Next) {
  const isRequiredAuthRouter = to.matched.some(({ meta }) => meta.isRequiredAuth);
  if (isRequiredAuthRouter) {
    const userInformation = await store.dispatch('auth/fetchUserInformation');
    if (userInformation) {
      const isAuthorization = await checkPermission(userInformation.uid);
      if (isAuthorization) {
        return next();
      }
    }

    return next({ name: "Signin" });
  }
  // @TODO 이후 중복 로직 제거
  const userInformation = await store.dispatch('auth/fetchUserInformation');
  if (userInformation) {
    const isAuthorization = await checkPermission(userInformation.uid);
    if (isAuthorization) {
      return next({ name: "ArticleList" });
    }
  }

  return next();
}
