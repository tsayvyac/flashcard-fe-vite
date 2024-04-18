import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip.tsx";

interface TooltipProps {
  trigger: React.ReactNode;
  description: string;
  className?: string;
}

function CoTooltip({ trigger, description, className }: TooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={className}>{trigger}</TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CoTooltip;
