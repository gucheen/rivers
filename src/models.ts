export interface Task {
    query: string;
    filename: string;
}

export interface Pagination {
    limit: number;
    offset: number;
}

export interface MethodCollections {
    [methodName: string]: (pagination: Pagination) => Promise<{}>
}
