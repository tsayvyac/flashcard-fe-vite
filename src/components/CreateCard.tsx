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
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import CardSetService, { Set } from "@/api/CardSetService.ts";
import LoadingIndicator from "@/components/LoadingIndicator.tsx";
import Block from "@/components/ui/block.tsx";
import { Label } from "@/components/ui/label.tsx";
import FlashcardService, { Flashcard } from "@/api/FlashcardService.ts";
import { useToast } from "@/components/ui/use-toast.ts";

interface CreateCardProps {
  idOfSet: number;
  addNewCard: (newCard: Flashcard) => void;
  isUpdate: {
    isUpd: boolean;
    updateCard: (updatedCard: Flashcard) => void;
    idOfCard: number;
    front: string;
    back: string;
  };
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

function CreateCard({
  idOfSet,
  addNewCard,
  isUpdate,
  setIsDialogOpen,
}: CreateCardProps) {
  const [setInfo, setSetInfo] = useState<Set[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [selected, setSelected] = useState<number>(idOfSet ? idOfSet : 0);
  const frontEditorRef = useRef<null | EditorJS>(null);
  const backEditorRef = useRef<null | EditorJS>(null);
  const isFrontReady = useRef<boolean>(false);
  const isBackReady = useRef<boolean>(false);
  const { toast } = useToast();
  useEffect(() => {
    if (!isPending) {
      if (!isFrontReady.current) {
        const frontBlocks = isUpdate.front ? JSON.parse(isUpdate.front) : null;
        const front = new EditorJS({
          holder: "frontEditor",
          tools: tools,
          placeholder: "Enter a text for front side",
          data: {
            blocks: frontBlocks,
          },
        } as EditorConfig);
        isFrontReady.current = true;
        frontEditorRef.current = front;
      }
      if (!isBackReady.current) {
        const backBlocks = isUpdate.back ? JSON.parse(isUpdate.back) : null;
        const back = new EditorJS({
          holder: "backEditor",
          tools: tools,
          placeholder: "Enter a text for back side",
          data: {
            blocks: backBlocks,
          },
        } as EditorConfig);
        isBackReady.current = true;
        backEditorRef.current = back;
      }
    }

    const fetchAll = async () => {
      await CardSetService.getAllCardSets().then((res) => {
        setSetInfo(res);
        setIsPending(false);
      });
    };

    void fetchAll();
  }, [isPending, isUpdate.back, isUpdate.front]);

  const handleSaveOrUpdate = async (
    isNewCard: boolean,
    isContinue: boolean
  ) => {
    const frontData = await frontEditorRef.current?.save();
    const backData = await backEditorRef.current?.save();
    if (
      frontData !== undefined &&
      backData !== undefined &&
      selected !== 0 &&
      frontData.blocks.length !== 0 &&
      backData.blocks.length !== 0
    ) {
      const req = {
        front: JSON.stringify(frontData.blocks),
        back: JSON.stringify(backData.blocks),
        cardSetId: selected,
      };
      if (isNewCard) {
        void FlashcardService.createFlashcard(req).then((res) =>
          addNewCard(res.data)
        );
      } else {
        void FlashcardService.updateFlashcard(isUpdate.idOfCard, req).then(
          (res) => isUpdate.updateCard(res.data)
        );
      }
      toast({
        description: `Flashcard was successfully created!`,
      });
      if (isContinue) {
        frontEditorRef.current?.clear();
        backEditorRef.current?.clear();
      } else {
        setIsDialogOpen(false);
      }
    } else {
      toast({
        variant: "destructive",
        description: "Please fill in all fields.",
      });
    }
  };

  if (isPending) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <div className="flex justify-between gap-2 mb-4 md:mb-4 md:gap-4">
        <div>
          {setInfo.length === 0 ? (
            <div className="text-destructive">
              Create at least one card set!
            </div>
          ) : (
            <>
              <Label className="opacity-50 font-normal">Select a set:</Label>
              <Select
                value={`${selected}`}
                onValueChange={(v) => setSelected(+v)}
              >
                <SelectTrigger className="w-[120px] md:w-[240px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {setInfo.map((info) => (
                    <SelectItem key={info.id} value={`${info.id}`}>
                      {info.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>
        <div className="flex gap-4">
          {isUpdate.isUpd ? (
            <Block onClick={() => handleSaveOrUpdate(false, false)}>
              Update
            </Block>
          ) : (
            <>
              <CoTooltip description="Save this flashcard and close dialog">
                <Block
                  disabled={setInfo.length === 0}
                  onClick={() => handleSaveOrUpdate(true, false)}
                >
                  Save
                </Block>
              </CoTooltip>
              <CoTooltip description="Save this flashcard and create another new flashcard">
                <Block
                  disabled={setInfo.length === 0}
                  onClick={() => handleSaveOrUpdate(true, true)}
                >
                  Save + Add
                </Block>
              </CoTooltip>
            </>
          )}
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
