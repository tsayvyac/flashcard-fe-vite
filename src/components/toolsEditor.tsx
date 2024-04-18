import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import SimpleImage from "@editorjs/simple-image";
import NestedList from "@editorjs/nested-list";
import Checklist from "@editorjs/checklist";
import AlignmentBlockTune from "editorjs-text-alignment-blocktune";
import Underline from "@editorjs/underline";
import Paragraph from "@editorjs/paragraph";

const EDITOR_JS_TOOLS = {
  embed: {
    class: Embed,
  },
  table: Table,
  code: Code,
  inlineCode: InlineCode,
  header: {
    class: Header,
    inlineToolbar: true,
    tunes: ["align"],
    config: {
      levels: [1, 2, 3],
      placeholder: "Enter a header",
      defaultLevel: 1,
    },
  },
  marker: Marker,
  simpleImage: SimpleImage,
  nestedList: NestedList,
  checklist: Checklist,
  align: {
    class: AlignmentBlockTune,
    config: {
      default: "left",
    },
  },
  underline: Underline,
  paragraph: {
    class: Paragraph,
    tunes: ["align"],
  },
};

export default EDITOR_JS_TOOLS;
