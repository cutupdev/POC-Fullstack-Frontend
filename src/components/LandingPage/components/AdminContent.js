import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import dateFormat from '../../../utils/dateFormatter';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import api from '../../../utils/api';
import CloseIcon from '@mui/icons-material/Close';
import { Buffer } from 'buffer';
import AuthContext from '../../../context/authContext';
import AppContext from '../../../context/appContext';
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
import { RiCoinsLine } from 'react-icons/ri';


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

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const [headCells, setHeadCells] = React.useState(
    [
      {
        id: 'name', numeric: false, disablePadding: true, label: 'Name',
      },
      {
        id: 'createDate', numeric: false, disablePadding: false, label: 'Creation Date',
      },
      {
        id: 'sample', numeric: false, disablePadding: false, label: 'Sample Data',
      },
      {
        id: 'trainStatus', numeric: false, disablePadding: false, label: 'Training Status',
      },
      {
        id: 'trainDate', numeric: false, disablePadding: false, label: 'Training Date',
      },
    ]
);

  React.useEffect(() => {
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

  const [currentUser, setCurrentUser] = React.useContext(AuthContext);
  const { fileList, setFileList, categoryList, setCategoryList } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [visibleRows, setVisibleRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dense, setDense] = React.useState(false);
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('trainDate');
  const [selected, setSelected] = React.useState([]);
  const [categoryName, setCategoryName] = React.useState('');
  const [editID, setEditID] = React.useState({});
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [fileError, setFileError] = React.useState(false);
  const [fileErrorMessage, setFileErrorMessage] = React.useState('');
  const [newFile, setNewFile] = React.useState([]);
  const [searchVal, setSearchVal] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
  const REGION = process.env.REACT_APP_BUCKET_REGION;

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_BUCKET_SECRET_ACCESS_KEY,
  });

  const s3 = new S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  React.useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [])

  React.useEffect(() => {
    let temp = [];
    if (searchVal.length) {
      setVisible(true);
      console.log(searchVal)
      if (categoryList) {
        let searchParams = searchVal.toLowerCase().replace(/\\/g, "\\\\");
        for (let i = 0; i < categoryList.length; i++) {
          if (categoryList[i].name.toLowerCase().search(searchParams) !== -1) {
            temp.push(categoryList[i]);
          }
        }
        setRows([...dataEdit(temp)]);
      }
    } else {
      setVisible(false);
      setRows([...dataEdit(categoryList)]);
    }
  }, [searchVal])

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  React.useEffect(() => {
    // setRows(categoryList);
    // console.log(categoryList)
    setRows([...dataEdit(categoryList)]);
  }, [categoryList])

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
    setVisibleRows([...stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)])
  }, [rows]);

  const dataEdit = (input) => {
    let temp = [];
    if (input && input.length) {
      temp = input.map((val, ind) => {

        return {
          id: val._id,
          name: val.name,
          sampleFiles: val.sample,
          sampleString: sampleFullString(val.sample),
          sample: sampleToString(val.sample),
          createDate: dateFormat(val.createDate),
          trainDate: dateFormat(val.trainDate),
          trainStatus: val.trainStatus,
          checked: false
        }
      })
    }
    return temp;
  }

  const sampleToString = (input) => {
    let temp = "";
    for (let i = 0; i < input.length; i++) {
      temp = temp.concat(input[i]);
      if (i < input.length - 1) {
        temp = temp.concat(', ');
      }
    }

    if(temp.length === 0) {
      return 'No file';
    }

    return `${temp.substring(0, 8)}...${temp.substring(temp.length - 10, temp.length)}`;
  }

  const sampleFullString = (input) => {
    let temp = "";
    for (let i = 0; i < input.length; i++) {
      temp = temp.concat(input[i]);
      if (i < input.length - 1) {
        temp = temp.concat(', ');
      }
    }
    return temp;
  }

  React.useEffect(() => {
    console.log("sort function called!")
    setVisibleRows([...stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)])
  }, [order, orderBy, page, rowsPerPage])

  const handleClickOpen = (e) => {

    setOpen(true);

    if (e == "") {
      setCategoryName("");
      setEditID({});
      setNewFile([]);
    } else {
      const files = rows.find(value => {
        if (value.id === e.id) return value;
      })

      setCategoryName(e.name);
      setEditID(e);

      setNewFile(files.sampleFiles.map((item, ind) => {
        return {
          uid: ind,
          name: item,
          id: item,
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        };
      }))
    }
  };

  const handleClose = () => {
    setEditID({});
    setCategoryName("");
    setNameError(false);
    setNameErrorMessage('');
    setFileError(false);
    setFileErrorMessage("");
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onVisibleRows(newPage, rowsPerPage, rows);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if (parseInt(event.target.value, 10) > rows.length) {
      setVisibleRows(rows.slice(0, rows.length))
    } else {
      setVisibleRows(rows.slice(0, parseInt(event.target.value, 10)))
    }
    // onVisibleRows(0, parseInt(event.target.value, 10), rows);
  };

  const onVisibleRows = (page, perRows, data) => {

    if (perRows * (page + 1) > data.length) {
      setVisibleRows([...data.slice(page * perRows, data.length)]);
    } else {
      setVisibleRows(data.slice(page * perRows, perRows * (page + 1)));
    }

    // const datas = data;

    // if (data.length === 0) {
    //   setPage(0);
    //   setRowsPerPage(10);
    //   setVisibleRows([]);
    // } else if (perRows * (page + 1) > datas.length) {
    //   setPage(Math.floor((datas.length - 1) / rowsPerPage));
    //   setVisibleRows(datas.slice(Math.floor((datas.length - 1) / rowsPerPage) * perRows, datas.length));
    // } else {
    //   setVisibleRows(datas.slice(page * perRows, perRows * (page + 1)));
    // }
  }

  const onCategoryName = (e) => {
    setCategoryName(e.target.value)
  }

  const onSubmit = async (e) => {

    setNewFile([]);

    if(!editID.id) {
      const name = document.getElementById('name').value;
      if(!name) {
        setNameError(true);
        setNameErrorMessage('Category name is required !');
      } else {
        await categorySave();
      }
    } else {
      await categorySave();
    }
  }

  const categorySave = async () => {
    const token = localStorage.getItem('user');
    let fileNameList = [];

    let uploadCount = 0;

    const uploadPromises = newFile.map(async (file) => {
      if (file.originFileObj) {
        const flag = await handleUpload(file.originFileObj);
        if (flag) {
          uploadCount++;
          fileNameList.unshift(file.originFileObj.name);
        }
        return flag;
      } else {
        fileNameList.unshift(file.name);
      }
    });

    // Wait for all files to finish uploading
    await Promise.all(uploadPromises);

    if (editID.id) {
      console.log('editing called!')
      const categoryEdit = {
        id: editID.id,
        name: categoryName,
        files: fileNameList,
        updated: Date.now(),
      }
      console.log('edit data ===> ', categoryEdit);
      try {

        const res = await api.post(
          `category/editCategory`,
          categoryEdit,
          {
            headers: {
              'Authorization': `Bearer ${token.replace(/"/g, '')}`,
            },
          }
        );
        setCategoryList(res.data.editCategory);
        setOpen(false);
      } catch (err) {
        console.log("error ===> ", err);
      }
    } else {
      if (uploadCount === 1) {
        alert(`1 file uploaded successfully!`);
      } else if (uploadCount === 0) {
        alert(`No file uploaded!`);
      } else {
        alert(`${uploadCount} files uploaded successfully!`);
      }
      
      const categoryInf = {
        name: categoryName,
        files: fileNameList,
        created: Date.now(),
      }
      try {
  
        const res = await api.post(
          `category/newCategory`,
          categoryInf,
          {
            headers: {
              'Authorization': `Bearer ${token.replace(/"/g, '')}`,
            },
          }
        );
        let tempData = categoryList.slice(0, categoryList.length)
        tempData.unshift(res.data.newCategory);
        setCategoryList([...tempData])
        setOpen(false);
      } catch (err) {
        console.log("error ===> ", err);
      }
    }
  }

  const handleUpload = async (file) => {

    const readFileAsBuffer = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(Buffer.from(event.target.result));
        reader.onerror = (err) => reject(err);
        reader.readAsArrayBuffer(file);
      });
    };

    const fileBuffer = await readFileAsBuffer(file);

    const params = {
      Bucket: S3_BUCKET,
      Key: `category/${categoryName}/${file.name}`,
      // Body: file,
      Body: fileBuffer
    };

    console.log(S3_BUCKET);
    try {
      const upload = await s3.putObject(params).promise();
      console.log("File uploaded successfully ===>>> ", upload);
      return true;
      // const fileInf = {
      //   creatorName: currentUser.username,
      //   filename: file.name,
      //   type: file.type,
      //   size: file.size,
      //   date: Date.now(),
      // }
      // console.log("backend sending data ===> ", fileInf);

      // const token = localStorage.getItem('user')
      // try {
      //   const res = await api.post(
      //     `files/newUpload`,
      //     fileInf,
      //     {
      //       headers: {
      //         'Authorization': `Bearer ${token.replace(/"/g, '')}`,
      //       },
      //     }
      //   );
      //   console.log("File Inf saving success ===> ", res.data.newData);

      //   return { status: true, data: res.data.newData };
      // } catch (err) {
      //   console.log("File Inf saving error ===>>> ", err);
      //   return false;
      // }
    } catch (error) {
      console.error("File uploading error ===>>> ", error);
      return false;
    }
  }

  const handleSelectAllClick = (event) => {

    const temp = rows.map((row) => {
      return { ...row, checked: event.target.checked };
    });

    setRows(temp);

    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }

    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    const temp = rows.map((val, ind) => {
      if (val.id === id) {
        val.checked = !val.checked;
      }
      return val;
    });
    console.log(temp)
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
    console.log(property);
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRetrain = (row) => {
    console.log(row);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const descriptionElementRef = React.useRef(null);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setNewFile((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    setNewFile(newFileList);
    console.log(newFileList);
  };

  const onSearch = (e) => {
    setSearchVal(e.target.value);
  }

  const searchClose = (e) => {
    setVisible(false);
    setSearchVal("");
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
            <div className='password-box'>
              <TextField
                id="email-hero"
                hiddenLabel
                InputLabelProps={{ style: { fontSize: 24, fontFamily: 'roboto' } }}
                value={searchVal}
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
              <span className='visibility-box-search'>
                {visible && <CloseIcon onClick={searchClose} className='visibility' />}
              </span>
            </div>
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
                      <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.createDate}</TableCell>
                      <Tooltip className='tooltip' title={row.sampleString} >
                        <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.sample}</TableCell>
                      </Tooltip>
                      <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.trainStatus}</TableCell>
                      <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.trainDate}</TableCell>
                      <TableCell align="right" style={{ minWidth: 95 }} className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>
                        <Tooltip className='tooltip' title={'Retrain'}>
                          <AutorenewIcon onClick={() => handleRetrain(row)} className='cursor-icon' />
                        </Tooltip>
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
          <DialogTitle className='modal-title'><h2 className='dis-center wid-400'>{editID.id ? categoryName : "New Category"}</h2></DialogTitle>
          <DialogContent dividers={true} >
            <ThemeProvider theme={theme}>
              {
                editID.id ?
                  ''
                  :
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
              }
            </ThemeProvider>
            <div className='category-modal'>
              <DndContext sensors={[sensor]} onDragEnd={onDragEnd} >
                <SortableContext items={newFile.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    fileList={newFile}
                    multiple={true}
                    onChange={onChange}
                    itemRender={(originNode, file) => (
                      <DraggableUploadListItem originNode={originNode} file={file} />
                    )}
                  >
                    <div className='upload-category-btnbox'>
                      <Button className='upload-category-btn' icon={<UploadOutlined />}>Add more training files</Button>
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
            <Button onClick={onSubmit} className='modal-btn'>{editID.id ? "Save" : "Add"}</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
