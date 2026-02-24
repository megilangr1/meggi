"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DeletePengguna } from "@/lib/actions/action-pengguna";
import { useDialogStore } from "@/lib/stores/dialog-store";
import { doAlert } from "../alert";

type DeleteButtonProps = {
  id: string;
};

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { openDialog } = useDialogStore();

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() =>
        openDialog({
          type: "danger",
          title: "Hapus Data Ini ?",
          desc: "Data ini akan dihapus secara permanen. Lanjutkan ?",
          onConfirm: async () => {
            try {
              const action = await DeletePengguna({ id });

              if (!action.success) {
                doAlert(0, action.message);
                return;
              }

              doAlert(3, action.message);
            } catch (error) {
              console.error(error);
            }
          },
        })
      }
    >
      Hapus Data
    </DropdownMenuItem>
  );
};

export default DeleteButton;
