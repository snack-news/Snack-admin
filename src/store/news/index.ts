import state from './states';
// import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const namespaced = true;

const newsStoreModule = {
  namespaced,
  state,
  // getters,
  actions,
  mutations
};

export default newsStoreModule;
