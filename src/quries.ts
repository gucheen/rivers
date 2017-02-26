import { MethodCollections, Pagination } from './models';

export const Quries: MethodCollections = {
    test: (pagination: Pagination) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    page: {
                        total: 100,
                        limit: pagination.limit,
                        offset: pagination.offset,
                    },
                    data: [
                        {
                            id: 1,
                        },
                        {
                            id: 2,
                        },
                    ],
                });
            }, 500);
        });
    },

    another: (pagination: Pagination) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    page: {
                        total: 100,
                        limit: pagination.limit,
                        offset: pagination.offset,
                    },
                    data: [
                        {
                            id: 1,
                        },
                        {
                            id: 2,
                        },
                    ],
                });
            }, 500);
        });
    },
}