import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import auth from './auth';
import news from './news';
import { IRootState } from "@/@types/store";

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  modules: {
    auth,
    news,
  }
};

export default new Vuex.Store(store);
