export interface SearchParamsInterface {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: string;
  sortType?: "asc" | "desc";
}

export interface BasicParams {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortType: "asc" | "desc";
}

export async function extractSearchParams(
  searchParams: Promise<SearchParamsInterface> | undefined,
) {
  const params: BasicParams = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "createdAt",
    sortType: "desc",
  };

  if (searchParams) {
    const data = await searchParams;

    const parsedPage = Number(data?.page);
    const parsedLimit = Number(data?.limit);

    params.page = Math.max(1, parsedPage || 1);
    params.limit = Math.max(1, parsedLimit || 10);
    params.search = data.search || "";
    params.sortBy = data.sortBy || "createdAt";
    params.sortType = data.sortType || "asc";
  }

  return params;
}
