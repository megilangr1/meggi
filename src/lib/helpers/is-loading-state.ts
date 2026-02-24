import { useState } from "react";

export function useLoadingState() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return { isLoading, setIsLoading };
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
