import { Route } from "vue-router";
import { Next } from "@/@types/library/vue-router";
import store from "@/store";

export default async function (to: Route, from: Route, next: Next) {
  const isRequiredAuthRouter = to.matched.some(({ meta }) => meta.isRequiredAuth);
  if (isRequiredAuthRouter) {
    const isExistUserInformation = await store.dispatch('fetchUserInformation');
    if (!isExistUserInformation) {
      next({ name: "Signin" });
    } else {
      next();
    }
  }

  next();
}
