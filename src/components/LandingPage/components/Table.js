import * as React from 'react';
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
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { visuallyHidden } from '@mui/utils';
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileWord2Line } from "react-icons/ri";
import { RiFilePpt2Line } from "react-icons/ri";
import { CiText } from "react-icons/ci";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import clsx from 'clsx';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import raw from '../../file/feedback.txt';


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
            <FaRegFilePdf className='font-size-16' />
        );
    } else if (typeStr === 'doc' || typeStr === 'docx' || typeStr === 'Doc' || typeStr === 'Docx' || typeStr === 'DOC' || typeStr === 'DOCX') {
        return (
            <RiFileWord2Line className='font-size-16' />
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

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, previewStatus } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const [headCells, setHeadCells] = React.useState(
        [
            {
                id: 'name', numeric: false, disablePadding: true, label: 'Name',
            },
            {
                id: 'creator', numeric: false, disablePadding: false, label: 'Creator',
            },
            {
                id: 'date', numeric: false, disablePadding: false, label: 'Creation Date',
            },
            {
                id: 'type', numeric: false, disablePadding: false, label: 'File Type',
            },
            {
                id: 'size', numeric: false, disablePadding: false, abel: 'File Size',
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
                        id: 'creator', numeric: false, disablePadding: false, label: 'Creator',
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
        } else {
            setHeadCells(
                [
                    {
                        id: 'name', numeric: false, disablePadding: true, label: 'Name',
                    },
                    {
                        id: 'creator', numeric: false, disablePadding: false, label: 'Creator',
                    },
                    {
                        id: 'date', numeric: false, disablePadding: false, label: 'Creation Date',
                    },
                    {
                        id: 'type', numeric: false, disablePadding: false, label: 'File Type',
                    },
                    {
                        id: 'size', numeric: false, disablePadding: false, label: 'File Size',
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
    }, [previewStatus])

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
                <TableCell padding="checkbox" className='table-cell-general' />
            </TableRow>
        </TableHead>
    );
}

export default function EnhancedTable() {
    const [rows, setRows] = React.useState(rowsTemp);
    const [visibleRows, setVisibleRows] = React.useState(rowsTemp.slice(0, 10));
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [deleteData, setDeleteData] = React.useState("");
    const [metaviewStatus, setMetaviewStatus] = React.useState(false);
    const [previewStatus, setPreviewStatus] = React.useState(false);
    const [textFile, setTextFile] = React.useState < String | null > (null);
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        // console.log(rows);
        // console.log(visibleRows);
    }, [rows, visibleRows])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onMataViewOn = (event) => {
        setPreviewStatus(false);
        setMetaviewStatus(true);
    }

    const onMataviewOff = (event) => {
        setMetaviewStatus(false);
    }

    const onPreview = async (event) => {
        // console.log("dfasfasdfsf")
        // fetch(raw)
        //     .then(r => {
        //         setTextFile(r.text());
        //         console.log(r.text());
        //     })
        //     .then(text => {
        //         console.log('text decoded:', text);
        //     });
        // try {
        //     const response = await fetch(raw);
        //     console.log(response);
        //     const text = await response.text();
        //     console.log(text);
        //     setTextFile(text ?? '');
        //     console.log('text decoded:', text);
        //     setMetaviewStatus(false);
        //     setPreviewStatus(true);
        // } catch (error) {
        //     console.error('Error fetching the file:', error);
        // }
        setMetaviewStatus(false);
        setPreviewStatus(true);
    }

    const onPreviewOff = (event) => {
        setPreviewStatus(false);
    }

    const onDelete = (data) => {
        setDeleteData(data);
        setDeleteModal(true);
    }

    const deleteClose = (event) => {
        setDeleteModal(false);
        setDeleteData({});
    }

    const deleteSubmit = (id) => {
        setDeleteModal(false);
        const filteredData = rows.filter(data => data.id !== id);
        setRows(filteredData);

        if (filteredData.length === page * rowsPerPage) {
            if (page > 0) {
                setPage(page - 1);
                onVisibleRows(page - 1, rowsPerPage, filteredData);
            } else {
                onVisibleRows(0, rowsPerPage, filteredData);
            }
        } else {
            onVisibleRows(page, rowsPerPage, filteredData);
        }
        setDeleteData({});
    }

    const onVisibleRows = (page, perRows, data) => {
        if (perRows * (page + 1) > data.length) {
            setVisibleRows(data.slice(page * perRows, data.length));
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
        const temp = rows;
        temp[id - 1].checked = !temp[id - 1].checked;
        setRows(temp);
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

    const docs = [
        // {
        //   // uri: "url", // for remote file
        //   uri: "https://arxiv.org/pdf/quant-ph/0410100", // for local file
        // },
        {
            uri: "./demo.docx", // for remote file
            // uri: "/demo.pptx", // for local file
        },
        // {
        //     uri: "https://github.com/kartikxisk/docx-xlsx-pptx-pdf-viewer-nextjs-and-reactjs/files/11781036/demo.pptx", // for remote file
        //     // uri: "/demo.docx", // for local file
        // },
        // {
        //     uri: "https://github.com/kartikxisk/docx-xlsx-pptx-pdf-viewer-nextjs-and-reactjs/files/11781037/demo.xlsx", // for remote file
        //     // uri: "/demo.xlsx", // for local file
        // },
    ];

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <div className={clsx('metaview-content', previewStatus && 'metaview-grid')}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table
                            sx={previewStatus ? { minWidth: 500 } : { minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                previewStatus={previewStatus}
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
                                            <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.creator}</TableCell>
                                            {previewStatus ? '' : <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.date}</TableCell>}
                                            {previewStatus ? '' : <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.type}</TableCell>}
                                            {previewStatus ? '' : <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.size}</TableCell>}
                                            <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.category}</TableCell>
                                            <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.classification}</TableCell>
                                            <TableCell onClick={(event) => handleClick(event, row.id)} align="right" className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>{row.confident}</TableCell>
                                            <TableCell align="right" style={{ minWidth: 95 }} className={row.checked ? 'table-cell-selected' : 'table-cell-general'}>
                                                <Tooltip className='tooltip' title={'Metadata details'}>
                                                    <InfoIcon onClick={onMataViewOn} className='cursor-icon' />
                                                </Tooltip>
                                                <Tooltip className='tooltip' title={'Peview document'} onClick={() => onPreview(row)} >
                                                    <RemoveRedEyeIcon className='cursor-icon' />
                                                </Tooltip>
                                                <Tooltip className='tooltip' title={'Remove document'} onClick={() => onDelete(row)}>
                                                    <DeleteIcon className='cursor-icon' />
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
                    open={deleteModal}
                    onClose={deleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle className='roboto-font' id="alert-dialog-title">
                        {`Do you want to remove '${deleteData.name}' ?`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className='roboto-font' id="alert-dialog-description">
                            If you want to remove this data, just click 'Agree Button'.
                            In this case, you can't recover this document.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteClose} className='roboto-font'>Disagree</Button>
                        <Button onClick={() => { deleteSubmit(deleteData.id) }} autoFocus className='roboto-font'>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                {metaviewStatus && <div className='metaview-box'>
                    <div className='grey-line'></div>
                    <div className='metaview-container'>
                        <div className='metaview-head'>
                            <div className='dis-cencer'>
                                <TextSnippetIcon />
                                <div className='roboto-font font-size-16 black-font'> Microsoft.pdf </div>
                            </div>
                            <ClearIcon className='metaview-close' onClick={onMataviewOff} />
                        </div>
                        <div className='metaview-body'>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Type
                                </div>
                                <div className='roboto-font font-size-16'>
                                    Word
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Size
                                </div>
                                <div className='roboto-font font-size-16'>
                                    16 KB
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Storage Used
                                </div>
                                <div className='roboto-font font-size-16'>
                                    16 KB
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Owner
                                </div>
                                <div className='roboto-font font-size-16'>
                                    Rajan
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Modified
                                </div>
                                <div className='roboto-font font-size-16'>
                                    2023-11-19
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Opened
                                </div>
                                <div className='roboto-font font-size-16'>
                                    2024-04-11
                                </div>
                            </div>
                            <div className='metaview-cell'>
                                <div className='roboto-font font-size-12 font-bolder black-font'>
                                    Created
                                </div>
                                <div className='roboto-font font-size-16'>
                                    2033-11-01
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
                                <TextSnippetIcon />
                                <div className='roboto-font font-size-16 black-font'> Microsoft.pdf </div>
                            </div>
                            <ClearIcon className='metaview-close' onClick={onPreviewOff} />
                        </div>
                        {/* <div className='preview-body'>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                <div
                                    style={{
                                        border: '1px solid rgba(0, 0, 0, 0.3)',
                                        height: '750px',
                                    }}
                                >
                                    <Viewer fileUrl="./demo.docx" />
                                </div>
                            </Worker>
                        </div> */}
                        {/* <DocViewer
                            prefetchMethod="GET" // for remote fetch
                            documents={docs}
                            pluginRenderers={DocViewerRenderers}
                            style={{ height: "100vh" }} //custom style
                        /> */}
                        {/* <div>
                            {previewStatus && textFile && <pre>{textFile}</pre>}
                        </div> */}
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