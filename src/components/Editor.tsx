import { Card, CardContent } from "@/components/ui/card.tsx";

interface EditorProps {
  id: string;
  title: string;
}

function Editor({ id, title }: EditorProps) {
  return (
    <>
      <div>
        <p className="text-2xl font-semibold leading-none tracking-tight mb-4">
          {title}
        </p>
        <Card>
          <CardContent className="mt-4">
            <div id={id} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Editor;
