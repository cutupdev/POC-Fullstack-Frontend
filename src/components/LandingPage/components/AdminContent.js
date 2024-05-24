import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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
      className={isDragging ? 'is-dragging' : ''}
      {...attributes}
      {...listeners}
    >
      {file.status === 'error' && isDragging ? originNode.props.children : originNode}
    </div>
  );
};

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

function createData(id, name, date, sample, status, trainDate, checked) {
  return { id, name, date, sample, checked, status, trainDate, };
}

const rowsTemp = [
  createData(1, 'Microsoft1', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(2, 'Microsoft2', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Failed", "2024-05-09 20:30", false),
  createData(3, 'Microsoft3', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "In-Progress", "2024-05-09 20:30", false),
  createData(4, 'Microsoft4', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(5, 'Microsoft5', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "In-Progress", "2024-05-09 20:30", false),
  createData(6, 'Microsoft6', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(7, 'Microsoft7', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Failed", "2024-05-09 20:30", false),
  createData(8, 'Microsoft8', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "In-Progress", "2024-05-09 20:30", false),
  createData(9, 'Microsoft9', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(10, 'Microsoft10', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Failed", "2024-05-09 20:30", false),
  createData(11, 'Microsoft11', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "In-Progress", "2024-05-09 20:30", false),
  createData(12, 'Microsoft12', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(13, 'Microsoft13', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(14, 'Microsoft14', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "In-Progress", "2024-05-09 20:30", false),
  createData(15, 'Microsoft15', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(16, 'Microsoft16', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(17, 'Microsoft17', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "In-Progress", "2024-05-09 20:30", false),
  createData(18, 'Microsoft18', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Failed", "2024-05-09 20:30", false),
  createData(19, 'Microsoft19', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(20, 'Microsoft20', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(21, 'Microsoft21', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(22, 'Microsoft22', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Failed", "2024-05-09 20:30", false),
  createData(23, 'Microsoft23', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(24, 'Microsoft24', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(25, 'Microsoft25', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Failed", "2024-05-09 20:30", false),
  createData(26, 'Microsoft26', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(27, 'Microsoft27', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(28, 'Microsoft28', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Failed", "2024-05-09 20:30", false),
  createData(29, 'Microsoft29', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
  createData(30, 'Microsoft30', "2024-05-09 20:30", ["mocrosoft.pdf", "poc.doc"], "Trained", "2024-05-09 20:30", false),
];

const headCells = [
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Name',
  },
  {
    id: 'date', numeric: false, disablePadding: false, label: 'Creation Date',
  },
  {
    id: 'sample', numeric: false, disablePadding: false, label: 'Sample Data',
  },
  {
    id: 'status', numeric: false, disablePadding: false, label: 'Train Status',
  },
  {
    id: 'trainDate', numeric: false, disablePadding: false, label: 'Train Date',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  React.useEffect(() => {
    console.log('order---', order);
    console.log('orderBy---', orderBy);
  }, [order, orderBy])

  return (
    <TableHead>

      <TableRow>
        <TableCell padding="checkbox" align='right' className='table-cell-general'>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (

          <TableCell
            key={headCell.id}
            align={'right'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            className='table-cell-general'
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox" className='table-cell-general' />
      </TableRow>
    </TableHead>
  );
}

export default function AdminContent() {

  const convertStr = (data) => {
    const datas = data.map(item => {
      // Convert the sample array to a single string with comma separated values
      const sampleStr = item.sample.join(', ');
      return {
        id: item.id,
        name: item.name,
        date: item.date,
        sample: sampleStr,
        status: item.status,
        trainDate: item.trainDate,
        checked: item.checked
      };
    });
    return datas;
  }

  const [categories, setCategories] = React.useState(rowsTemp);
  const [rows, setRows] = React.useState(rowsTemp);
  const [visibleRows, setVisibleRows] = React.useState(convertStr(rowsTemp.slice(0, 10)));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dense, setDense] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [categoryName, setCategoryName] = React.useState('');
  const [editID, setEditID] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [fileError, setFileError] = React.useState(false);
  const [fileErrorMessage, setFileErrorMessage] = React.useState('');
  const [fileList, setFileList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState(['']);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  React.useEffect(() => {
    console.log('rows changed!')
    console.log('order---', order);
    console.log('orderBy---', orderBy);
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    setVisibleRows(
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      )
    )
  }, [rows]);

  React.useEffect(() => {
    console.log('categories changed!')
    console.log('order---', order);
    console.log('orderBy---', orderBy);
  }, [categories]);

  React.useEffect(() => {
    console.log("sort function called!")
    setVisibleRows(
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      )
    )
  }, [order, orderBy, page, rowsPerPage])

  const handleClickOpen = (e) => {
    
    setOpen(true);

    if (e == "") {
      setCategoryName("");
      setEditID({});
      setFileList([]);
    } else {
      const files = rows.find(value => {
        if(value.id === e.id) return value.sample;
      })
      
      setCategoryName(e.name);
      setEditID(e);

      setFileList(files.sample.map(item => {
        return {
          uid: '-1',
          name: item,
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        };
      }))
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditID({});
    setCategoryName("");
    setNameError(false);
    setNameErrorMessage('');
    setFileError(false);
    setFileErrorMessage("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onVisibleRows(newPage, rowsPerPage, rows);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    onVisibleRows(0, parseInt(event.target.value, 10), rows);
  };

  const onVisibleRows = (page, perRows, data) => {

    const datas = convertStr(data);

    if(data.length === 0) {
      setPage(0);
      setRowsPerPage(10);
      setVisibleRows([]);
    } else if (perRows * (page + 1) > datas.length) {
      // if(data.length === 0) {
      //   setPage(0);
      // } else if(data.length > 0) {
      //   setPage(Math.floor(datas.length / page));
      // }
      setPage(Math.floor((datas.length-1) / rowsPerPage));
      setVisibleRows(datas.slice(Math.floor((datas.length-1) / rowsPerPage) * perRows, datas.length));
    } else {
      setVisibleRows(datas.slice(page * perRows, perRows * (page + 1)));
    }
  }

  const onCategoryName = (e) => {
    setCategoryName(e.target.value)
  }

  const onSubmit = (e) => {
    const name = document.getElementById('name').value;

    if (fileList.length === 0 || !name) {
      if (!name) {
        setNameError(true);
        setNameErrorMessage('Category name is required !');
      }
      if (fileList.length === 0) {
        setFileError(true);
        setFileErrorMessage('Attach one more file for this category !');
      }
    } else {
      const filenames = fileList.map(value => {
        return value.name;
      })
      if(editID.id) {
        const editData = {name: name, id: editID.id, date: '2024-05-20 09:30', sample: filenames, checked: editID.checked, status: editID.status, trainDate: editID.trainDate};
        const editRows = categories.map(value => {
          if (value.id === editID.id) {
            return editData;
          } else {
            return value;
          }
        });
        setCategories(editRows);
        searchHandle(searchValue, editRows);
        // setRows(editRows);
        // onVisibleRows(page, rowsPerPage, editRows);
      } else {
        const newData = {name: name, id: categories.length+1, date: '2024-05-20 09:30', sample: filenames, checked: false, status: "In-Progress", trainDate: '2024-05-23 08:30'};
        let newCategory = categories.slice(0, categories.length);
        newCategory.push(newData);
        setCategories([...categories, newData]);
        searchHandle(searchValue, newCategory);
        // setRows([...rows, newData]);
        // onVisibleRows(page, rowsPerPage, rows);
      }
      setOpen(false);
      setEditID({});
      setNameError(false);
      setNameErrorMessage('');
      setFileError(false);
      setFileErrorMessage("");
    }
  }

  const handleSelectAllClick = (event) => {

    // const temp = rows.map((row) => {
    //   return { ...row, checked: event.target.checked };
    // });
    const temp = categories.map((row) => {
      return { ...row, checked: event.target.checked };
    });

    // setRows(temp);
    setCategories(temp);
    searchHandle(searchValue, temp);

    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }

    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    // const temp = rows;
    const temp = categories.slice(0, categories.length);
    temp[id - 1].checked = !temp[id - 1].checked;
    // setRows(temp);
    setCategories(temp);
    searchHandle(searchValue, temp);
    
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const descriptionElementRef = React.useRef(null);

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

  const onSearch = (e) => {
    setSearchValue(e.target.value);
    searchHandle(e.target.value, categories);
    // const searchResult = categories.find(value => {
    //   if(value.id === e.id) return value.sample;
    // })
  }

  const searchHandle = (value, data) => {
    const searchedData = [];
    for(let i = 0; i < data.length; i++) {
      if(data[i].name.toLowerCase().search(value) !== -1 || data[i].date.search(value) !== -1 || data[i].sample.indexOf(value) !== -1) {
        searchedData.push(data[i]);
      }
    }
    
    if(searchedData.length === 0) {
      setPage(0);
      setRowsPerPage(10);
    }
    setRows(searchedData);
    onVisibleRows(page, rowsPerPage, searchedData);
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

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
        className='main-container-width'
        sx={{
          display: 'flex',
          width: '100% !important',
          background: '#ffffff',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 4, sm: 6 },
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
              onChange={onSearch}
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
                  fontFamily: 'roboto !important',
                  height: '32px'
                }
              }}
            />
            <Button variant="contained" color="primary" onClick={() => handleClickOpen("")} className='doc-upload-btn'>
              Add Category
            </Button>
          </Stack>

        </Stack>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 550 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={3}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell align="right" padding="checkbox" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.id)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      {/* <TableCell align="right" padding="checkbox" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>
                        <FileType typeStr={row.type} />
                      </TableCell> */}
                      <TableCell
                        onClick={(event) => handleClick(event, row.id)}
                        className={row.checked ? 'table-cell-selected' : 'table-cell-general'}
                        align="right"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.date}</TableCell>
                      <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.sample}</TableCell>
                      <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.status}</TableCell>
                      <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.trainDate}</TableCell>
                      <TableCell align="right" style={{ minWidth: 95 }} className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>
                        <Tooltip className='tooltip' title={'Edit Category'}>
                          <EditIcon onClick={() => handleClickOpen(row)} className='cursor-icon' />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {/* {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )} */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 50, 100]}
            className='table-cell-footer'
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll='paper'
        >
          <DialogTitle className='modal-title'><h2 className='dis-center wid-400'>{editID.id ? "Edit Category" : "New Category"}</h2></DialogTitle>
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
                      {fileError ? fileErrorMessage : ""}
                    </div>
                  </Upload>
                </SortableContext>
              </DndContext>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className='modal-btn'>Cancel</Button>
            <Button onClick={onSubmit} className='modal-btn'>{editID.id ? "Edit" : "Add"}</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
