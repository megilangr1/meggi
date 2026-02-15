import {
  CircleCheckBig,
  CircleHelp,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { ExternalToast, toast } from "sonner";

export const doAlert = (
  type: number | null,
  message: string | null = null,
  header: string | null = null,
  duration: number | undefined = 2000,
) => {
  const config: ExternalToast & { header: React.ReactNode } = {
    header: <div className="px-3">{header ?? "Informasi"}</div>,
    closeButton: true,
    description: <div className="text-black px-3">{message}</div>,
    duration,
    icon: <Info />,
  };

  switch (type) {
    case 0: // Error
      config.header = (
        <div className="px-3">{header ?? "Terjadi Kesalahan !"}</div>
      );
      config.icon = <X className="text-destructive" />;
      break;
    case 1: // Primary
      config.header = <div className="px-3">{header ?? "Informasi !"}</div>;
      config.icon = <Info className="text-blue-500" />;
      break;
    case 2: // Success
      config.header = <div className="px-3">{header ?? "Berhasil !"}</div>;
      config.icon = <CircleCheckBig className="text-emerald-500" />;
      break;
    case 3: // Warning
      config.header = <div className="px-3">{header ?? "Peringatan !"}</div>;
      config.icon = <TriangleAlert className="text-yellow-500" />;
      break;
    case 4: // Question Mark
      config.header = <div className="px-3">{header ?? "Mohon Maaf !"}</div>;
      config.icon = <CircleHelp className="text-slate-500" />;
      break;

    default:
      break;
  }

  const { header: title, ...option } = config;

  return toast(title, option);
};
