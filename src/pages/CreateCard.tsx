import { Button } from "@/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditorJS, { EditorConfig } from "@editorjs/editorjs";
import tools from "@/components/toolsEditor.tsx";
import Editor from "@/components/Editor.tsx";

function CreateCard() {
  const frontEditor = new EditorJS({
    holder: "frontEditor",
    tools: tools,
  } as EditorConfig);
  const backEditor = new EditorJS({
    holder: "backEditor",
    tools: tools,
  } as EditorConfig);

  return (
    <>
      <div className="flex justify-between gap-4 mb-4 md:mb-0">
        <div>
          <Select>
            <SelectTrigger className="w-[180px] md:w-[240px]">
              <SelectValue placeholder="Select card set" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="set 1">Set 1</SelectItem>
              <SelectItem value="set 2">Set 2</SelectItem>
              <SelectItem value="set 3">Set 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">Discard</Button>
          <Button>Save</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8">
        <Editor id="frontEditor" title="Front side" />
        <Editor id="backEditor" title="Back side" />
      </div>
    </>
  );
}

export default CreateCard;
