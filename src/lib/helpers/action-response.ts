import { $ZodIssue } from "zod/v4/core";
import { MessageCodes } from "./message-response";

// Utility untuk validasi
export type InputFieldError = { field: string; message: string };

export type ActionSuccess<T> = {
  success: true;
  code: string;
  message: string;
  result: T;
};

export type ActionError = {
  success: false;
  code: string;
  message: string;
  error?: InputFieldError[];
};

export function res<T>(
  data: T,
  resCode: string = "200",
  resMsg: string | null = null,
): ActionSuccess<T> {
  return {
    success: true,
    code: resCode,
    message: resMessage(resCode, resMsg),
    result: data,
  };
}

export function badReq(
  issue: $ZodIssue[],
  message: string | null = null,
): ActionError {
  return {
    success: false,
    code: "V400",
    message: resMessage("V400", message),
    error: extractValidationError(issue),
  };
}

export function err(error: unknown, code?: string): ActionError {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "Unexpected error";

  return {
    success: false,
    code: code ?? "DB500",
    message: resMessage(code ?? "DB500", message),
  };
}

// Helper
export function resMessage(code: string, msg?: string | null) {
  let autoMessage = msg ? msg : "Success";
  if (!msg) {
    autoMessage =
      (typeof code === "string" &&
        MessageCodes[code as keyof typeof MessageCodes]) ||
      "Success";
  }

  return autoMessage;
}

export function extractValidationError(issues: $ZodIssue[]): InputFieldError[] {
  const seen = new Set<string>();

  return issues.reduce<InputFieldError[]>((acc, issue) => {
    const field = issue.path.join(".");

    if (!seen.has(field)) {
      seen.add(field);
      acc.push({
        field,
        message: issue.message,
      });
    }

    return acc;
  }, []);
}

export function cIssue(path: string, message: string): $ZodIssue {
  return {
    code: "custom",
    path: [path],
    message,
  };
}

export type BetterAuthError = {
  status?: string;
  statusCode?: number;
  message?: string;
};

export function isBetterAuthError(error: unknown): error is BetterAuthError {
  return typeof error === "object" && error !== null && "statusCode" in error;
}
