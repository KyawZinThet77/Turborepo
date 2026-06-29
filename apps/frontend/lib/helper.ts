import { DEFAULT_POSTS_PER_PAGE } from "./constants";

export function transformTakeSkip({
  page,
  perPage,
}: {
  page?: number;
  perPage?: number;
}) {
  
  return {
    skip:
      page && perPage
        ? (page - 1) * (perPage ?? DEFAULT_POSTS_PER_PAGE)
        : undefined,
    take: perPage ?? DEFAULT_POSTS_PER_PAGE,
  };
}

export function calculatePageNumbers({
  pageNeighbors,
  totalPages,
  currentPage,
}: {
  pageNeighbors: number;
  totalPages: number;
  currentPage: number;
}) {
  const totalNumbers = pageNeighbors * 2 + 3; // current page + neighbors + first and last
  const totalBlocks = totalNumbers + 2; // including the '...' blocks

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbors);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);

    let pages: (number | string)[] = Array.from(
      {
        length: endPage - startPage + 1,
      },
      (_, i) => startPage + i,
    );
    if (startPage > 2) pages = ["...", ...pages];
    if (endPage < totalPages - 1) pages = [...pages, "..."];
    return [1, ...pages, totalPages];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
}
