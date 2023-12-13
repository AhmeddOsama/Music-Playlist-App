import React from 'react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (newPage) => {
        onPageChange(newPage);
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <Button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    variant={currentPage === i ? 'contained' : 'outlined'}
                    color="primary"
                >
                    {i}
                </Button>
            );
        }
        return pages;
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <Typography variant="body2" color="textSecondary">
                Page {currentPage} of {totalPages}
            </Typography>
            <ButtonGroup>
                <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                </Button>
                {renderPageNumbers()}
                <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Pagination;
