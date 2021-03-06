import * as directives from './directives';
import * as filters from './filters';

import { VueConstructor } from 'vue';

export default {
  install (Vue: VueConstructor) {
    for(let directive in directives) {
      Vue.directive(directive, (<any>directives)[directive]);
    }
    for (let filter in filters) {
        Vue.filter(filter, (<any>filters)[filter]);
    }
  }
};


function test (str: string) {

}

