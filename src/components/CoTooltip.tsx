import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip.tsx";

interface TooltipProps {
  children: React.ReactNode;
  description: string;
  className?: string;
}

function CoTooltip({ children, description, className }: TooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger className={className}>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default CoTooltip;
