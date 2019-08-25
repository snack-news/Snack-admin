declare module '@editorjs/header' {
  import { ToolSettings } from "@editorjs/editorjs";
  import { ToolConstructable } from "@editorjs/editorjs";

  const k: ToolConstructable | ToolSettings;
  export = k;
}
