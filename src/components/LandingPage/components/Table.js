import * as React from 'react';
import dateFormat from '../../../utils/dateFormatter';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import ClearIcon from '@mui/icons-material/Clear';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import api from '../../../utils/api';
import { visuallyHidden } from '@mui/utils';
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import { RiContactsBookLine, RiFileWord2Line } from "react-icons/ri";
import { RiFilePpt2Line } from "react-icons/ri";
import { CiText } from "react-icons/ci";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AppContext from '../../../context/appContext';
// import AuthContext from '../../../context/authContext';
import clsx from 'clsx';
import AWS from 'aws-sdk';
import axios from 'axios';


function createData(id, name, creator, date, type, size, category, classification, confident, checked) {
    return { id, name, creator, date, type, size, category, classification, confident, checked };
}

const rowsTemp = [
    createData(1, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(2, 'Microsoft', "Microgift", "2024-05-09 20:30", "doc", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(3, 'Microsoft', "Microgift", "2024-05-09 20:30", "ppt", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(4, 'Microsoft', "Microgift", "2024-05-09 20:30", "text", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(5, 'Microsoft', "Microgift", "2024-05-09 20:30", "pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(6, 'Microsoft', "Microgift", "2024-05-09 20:30", "doc", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(7, 'Microsoft', "Microgift", "2024-05-09 20:30", "ppt", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(8, 'Microsoft', "Microgift", "2024-05-09 20:30", "text", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(9, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(10, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(11, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(12, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(13, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(14, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(15, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(16, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(17, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(18, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(19, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(20, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(21, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(22, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(23, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(24, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(25, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(26, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(27, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(28, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(29, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
    createData(30, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%", false),
];

function FileType(props) {
    const { typeStr } = props;
    if (typeStr === 'pdf' || typeStr === 'Pdf' || typeStr === 'PDF') {
        return (
            <FaRegFilePdf className='font-size-16 pdf-icon file-icon icon-size' />
        );
    } else if (typeStr === 'doc' || typeStr === 'docx' || typeStr === 'Doc' || typeStr === 'Docx' || typeStr === 'DOC' || typeStr === 'DOCX') {
        return (
            <RiFileWord2Line className='font-size-16 word-icon file-icon icon-size' />
        );
    } else if (typeStr === 'ppt' || typeStr === 'pptx' || typeStr === 'Ppt' || typeStr === 'Pptx' || typeStr === 'PPT' || typeStr === 'PPTX') {
        return (
            <RiFilePpt2Line className='font-size-16' />
        );
    } else if (typeStr === 'text' || typeStr === 'Text' || typeStr === 'TEXT' || typeStr === 'txt' || typeStr === 'Txt' || typeStr === 'TXT') {
        return (
            <CiText className='font-size-16' />
        );
    } else {
        return (
            <IoDocumentTextSharp className='font-size-16' />
        );
    }
}

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

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, previewStatus, metaviewStatus } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const [headCells, setHeadCells] = React.useState(
        [
            {
                id: 'name', numeric: false, disablePadding: true, label: 'Name',
            },
            {
                id: 'creator_sort', numeric: false, disablePadding: false, label: 'Creator',
            },
            {
                id: 'date_sort', numeric: false, disablePadding: false, label: 'Creation Date',
            },
            {
                id: 'type', numeric: false, disablePadding: false, label: 'File Type',
            },
            {
                id: 'size_sort', numeric: false, disablePadding: false, abel: 'File Size',
            },
            {
                id: 'category', numeric: false, disablePadding: false, label: 'Category',
            },
            {
                id: 'classification', numeric: false, disablePadding: false, label: 'Classification Status',
            },
            {
                id: 'confident', numeric: false, disablePadding: false, label: 'Confident Score',
            },
        ]
    );

    React.useEffect(() => {
        if (previewStatus) {
            setHeadCells(
                [
                    {
                        id: 'name', numeric: false, disablePadding: true, label: 'Name',
                    },
                    {
                        id: 'creator_sort', numeric: false, disablePadding: false, label: 'Creator',
                    },
                    {
                        id: 'category', numeric: false, disablePadding: false, label: 'Category',
                    },
                ]
            );
        } else if (metaviewStatus) {
            setHeadCells(
                [
                    {
                        id: 'name', numeric: false, disablePadding: true, label: 'Name',
                    },
                    {
                        id: 'creator_sort', numeric: false, disablePadding: false, label: 'Creator',
                    },
                    {
                        id: 'date', numeric: false, disablePadding: false, label: 'Creation Date',
                    },
                    {
                        id: 'category', numeric: false, disablePadding: false, label: 'Category',
                    },
                    {
                        id: 'classification', numeric: false, disablePadding: false, label: 'Classification Status',
                    },
                ]
            );
        } else {
            setHeadCells(
                [
                    {
                        id: 'name', numeric: false, disablePadding: true, label: 'Name',
                    },
                    {
                        id: 'creator_sort', numeric: false, disablePadding: false, label: 'Creator',
                    },
                    {
                        id: 'date', numeric: false, disablePadding: false, label: 'Creation Date',
                    },
                    {
                        id: 'type', numeric: false, disablePadding: false, label: 'File Type',
                    },
                    {
                        id: 'size_sort', numeric: false, disablePadding: false, label: 'File Size',
                    },
                    {
                        id: 'category', numeric: false, disablePadding: false, label: 'Category',
                    },
                    {
                        id: 'classification', numeric: false, disablePadding: false, label: 'Classification Status',
                    },
                    {
                        id: 'confident', numeric: false, disablePadding: false, label: 'Confident Score',
                    },
                ]
            );
        }
    }, [previewStatus, metaviewStatus])

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
                <TableCell padding="checkbox" align='right' className='table-cell-general' />

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
                {previewStatus || metaviewStatus ? '' : <TableCell padding="checkbox" className='table-cell-general' />}
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable({ currentCategory, setCurrentCategory, searchValue, setSearchValue }) {
    const { fileList, setFileList } = React.useContext(AppContext);
    // const [currentUser, setCurrentUser] = React.useContext(AuthContext);
    const [rows, setRows] = React.useState([]);
    const [visibleRows, setVisibleRows] = React.useState([]);
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('date');
    const [selected, setSelected] = React.useState([]);
    const [selectedString, setSelectedString] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [metaviewStatus, setMetaviewStatus] = React.useState(false);
    const [previewStatus, setPreviewStatus] = React.useState(false);
    const [viewFile, setViewFile] = React.useState(false);
    const [viewInf, setViewInf] = React.useState({
        id: '',
        name: '',
        type: '',
        creator: '',
        size: '',
        created: ''
    });

    AWS.config.update({
        region: process.env.REACT_APP_BUCKET_REGION,
        accessKeyId: process.env.REACT_APP_BUCKET_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_BUCKET_SECRET_ACCESS_KEY,
    });

    React.useEffect(() => {
        setRows([...dataEdit(fileList)]);
    }, [fileList])

    React.useEffect(() => {
        setVisibleRows([...stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)]);
    }, [rows])

    React.useEffect(() => {
        setVisibleRows([...stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)]);
    }, [order, orderBy, page, rowsPerPage])

    React.useEffect(() => {
        let filtered = [];
        let temp = [];
        if (fileList.length) {
            if (currentCategory.length) {
                fileList.map((val, ind) => {
                    if (currentCategory.includes(val.category)) {
                        console.log("current category ===> ", currentCategory, ', value category ===> ', val.category);
                        filtered.push(val);
                    }
                })
            } else {
                filtered = fileList.slice(0, fileList.length)
            }
        }

        if (filtered.length) {
            if (searchValue) {
                let searchParams = searchValue.toLowerCase().replace(/\\/g, "\\\\");
                for (let i = 0; i < filtered.length; i++) {
                    if (filtered[i].filename.toLowerCase().search(searchParams) !== -1) {
                        temp.push(filtered[i]);
                    }
                }
                setRows([...dataEdit(temp)]);
            } else {
                setRows([...dataEdit(filtered)]);
            }
        } else {
            setRows([...dataEdit(filtered)]);
        }
    }, [currentCategory, searchValue])

    const dataEdit = (input) => {
        let temp = [];
        if (input && input.length) {
            temp = input.map((val, ind) => {

                let type = '';
                if (val.type === 'application/pdf') {
                    type = 'PDF';
                } else if (val.type === 'application/msword') {
                    type = 'DOC';
                } else if (val.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    type = 'DOC';
                } else {
                    type = 'Document';
                }

                let size = Number(val.size);
                if (size < 1048576) {
                    size = (size / 1024).toFixed(2).replace(/\.?0+$/, '') + 'KB';
                } else if (size < 1073741824) {
                    size = (size / 1048576).toFixed(2).replace(/\.?0+$/, '') + 'MB';
                } else {
                    size = (size / 1073741824).toFixed(2).replace(/\.?0+$/, '') + 'GB';
                }
                size = size.toString();

                return {
                    id: val._id,
                    name: val.filename,
                    creator: val.creatorName,
                    creator_sort: val.creatorName.toLowerCase(),
                    date: dateFormat(val.date),
                    date_sort: val.date,
                    type: type,
                    size: size,
                    size_sort: Number(val.size),
                    category: val.category,
                    classification: val.classification,
                    confident: val.confidence,
                    checked: false
                }
            })
        }
        return temp;
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        console.log(property)
        setOrderBy(property);
        setPage(0);
    };

    const onMetaViewOn = (data) => {
        console.log(data)
        setViewInf({
            id: data.id,
            name: data.name,
            type: data.type,
            creator: data.creator,
            size: data.size,
            created: data.date
        });
        setPreviewStatus(false);
        setMetaviewStatus(true);
    }

    const onMataviewOff = (event) => {
        setMetaviewStatus(false);
        setViewInf({
            id: '',
            name: '',
            type: '',
            creator: '',
            size: '',
            created: ''
        });
    }

    const onPreview = async (data) => {
        console.log(data)
        const s3 = new AWS.S3();
        setViewInf({
            id: data.id,
            name: data.name,
            type: data.type,
            creator: data.creator,
            size: data.size,
            created: data.date
        });
        if (data.type === 'PDF') {
            const params = {
                Bucket: process.env.REACT_APP_BUCKET_NAME,
                Key: `${data.name}`,
            };
            s3.getObject(params, (err, data) => {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    let csvBlob = new Blob([data.Body], {
                        type: 'application/pdf',
                    });
                    console.log("file data ====> ", csvBlob, "file type ===> ", csvBlob.type);

                    const url = URL.createObjectURL(csvBlob);
                    setViewFile(url);
                }
            });
        } else {
            const params = {
                Bucket: process.env.REACT_APP_BUCKET_NAME,
                Key: `${data.name}`,
                Expires: 60
            };
            const url = s3.getSignedUrl('getObject', params);
            setViewFile(`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`);
        }

        setMetaviewStatus(false);
        setPreviewStatus(true);
    }

    const onPreviewOff = (event) => {
        setPreviewStatus(false);
        setViewInf({
            id: '',
            name: '',
            type: '',
            creator: '',
            size: '',
            created: ''
        });
    }

    const onDelete = (data) => {
        setDeleteModal(true);
        let temp = [];
        for (let i = 0; i < rows.length; i++) {
            if (selected.includes(rows[i].id)) {
                temp.push(rows[i].name);
            }
        }
        setSelectedString([...temp]);
    }

    const deleteClose = (event) => {
        setDeleteModal(false);
        setSelectedString([]);
    }

    const deleteSubmit = async () => {
        const token = localStorage.getItem('user');
        console.log(token)
        try {
            const res = await api.post(
                `files/delete`,
                { items: selected },
                {
                    headers: {
                        'Authorization': `Bearer ${token.replace(/"/g, '')}`,
                    },
                }
            );
            alert(`${res.data.deletedCount} file${res.data.deletedCount > 1 ? 's' : ''} deleted successfully!`);
            setDeleteModal(false);
            const files = res.data.files;
            if (files && files.length) {
                setFileList([...files]);
            }
            setSelected([]);
            setSelectedString([]);
            if (res.data.files.length < page * rowsPerPage + 1) {
                if (page > 0) {
                    setPage(page - 1);
                    onVisibleRows(page - 1, rowsPerPage, dataEdit(res.data.files));
                } else {
                    onVisibleRows(0, rowsPerPage, dataEdit(res.data.files));
                }
            } else {
                onVisibleRows(page, rowsPerPage, dataEdit(res.data.files));
            }
        } catch (err) {
            console.log(err);
        }

    }

    const onVisibleRows = (page, perRows, data) => {
        if (perRows * (page + 1) > data.length) {
            setVisibleRows([...data.slice(page * perRows, data.length)]);
        } else {
            setVisibleRows(data.slice(page * perRows, perRows * (page + 1)));
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setPreviewStatus(false);
        setMetaviewStatus(false);
        onVisibleRows(newPage, rowsPerPage, rows);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        onVisibleRows(0, parseInt(event.target.value, 10), rows);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const getHighlightedCss = (id) => {
        return (previewStatus || metaviewStatus) && (viewInf.id === id) ? 'bolder' : 'normal';
    }

    const truncateFilename = (filename, maxLength) => {

        if (filename.length <= maxLength) {
            return filename;
        }

        const truncatedName = `${filename.substring(0, maxLength / 2)}...${filename.substring(filename.length - (maxLength / 2), filename.length)}`;
        // console.log(truncatedName)
        return truncatedName;
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <div className={clsx('metaview-content', previewStatus && 'metaview-grid')}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <div className='table-title'>Documents</div>
                    <TableContainer>
                        <Table
                            sx={previewStatus ? { minWidth: 500 } : { minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                previewStatus={previewStatus}
                                metaviewStatus={metaviewStatus}
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
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell align="right" onClick={(event) => handleClick(event, row.id)} padding="checkbox" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="right" padding="checkbox" onClick={(event) => handleClick(event, row.id)} className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>
                                                <FileType typeStr={row.type} />
                                            </TableCell>
                                            <Tooltip className='tooltip' title={row.name} >
                                                <TableCell
                                                    onClick={(event) => handleClick(event, row.id)}
                                                    style={{ maxWidth: 200, fontWeight: `${getHighlightedCss(row.id)}` }}
                                                    className={row.checked ? 'table-cell-selected' : 'table-cell-general'}
                                                    align="right"
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {truncateFilename(row.name, 12)}
                                                </TableCell>
                                            </Tooltip>
                                            <TableCell style={{ fontWeight: `${getHighlightedCss(row.id)}` }} onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.creator}</TableCell>
                                            {previewStatus ? '' : <TableCell style={{ fontWeight: `${getHighlightedCss(row.id)}` }} onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.date}</TableCell>}
                                            {previewStatus || metaviewStatus ? '' : <TableCell style={{ fontWeight: `${getHighlightedCss(row.id)}` }} onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.type}</TableCell>}
                                            {previewStatus || metaviewStatus ? '' : <TableCell style={{ fontWeight: `${getHighlightedCss(row.id)}` }} onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.size}</TableCell>}
                                            {<TableCell style={{ fontWeight: `${getHighlightedCss(row.id)}` }} onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.category}</TableCell>}
                                            {previewStatus ? '' : <TableCell style={{ fontWeight: `${getHighlightedCss(row.id)}` }} onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.classification}</TableCell>}
                                            {previewStatus || metaviewStatus ? '' : <TableCell style={{ fontWeight: `${getHighlightedCss(row.id)}` }} onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.confident}</TableCell>}
                                            {previewStatus || metaviewStatus ? ''
                                                :
                                                <TableCell align="right" style={{ minWidth: 120 }} className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>
                                                    {
                                                        selected.length ?
                                                            <InfoIcon className='disabled-icon icon-size' />
                                                            :
                                                            <Tooltip className='tooltip' title={'Metadata details'} onClick={() => onMetaViewOn(row)} >
                                                                <InfoIcon className='cursor-icon icon-size' />
                                                            </Tooltip>
                                                    }
                                                    {
                                                        selected.length ?
                                                            <RemoveRedEyeIcon className='disabled-icon icon-size' />
                                                            :
                                                            <Tooltip className='tooltip' title={'Peview document'} onClick={() => onPreview(row)} >
                                                                <RemoveRedEyeIcon className='cursor-icon icon-size' />
                                                            </Tooltip>
                                                    }
                                                    {
                                                        selected.length ?
                                                            <Tooltip aria-disabled className='tooltip ' title={'Remove document'} onClick={() => onDelete(row)}>
                                                                <DeleteIcon className='cursor-icon icon-size' />
                                                            </Tooltip>
                                                            :
                                                            <DeleteIcon className='icon-size disabled-icon' />
                                                    }
                                                </TableCell>
                                            }
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
                    open={deleteModal}
                    onClose={deleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle className='roboto-font' id="alert-dialog-title">
                        {`Do you want to Delete the following file${selected.length > 1 ? "s" : ""}?`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className='roboto-font' id="alert-dialog-description">
                            {selectedString.map((val, ind) => {
                                return (
                                    <div>{val}</div>
                                );
                            })}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteClose} className='roboto-font'>No</Button>
                        <Button onClick={deleteSubmit} autoFocus className='roboto-font'>Yes</Button>
                    </DialogActions>
                </Dialog>
                {metaviewStatus && <div className='metaview-box'>
                    <div className='grey-line'></div>
                    <div className='metaview-container'>
                        <div className='metaview-head'>
                            <div className='dis-cencer'>
                                <FileType typeStr={viewInf.type} />
                                <div style={{ maxWidth: 300 }} className='roboto-font font-size-16 black-font width-overflow'> {viewInf.name} </div>
                            </div>
                            <ClearIcon className='metaview-close' onClick={onMataviewOff} />
                        </div>
                        <div className='metaview-body'>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Type
                                </div>
                                <div className='roboto-font font-size-16'>
                                    {viewInf.type}
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Size
                                </div>
                                <div className='roboto-font font-size-16'>
                                    {viewInf.size}
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Storage Used
                                </div>
                                <div className='roboto-font font-size-16'>
                                    {viewInf.size}
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Owner
                                </div>
                                <div className='roboto-font font-size-16'>
                                    {viewInf.creator}
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Modified
                                </div>
                                <div className='roboto-font font-size-16'>
                                    {viewInf.created}
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Opened
                                </div>
                                <div className='roboto-font font-size-16'>
                                    {viewInf.created}
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Created
                                </div>
                                <div className='roboto-font font-size-16'>
                                    {viewInf.created}
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Description
                                </div>
                                <div className='roboto-font font-size-16'>
                                    no description
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                }

                {previewStatus && <div className='preview-box'>
                    <div className='grey-line'></div>
                    <div className='preview-container'>
                        <div className='preview-head'>
                            <div className='dis-cencer'>
                                <FileType typeStr={viewInf.type} />
                                <div className='roboto-font font-size-16 black-font'> {viewInf.name} </div>
                            </div>
                            <ClearIcon className='metaview-close' onClick={onPreviewOff} />
                        </div>
                        <iframe title="Viewer" className='full-size' src={viewFile}></iframe>
                    </div>
                    <div>
                    </div>
                </div>
                }
            </div>
            <FormControlLabel
                className='dense-padding-box roboto-font'
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}