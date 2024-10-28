import React, { FC } from 'react';
import { Box, Button, Pagination } from '@mui/material';

interface IPagination {
    totalCount: number;
    limit: number;
    activePage: number;
    onPrevPageClick: (page: number) => void;
    onNextPageClick: (page: number) => void;
    onPageChange: (page: number) => void;
    nextPageUrl: null | string;
    prevPageUrl: null | string;
}

const PaginationControls: FC<IPagination> = ({
    limit,
    activePage,
    totalCount,
    onPrevPageClick,
    onNextPageClick,
    onPageChange,
    prevPageUrl,
    nextPageUrl,
}) => {
    const totalPages = Math.ceil(totalCount / limit);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 10 }}>
            <Button
                variant="contained"
                onClick={() => onPrevPageClick(activePage - 1)}
                disabled={prevPageUrl === null}
            >
                Previous
            </Button>

            <Pagination
                count={totalPages}
                page={activePage + 1}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
                color="primary"
            />

            <Button
                variant="contained"
                onClick={() => onNextPageClick(activePage + 1)}
                disabled={nextPageUrl === null}
            >
                Next
            </Button>
        </Box>
    );
};

export default PaginationControls;
