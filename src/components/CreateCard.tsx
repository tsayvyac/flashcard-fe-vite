import { Button } from "@/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import EditorJS, { EditorConfig } from "@editorjs/editorjs";
import tools from "@/components/toolsEditor.tsx";
import Editor from "@/components/Editor.tsx";
import CoTooltip from "@/components/CoTooltip.tsx";

function CreateCard() {
  const frontEditor = new EditorJS({
    holder: "frontEditor",
    tools: tools,
    placeholder: "Enter a text for front side",
  } as EditorConfig);
  const backEditor = new EditorJS({
    holder: "backEditor",
    tools: tools,
    placeholder: "Enter a text for back side",
  } as EditorConfig);

  return (
    <>
      <div className="flex justify-between gap-2 mb-4 md:mb-4 md:gap-4">
        <div>
          <Select>
            <SelectTrigger className="w-[120px] md:w-[240px]">
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
          <CoTooltip
            trigger={<Button>Save</Button>}
            description="Save this flashcard and close dialog"
          />
          <CoTooltip
            trigger={<Button>Save + Add</Button>}
            description="Save this flashcard and create another new flashcard"
          />
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
