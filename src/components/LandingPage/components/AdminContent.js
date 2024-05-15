import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import CategoryButton from './CategoryButton';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { visuallyHidden } from '@mui/utils';

import { UploadOutlined } from '@ant-design/icons';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Upload } from 'antd';
import { color } from 'framer-motion';


const theme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: '0px !important',
          backgroundColor: 'transparent !important', // background color of the input
          '&:hover:before': {
            borderBottomColor: 'black', // on hover
          },
        }
      }
    }
  }
});


const DraggableUploadListItem = ({ originNode, file }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: file.uid,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      // prevent preview event when drag end
      className={isDragging ? 'is-dragging' : ''}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === 'error' && isDragging ? originNode.props.children : originNode}
    </div>
  );
};


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, date, sample) {
  return { name, date, sample };
}

const rows = [
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
  createData('Microsoft', "2024-05-09 20:30", "mocrosoft.pdf, poc.doc ..."),
];


export default function AdminContent() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categoryName, setCategoryName] = React.useState('');
  const [editCase, setEditCase] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [fileError, setFileError] = React.useState(false);
  const [fileErrorMessage, setFileErrorMessage] = React.useState('');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);

    if (e == null) {
      setCategoryName("");
      setEditCase(false);
    } else {
      setCategoryName(e.name);
      setEditCase(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditCase(false);
    setCategoryName("");
    setNameError(false);
    setNameErrorMessage('');
    setFileError(false);
    setFileErrorMessage("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const modalClose = () => {
  //   setModalState(false);
  //   setEditCase(false);
  //   setCategoryName("");
  // }

  // const modalOpen = (e) => {
  //   if (e == null) {
  //     setCategoryName("");
  //     setEditCase(false);
  //   } else {
  //     setCategoryName(e.name);
  //     setEditCase(true);
  //   }
  //   setModalState(true);
  // }
  
  const onCategoryName = (e) => {
    setCategoryName(e.target.value)
  }

  const onSubmit = (e) => {
    const name = document.getElementById('name');
    
    if(fileList.length == 0 || !name.value) {
      if(!name.value) {
        setNameError(true);
        setNameErrorMessage('Category name is required !');
      }
      if(fileList.length == 0) {
        setFileError(true);
        setFileErrorMessage('Attach one more file for this category !');
      }
    } else {
      setOpen(false);
      setEditCase(false);
      setNameError(false);
      setNameErrorMessage('');
      setFileError(false);
      setFileErrorMessage("");
    }
  }

  const [fileList, setFileList] = React.useState([
    {
      uid: '-1',
      name: 'mocrosoft.pdf',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'poc.doc',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'IT.pptx',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundColor: '#ffffff',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          width: '100% !important',
          background: '#ffffff',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 4, sm: 6 },
        }}
      >
        <Stack
          spacing={2}
          className='assist-root'
          alignItems="center"
          useFlexGap
          sx={{ width: { xs: '100%', sm: '70%' } }}
        >
          <Stack
            className='func-box'
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <TextField
              id="email-hero"
              hiddenLabel
              InputLabelProps={{ style: { fontSize: 24, fontFamily: 'roboto' } }}
              className='global-font search-box-admin'
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Search"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your email address',
                style: {
                  fontSize: 16,
                  // borderRadius: 0,
                  fontFamily: 'roboto',
                  // backgroundColor: '#fff',
                  height: '32px'
                }
              }}
            />
            {/* <CategoryButton
              className='global-font category-box' 
            /> */}
            {/* <Upload /> */}
            <Button variant="contained" color="primary" onClick={() => handleClickOpen()} className='doc-upload-btn'>
              Add Category
            </Button>
          </Stack>

        </Stack>
        {/* <div className='metaview-content'> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" className='global-font teal' style={{ minWidth: 100 }}>Name</StyledTableCell>
                <StyledTableCell align="center" className='global-font teal' style={{ minWidth: 150 }}>Creation Date</StyledTableCell>
                <StyledTableCell align="center" className='global-font teal' style={{ minWidth: 200 }}>Samples</StyledTableCell>
                <StyledTableCell align="right" className='global-font teal' style={{ minWidth: 50 }}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left" style={{ minWidth: 100 }} className='global-font'>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ minWidth: 150 }} className='global-font'>
                    {row.date}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ minWidth: 200 }} className='global-font'>
                    {row.sample}
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ minWidth: 50 }} >
                    <Tooltip className='tooltip' title={'Edit Category'}>
                      <EditIcon onClick={() => handleClickOpen(row)} className='cursor-icon' />
                    </Tooltip>
                    {/* <Tooltip className='tooltip' title={'Peview document'}>
                                        <RemoveRedEyeIcon className='cursor-icon' />
                                    </Tooltip>
                                    <Tooltip className='tooltip' title={'Remove document'}>
                                        <DeleteIcon className='cursor-icon' />
                                    </Tooltip> */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  className='pagination'
                  rowsPerPageOptions={[10, 50, 100, { label: 'All', value: -1 }]}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
          {/* <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title" className='roboto-font' >File Upload</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              File Upload here
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className='roboto-font' >Cancel</Button>
              <Button onClick={handleClose} className='roboto-font' >Save</Button>
            </DialogActions>
          </Dialog> */}
          <Dialog
            open={open}
            onClose={handleClose}
            scroll='paper'
          >
            <DialogTitle className='modal-title'><h2 className='dis-center wid-400'>{editCase ? "Edit Category" : "New Category"}</h2></DialogTitle>
            <DialogContent dividers={true} >
            <ThemeProvider theme={theme}>
              <TextField 
                autoFocus
                required
                error={nameError}
                helperText={nameErrorMessage}
                value={categoryName}
                onChange={onCategoryName}
                id="name" 
                name='name'
                label="Category name" 
                variant="filled" 
                fullWidth
                type="text"
                inputProps={{
                  style: {
                    fontSize: 24,
                    borderRadius: 0,
                    fontFamily: 'roboto !important',
                    height: '32px',
                    
                  }
                }} // font size of input text
                InputLabelProps={{ 
                  style: { 
                    fontSize: 18, 
                    fontFamily: 'roboto !important',
                    color: '#000',
                    
                  } 
                }} // font size of input label
              />
              </ThemeProvider>
              {/* <TextField
                autoFocus
                required
                className='roboto-font'
                value={categoryName}
                onChange={onCategoryName}
                margin="dense"
                id="name"
                name="name"
                label="Category name"
                type="text"
                fullWidth
                variant="standard"
                inputProps={{
                  style: {
                    fontSize: 20,
                    borderRadius: 0,
                    fontFamily: 'roboto !important',
                    height: '32px'
                  }
                }} // font size of input text
                InputLabelProps={{ style: { fontSize: 18, fontFamily: 'roboto !important' } }} // font size of input label
              /> */}
              <div>
                <DndContext sensors={[sensor]} onDragEnd={onDragEnd} >
                  <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
                    <Upload
                      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                      fileList={fileList}
                      onChange={onChange}
                      itemRender={(originNode, file) => (
                        <DraggableUploadListItem originNode={originNode} file={file} />
                      )}
                    >
                      <div className='upload-category-btnbox'>
                        <Button className='upload-category-btn' icon={<UploadOutlined />}>Click to Upload</Button>
                      </div>
                      <div className='dis-center color-red roboto-font'>
                        {fileError? fileErrorMessage : ""}
                      </div>
                    </Upload>
                  </SortableContext>
                </DndContext>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className='modal-btn'>Cancel</Button>
              <Button onClick={onSubmit} className='modal-btn'>{editCase ? "Edit" : "Add"}</Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
        {/* </div> */}
      </Container>
    </Box>
  );
}
