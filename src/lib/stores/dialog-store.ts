import { create } from "zustand";

type DialogState = {
  type: "default" | "danger";
  open: boolean;
  title?: string;
  desc?: string;
  onConfirm?: () => void | Promise<void>;

  openDialog: (payload: {
    type: "default" | "danger";
    title?: string;
    desc?: string;
    onConfirm?: () => void | Promise<void>;
  }) => void;

  closeConfirm: () => void;
};

export const useDialogStore = create<DialogState>((set) => ({
  type: "default",
  open: false,
  title: undefined,
  desc: undefined,
  onConfirm: undefined,

  openDialog: ({ type, title, desc, onConfirm }) =>
    set({
      type: type,
      open: true,
      title,
      desc,
      onConfirm,
    }),
  closeConfirm: () =>
    set({
      type: "default",
      open: false,
      title: undefined,
      desc: undefined,
      onConfirm: undefined,
    }),
}));
