import { $ZodIssue } from "zod/v4/core";
import { MessageCodes } from "./message-response";

// Utility untuk validasi
type InputFieldError = { field: string; message: string };

type BaseResult = Record<string, unknown> | Record<string, unknown>[] | null;

type ActionResponse<T> = {
  success: true;
  code: string;
  message: string;
  result: T | BaseResult;
};

type FailedActionResponse = {
  success: false;
  code: "V400";
  message: string;
  result: InputFieldError[];
};

type ErrorActionResponse = {
  success: false;
  code: "DB500";
  message: string;
  result: null;
};

export function res<T>(
  data: T | BaseResult,
  resCode: string = "200",
  resMsg: string | null = null,
): ActionResponse<T> {
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
): FailedActionResponse {
  return {
    success: false,
    code: "V400",
    message: resMessage("V400", message),
    result: extractValidationError(issue),
  };
}

export function err(error: unknown): ErrorActionResponse {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "Unexpected error";

  return {
    success: false,
    code: "DB500",
    message: resMessage("DB500", message),
    result: null,
  };
}

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

export function extractValidationError(
  result: $ZodIssue[] | null,
): InputFieldError[] {
  if (!Array.isArray(result)) return [];

  const seen = new Set<string>();
  const errors: InputFieldError[] = [];
  for (const item of result) {
    const field = String(item.path[0]);

    if (!seen.has(field)) {
      seen.add(field);
      errors.push({
        field,
        message: String(item.message),
      });
    }
  }
  return errors;
}
