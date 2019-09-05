<template>
  <div class="editor" id="codex-editor">
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, PropSync } from "vue-property-decorator";
  import EditorJS from "@editorjs/editorjs";
  import List from "@editorjs/list";
  import Header from "@editorjs/header";
  import ImageTool from "@editorjs/image";
  import Embed from "@editorjs/embed";
  import { INullable } from "@/@types/utility";

  @Component({
    name: "Editor"
  })
  export default class Editor extends Vue {
    test: INullable<EditorJS>;

    constructor() {
      super();
      this.test = null;
    }

    created() {
      this.test = new EditorJS({
        holderId: "codex-editor",
        tools: {
          header: Header,
          embed: {
            class: Embed,
            inlineToolbar: false,
            config: {
              services: {
                youtube: true
              }
            }
          },
          list: {
            class: List,
            inlineToolbar: true
          },
          image: {
            class: ImageTool
          }
        }
      });
    }

    @Prop() private msg!: string;

    onSaveHandler(): void {
      if (this.test) {
        this.test.save()
          .then(res => {
            alert("콘솔창 열어보면 JSON 형태로 볼수 있삼");
            console.log(res);
            this.$emit("onSaveHandler", JSON.stringify(res));
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .editor {
    text-align: left;
    height: 100%;
    border: solid 1px #0f0f0f;
  }
</style>
