import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Avatar,
  Box, 
  Chip, 
  CircularProgress,
  Container, 
  IconButton, 
  Switch, 
  Table, 
  TableBody, 
  TableCell, 
  TableFooter, 
  TableHead, 
  TablePagination, 
  TableRow, 
  Typography
} from '@mui/material';

import TablePaginationActions from '../../components/utils/TablePaginationActions';
import useTablePaginationInit from '../../components/hooks/useTablePaginationInit';
import NA from '../../components/utils/NA';

import { 
  GetArticlesDASH 
} from '../../redux/actions/general/articlesActions';

import "./styles.scss";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.dashboard);
  const [loading, setLoading] = useState(true);

  const [articlesList, setArticlesList] = useState([]);
  const [articlesTotal, setArticlesTotal] = useState(0);

  const [
    page,  
    rowsPerPage,
    handleChangePage, 
    handleChangeRowsPerPage
  ] = useTablePaginationInit();

  useEffect(() => { 
    handleGetArticles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  useEffect(() => { 
    try {
      console.log(state)
      formatArticlesList(state.articlesList || []);
    } catch (err) {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const formatArticlesList = (data) => {
    setArticlesList(data[3] || []);
    setArticlesTotal(data[2] || 0);
  };

  async function handleGetArticles(customLoading){
    dispatch(GetArticlesDASH(page, rowsPerPage, customLoading ? customLoading : setLoading));
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant='h5'>
        Dashboard
      </Typography>
      {
        loading
        ?
        <CircularProgress />
        :
        <Table className='table'>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Chip</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>created/updated on</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              articlesList.map((row, index) => (
                <TableRow
                  key={index}>
                  <TableCell>
                    <Typography
                      variant='caption'
                      color={"grey"}>
                      {row.Id}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.Title || <NA />}</TableCell>
                  <TableCell>
                  
                  </TableCell>
                  <TableCell>
                    <Box
                      className="flexCenter_Row"
                      gap={"5px"}>
                      <Box
                        sx={{ width: "30px", height: "30px", 
                          backgroundColor: row.Color, borderRadius: "4px"
                        }}
                        />
                      {row.Color}
                    </Box>
                  </TableCell>
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation();
                    }}>
                    
                  </TableCell>
                  <TableCell>
                    {/* <TableTimeStamps
                      createdAt={row.createdAt}
                      updatedAt={row.updatedAt}
                      /> */}
                  </TableCell>
                  <TableCell>
                    {/* <IconButton
                      onClick={() => {
                        setModalTitle("Edit Tag");
                        setUpdate({
                          ...row,
                          defaultMode: 2
                        });
                        setTagsModalOpen(!tagsModalOpen);
                      }}>
                      <EditIcon />
                    </IconButton> */}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                sx={{ borderBottom: 0}}
                rowsPerPageOptions={[5, 10, 25, 100]}
                colSpan={10}
                count={articlesTotal}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      }
    </Container>
  )
}

export default DashboardPage;