<template>
  <div class="editor" id="codex-editor" />
</template>

<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";
  import EditorJS from "@editorjs/editorjs";
  import List from "@editorjs/list";
  import Header from "@editorjs/header";
  import ImageTool from "@editorjs/image";
  import Embed from "@editorjs/embed";
  import { INullable } from "@/@types/utility";
  import { OutputData } from "@editorjs/editorjs/types/data-formats/output-data";

  @Component({
    name: "Editor"
  })
  export default class Editor extends Vue {
    editorRef: INullable<EditorJS>;
    @Prop() value!: OutputData["blocks"];
    @Prop() msg!: string;

    constructor() {
      super();
      this.editorRef = null;
    }

    created() {
      const that = this;
      this.editorRef = new EditorJS({
        holderId: "codex-editor",
        minHeight: 292,
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
        },
        data: {
          blocks: this.value
        },
        onChange (): void {
          that.onChangeHandler();
        }
      });
    }

    async onChangeHandler () {
      if (!this.editorRef) {
        return;
      }
      try {
        const { blocks } = await this.editorRef.save();
        this.$emit("input", blocks);
      } catch (e) {
        console.log(e);
      }
    }
  }
</script>

<style scoped lang="scss">
  .editor {
    box-sizing: border-box;
    height: 100%;
    min-height: 300px;
    padding: 15px;
    border: solid 1px #0f0f0f;
    text-align: left;
    /deep/ .ce-block__content {
      max-width: unset;
      margin: 0;
      .cdx-block.ce-paragraph {
        padding: 0;
      }
    }
    /deep/ .ce-toolbar__plus {
      left: -66px;
    }
    /deep/ .codex-editor__redactor {
      padding-bottom: 0;
    }
  }
</style>

