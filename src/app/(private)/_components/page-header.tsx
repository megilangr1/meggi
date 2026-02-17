import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export interface ActionButton {
  url: string;
  icon?: LucideIcon;
  title: string;
  tooltip: string;
  variant?: "default" | "destructive" | "ghost" | "outline";
}

interface PageHeaderProps {
  icon?: LucideIcon;
  title: string;
  actionButton?: ActionButton;
}

const PageHeader = (props: PageHeaderProps) => {
  const { title, actionButton } = props;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-y-2 gap-x-1">
        <div className="flex-auto flex flex-col gap-2">
          <div className="inline-flex gap-3 items-center justify-start">
            {props.icon && (
              <props.icon className="shrink-0 size-5 sm:size-6 md:size-6" />
            )}

            <h1 className="flex-auto font-medium text-lg sm:text-xl md:text-xl">
              {title}
            </h1>
          </div>
        </div>

        {actionButton && (
          <div className="w-full sm:w-auto flex flex-row items-center justify-end self-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={actionButton.url}>
                    <Button
                      size={"xs"}
                      className="text-[10px] inline-flex items-center justify-center rounded-sm"
                      variant={actionButton.variant ?? "default"}
                    >
                      {actionButton.icon && (
                        <actionButton.icon className="shrink-0 size-3.5" />
                      )}
                      <div className="block">{actionButton.title}</div>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="me-2">
                  <p className="max-w-52 lg:max-w-full flex-wrap text-wrap whitespace-pre-wrap p-0">
                    {actionButton.tooltip}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      <hr className="hidden sm:block w-full border-t-2" />
    </div>
  );
};

export default PageHeader;
