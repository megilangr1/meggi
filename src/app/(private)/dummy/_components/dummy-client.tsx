"use client";

import { doAlert } from "@/components/helpers/alert";
import { Button } from "@/components/ui/button";
import { sleep } from "@/lib/helpers/is-loading-state";
import { useDialogStore } from "@/lib/stores/dialog-store";

const DummyClient = () => {
  const { openDialog } = useDialogStore();

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() =>
          openDialog({
            type: "danger",
            title: "Testing",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aperiam explicabo amet? Reiciendis, laborum repellat?",
            onConfirm: async () => {
              await sleep(3000);
              doAlert(4, "Dummy ~");
            },
          })
        }
      >
        Test
      </Button>
    </div>
  );
};

export default DummyClient;
