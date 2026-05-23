import { DEFAULT_POSTS_PER_PAGE } from "./constants";

export function transformTakeSkip({page, perPage}: {page?: number, perPage?: number})  {
    return {
        skip: page && perPage ? (page - 1) * (perPage??DEFAULT_POSTS_PER_PAGE) : undefined,
        take: perPage ?? DEFAULT_POSTS_PER_PAGE
    }
}