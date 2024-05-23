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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';


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


const metadatas = ['Type', 'Size', 'Storage Used', 'Owner', 'Modified', 'Opened', 'Created', 'Description']

function createMeta(type, size, storage, owner, modify, open, create, description) {
    return { type, size, storage, owner, modify, open, create, description };
}

const metaRows = [
    createMeta('Word', '16 KB', '16 KB', 'Rajan', '2023-11-19', '2024-04-11', '2033-11-01', 'no description'),
    createMeta('Word', '16 KB', '16 KB', 'Rajan', '2023-11-19', '2024-04-11', '2033-11-01', 'no description'),
    createMeta('Word', '16 KB', '16 KB', 'Rajan', '2023-11-19', '2024-04-11', '2033-11-01', 'no description'),
    createMeta('Word', '16 KB', '16 KB', 'Rajan', '2023-11-19', '2024-04-11', '2033-11-01', 'no description'),
    createMeta('Word', '16 KB', '16 KB', 'Rajan', '2023-11-19', '2024-04-11', '2033-11-01', 'no description'),
    createMeta('Word', '16 KB', '16 KB', 'Rajan', '2023-11-19', '2024-04-11', '2033-11-01', 'no description'),
    createMeta('Word', '16 KB', '16 KB', 'Rajan', '2023-11-19', '2024-04-11', '2033-11-01', 'no description'),
    createMeta('Word', '16 KB', '16 KB', 'Rajan', '2023-11-19', '2024-04-11', '2033-11-01', 'no description'),
]

function createData(name, creator, date, type, size, category, classification, confident) {
    return { name, creator, date, type, size, category, classification, confident };
}

const rows = [
    createData(1, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(2, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(3, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(4, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(5, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(6, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(7, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(8, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(9, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(10, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(11, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(12, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(13, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(14, 'Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(15, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(16, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(17, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(18, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(19, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(20, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(21, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(22, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(23, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(24, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(25, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(26, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(27, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(28, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(29, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData(30, 'Microsoft', "Justin Stone", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
];

export default function CustomizedTables() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [metaviewStatus, setMetaviewStatus] = React.useState(false);
    const [previewStatus, setPreviewStatus] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState(false);
    const [deleteData, setDeleteData] = React.useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onMataViewOn = (event) => {
        setMetaviewStatus(true);
    }

    const onMataviewOff = (event) => {
        setMetaviewStatus(false);
    }

    const onPreview = (event) => {
        setPreviewStatus(true);
    }

    const offPreview = (event) => {
        setPreviewStatus(false);
    }

    const onDelete = (event) => {
        setDeleteData(event.name);
        setDeleteModal(true);
    }

    const deleteClose = (event) => {
        setDeleteModal(false);
        setDeleteData("");
    }

    const deleteSubmit = (event) => {
        setDeleteModal(false);
        setDeleteData("");
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <div className='metaview-content'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 920 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right" className='global-font teal' style={{ minWidth: 10 }}></StyledTableCell>
                            <StyledTableCell align="left" className='global-font teal' style={{ minWidth: 70 }}>Name</StyledTableCell>
                            <StyledTableCell align="center" className='global-font teal' style={{ minWidth: 80 }}>Creator</StyledTableCell>
                            <StyledTableCell align="center" className='global-font teal' style={{ minWidth: 120 }}>Creation Date</StyledTableCell>
                            <StyledTableCell align="center" className='global-font teal' style={{ minWidth: 90 }}>File Type</StyledTableCell>
                            <StyledTableCell align="center" className='global-font teal' style={{ minWidth: 90 }}>File Size</StyledTableCell>
                            <StyledTableCell align="center" className='global-font teal' style={{ minWidth: 70 }}>Category</StyledTableCell>
                            <StyledTableCell align="center" className='global-font teal' style={{ minWidth: 160 }}>Classification Status</StyledTableCell>
                            <StyledTableCell align="center" className='global-font teal' style={{ minWidth: 135 }}>Confident Score</StyledTableCell>
                            <StyledTableCell align="right" className='global-font teal' style={{ minWidth: 95 }}></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell align="left" style={{ minWidth: 10 }} className='global-font'>
                                    <Checkbox />
                                </StyledTableCell>
                                <Tooltip className='tooltip' title={'This is tooltip for metadata'} onDoubleClick={() => onPreview(row)}>
                                    <StyledTableCell align="left" style={{ minWidth: 70 }} className='global-font'>
                                        {row.name}
                                    </StyledTableCell>
                                </Tooltip>
                                <StyledTableCell align="center" style={{ minWidth: 80 }} className='global-font' onDoubleClick={() => onPreview(row)}>
                                    {row.creator}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 120 }} className='global-font' onDoubleClick={() => onPreview(row)}>
                                    {row.date}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 90 }} className='global-font' onDoubleClick={() => onPreview(row)}>
                                    {row.type}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 90 }} className='global-font' onDoubleClick={() => onPreview(row)}>
                                    {row.size}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 70 }} className='global-font' onDoubleClick={() => onPreview(row)}>
                                    {row.category}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 160 }} className='global-font' onDoubleClick={() => onPreview(row)}>
                                    {row.classification}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 135 }} className='global-font' onDoubleClick={() => onPreview(row)}>
                                    {row.confident}
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{ minWidth: 95 }} >
                                    <Tooltip className='tooltip' title={'Metadata details'}>
                                        <InfoIcon onClick={onMataViewOn} className='cursor-icon' />
                                    </Tooltip>
                                    <Tooltip className='tooltip' title={'Peview document'} onClick={() => onPreview(row)} >
                                        <RemoveRedEyeIcon className='cursor-icon' />
                                    </Tooltip>
                                    <Tooltip className='tooltip' title={'Remove document'} onClick={() => onDelete(row)}>
                                        <DeleteIcon className='cursor-icon' />
                                    </Tooltip>
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
                <BootstrapDialog
                    onClose={offPreview}
                    aria-labelledby="customized-dialog-title"
                    open={previewStatus}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Microsoft
                    </DialogTitle>
                    {/* <IconButton
                        aria-label="close"
                        onClick={offPreview}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton> */}
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                            consectetur ac, vestibulum at eros.
                        </Typography>
                        <Typography gutterBottom>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                        </Typography>
                        <Typography gutterBottom>
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                            ullamcorper nulla non metus auctor fringilla.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={offPreview}>
                            Close
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
                <Dialog
                    open={deleteModal}
                    onClose={deleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle className='roboto-font' id="alert-dialog-title">
                        {`Do you want to remove '${deleteData}' ?`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className='roboto-font' id="alert-dialog-description">
                            If you want to remove this data, just click 'Agree Button'.
                            In this case, you can't recover this document.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteClose} className='roboto-font'>Disagree</Button>
                        <Button onClick={deleteSubmit} autoFocus className='roboto-font'>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableContainer>
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
                        {/* {metadatas.map((head) => ( */}

                        {/* ))} */}
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
        </div>
    );
}