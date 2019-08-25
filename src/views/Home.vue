<template>
  <div class="home">
    <div class="home__editor">
      <editor @onSaveHandler="onSaveHandler"/>
    </div>
    <div class="home__view">
      {{ output }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Editor from '@/components/Editor.vue';

@Component({
  components: {
    Editor
  }
})
export default class Home extends Vue {
  output: string;
  constructor () {
    super();
    this.output = '';
  }
  onSaveHandler (output: string): void {
    console.log(output);
    this.output = output;
  }
}
</script>
<style lang="scss" scoped>
  .home {
    display: flex;
    justify-content: space-between;
    height: 100%;
    > div {
      flex: 1; /* flex: 1 1 0 */
      overflow: auto;
    }
    .home__editor {
      box-sizing: border-box;
      width: 500px;
      padding: 20px;
      border: 1px solid gray;
      margin-right: 15px;
    }
    .home__view {
      box-sizing: border-box;
      width: 500px;
      border: 1px solid gray;
      margin-right: 15px;
    }
    .home_output-view {
      box-sizing: border-box;
      width: 500px;
      border: 1px solid gray;
    }
  }
</style>
