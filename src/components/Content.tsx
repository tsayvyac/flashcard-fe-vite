export interface BlockProp {
  id: string;
  type: string;
  data: {
    text: string;
    level?: number;
    style?: string;
    embed?: string;
    items?: string[];
    url?: string;
    caption?: string;
    withHeadings?: boolean;
    content?: string[][];
    code?: string;
  };
  tunes?: {
    align: {
      alignment: string;
    };
  };
}

interface ContentProps {
  block: BlockProp;
}

function Content({ block }: ContentProps) {
  let content = "";
  let text: string;
  let align: string;
  let listItems = "";
  let caption: string;
  let table = "<table class='w-full border-b border-t'>";
  switch (block.type) {
    case "paragraph": {
      text = block.data.text;
      align = block.tunes?.align.alignment ?? "";
      content = `<div style="text-align: ${align}">${text}</div>`;
      break;
    }
    case "header": {
      const level = block.data.level;
      text = block.data.text;
      align = block.tunes?.align.alignment ?? "";
      content = `<h${level} style="text-align: ${align}">${text}</h>`;
      break;
    }
    case "list": {
      const style = block.data.style;
      const items = block.data.items ?? [];
      items.map((item) => {
        listItems += `<li class="list-group-item">${item}</li>`;
      });
      style === "unordered"
        ? (content = `<ul class="ml-5 list-disc">${listItems}</ul>`)
        : (content = `<ol class="ml-5 list-decimal">${listItems}</ol>`);
      break;
    }
    case "simpleImage": {
      const url = block.data.url;
      caption = block.data.caption ?? "";
      const img = `
        <img src=${url} alt=${caption}>
        <small class="italic">${caption}</small>
      `;
      content = `<div class="flex flex-col items-center">${img}</div>`;
      break;
    }
    case "table": {
      if (block.data.withHeadings) {
        table += "<thead><tr class='text-left border-b-2 border-t'>";
        for (const heading of block.data.content?.[0] ?? []) {
          table += `<th class="px-4">${heading}</th>`;
        }
        table += "</tr></thead>";
      }
      table += "<tbody>";
      for (
        let i = block.data.withHeadings ? 1 : 0;
        i < (block.data.content?.length ?? 0);
        i++
      ) {
        table += "<tr>";
        for (const cell of block.data.content?.[i] ?? []) {
          table += `<td class="px-4 border-b border-t">${cell}</td>`;
        }
        table += "</tr>";
      }
      table += "</tbody></table>";
      content = table;
      break;
    }
    case "code": {
      const code = `<code class="text-xs">${block.data.code}</code>`;
      content = `<div class="bg-muted rounded pl-2">${code}</div>`;
      break;
    }
    case "embed": {
      caption = block.data.caption ?? "";
      const embed = `
        <iframe width="315" height="200" allowfullscreen src="${block.data.embed}"/>
         <small class="italic">${caption}</small>
      `;
      content = `<div class="flex flex-col items-center">${embed}</div>`;
      break;
    }
    default:
      break;
  }
  return <div className="pb-3" dangerouslySetInnerHTML={{ __html: content }} />;
}

export default Content;
