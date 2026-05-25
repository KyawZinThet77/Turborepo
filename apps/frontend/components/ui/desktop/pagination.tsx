import { calculatePageNumbers } from "../../../lib/helper";
import { cn } from "../../../lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

type Props = {
  totalPages: number;
  currentPage?: number;
  pageNeighbors?: number;
  className?: string;
};

const Pagination = ({
  totalPages,
  currentPage,
  pageNeighbors = 2,
  className,
}: Props) => {
  // Example:
  // 1 ... 3 4 5 6 7 ... 10

  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    currentPage,
    totalPages,
  });

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {/* Previous Button */}
      {currentPage !== 1 && (
        <Link
          href={`?page=${currentPage - 1}`}
          className="rounded-md bg-slate-200 px-2 py-2 hover:bg-slate-300"
        >
          <ChevronLeftIcon className="w-4" />
        </Link>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page, index) =>
        typeof page === "string" ? (
          <span
            key={`${page}-${index}`}
            className="px-2 py-1 text-slate-500"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={`?page=${page}`}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-slate-200 hover:bg-slate-300"
            )}
          >
            {page}
          </Link>
        )
      )}

      {/* Next Button */}
      {currentPage !== totalPages && (
        <Link
          href={`?page=${currentPage + 1}`}
          className="rounded-md bg-slate-200 px-2 py-2 hover:bg-slate-300"
        >
          <ChevronRightIcon className="w-4" />
        </Link>
      )}
    </div>
  );
};

export default Pagination;