import { useState } from 'react';

const useTablePaginationInit = (
  defaultPage, 
  defaultRowsPerPage
) => {

  const [page, setPage] = useState(defaultPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage || 10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return [
    page,  
    rowsPerPage,
    handleChangePage, 
    handleChangeRowsPerPage
  ];
}

export default useTablePaginationInit;