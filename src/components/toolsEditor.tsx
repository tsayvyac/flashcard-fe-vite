import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import SimpleImage from "@editorjs/simple-image";
import AlignmentBlockTune from "editorjs-text-alignment-blocktune";
import Underline from "@editorjs/underline";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
/* eslint-disable @typescript-eslint/no-unsafe-assignment*/

const EDITOR_JS_TOOLS = {
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
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
  image: {
    class: SimpleImage,
  },
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
