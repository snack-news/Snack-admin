declare module '@editorjs/header' {
  import { SanitizerConfig, PasteEvent, API, BlockToolData, ToolConfig, BaseToolConstructable, BaseTool} from "@editorjs/editorjs";
  import { ConversionConfig } from "@editorjs/editorjs/types/configs";

  interface HeaderTool extends BaseTool {
    normalizeData (data: { text: string; level: number; }): { text: string; level: number; };
    renderSettings(): HTMLElement;
    setLevel(level: number): void;
    merge(blockData: BlockToolData): void;
    validate(blockData: BlockToolData): boolean;
    save(block: HTMLElement): BlockToolData;
    getTag(): HTMLElement;
    onPaste(event: PasteEvent): void;
    currentLevel: number;
    defaultLevel: number;
    levels: { number: number; tag: string; svg: HTMLOrSVGElement }[];
    pasteConfig: { tags: string[] };
    toolbox: { icon: string; title: 'Header' };
    data: { text: string; level: number; };
    sanitize: SanitizerConfig;
    conversionConfig: ConversionConfig;
  }
  interface HeaderConstructor extends BaseToolConstructable {
    new (config: {api: API, config: ToolConfig, data: BlockToolData}): HeaderTool;
  }

  const k: HeaderConstructor;
  export = k;
}
