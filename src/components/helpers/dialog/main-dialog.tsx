"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useLoadingState } from "@/lib/helpers/is-loading-state";
import { useDialogStore } from "@/lib/stores/dialog-store";
import { cn } from "@/lib/utils";
import { CircleQuestionMark } from "lucide-react";

const MainDialog = () => {
  const { type, open, title, desc, closeConfirm, onConfirm } = useDialogStore();

  const { isLoading, setIsLoading } = useLoadingState();

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!value) closeConfirm();
      }}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia
            className={cn(
              type === "danger" &&
                "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive",
              isLoading && "animate-pulse",
            )}
          >
            <CircleQuestionMark />
          </AlertDialogMedia>
          <AlertDialogTitle className={isLoading ? "animate-pulse" : ""}>
            {title ?? "-"}
          </AlertDialogTitle>
          <AlertDialogDescription className={isLoading ? "animate-pulse" : ""}>
            {desc ?? "-"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            type="button"
            variant={"outline"}
            disabled={isLoading}
            onClick={() => closeConfirm()}
          >
            Batalkan
          </Button>
          <Button
            type="button"
            variant={type === "danger" ? "destructive" : "default"}
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await onConfirm?.();
              setIsLoading(false);

              closeConfirm();
            }}
          >
            Ya, Lakukan Aksi
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MainDialog;
