export interface PaginationResult<T> {
    currentPage: number;
    totalPages: number;
    data: T[];
}
