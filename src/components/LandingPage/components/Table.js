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

function createData(name, creator, date, type, size, category, classification, confident) {
    return { name, creator, date, type, size, category, classification, confident };
}

const rows = [
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10 kb", "Contract", "Finished", "75.25%"),
];

export default function CustomizedTables() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [metaviewStatus, setMetaviewStatus] = React.useState(false);
    const [previewStatus, setPreviewStatus] = React.useState(false);

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
                                    <Checkbox  />
                                </StyledTableCell>
                                <Tooltip className='tooltip' title={'This is tooltip for metadata'} onDoubleClick={onPreview}>
                                    <StyledTableCell align="left" style={{ minWidth: 70 }} className='global-font'>
                                        {row.name}
                                    </StyledTableCell>
                                </Tooltip>
                                <StyledTableCell align="center" style={{ minWidth: 80 }} className='global-font' onDoubleClick={onPreview}>
                                    {row.creator}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 120 }} className='global-font' onDoubleClick={onPreview}>
                                    {row.date}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 90 }} className='global-font' onDoubleClick={onPreview}>
                                    {row.type}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 90 }} className='global-font' onDoubleClick={onPreview}>
                                    {row.size}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 70 }} className='global-font' onDoubleClick={onPreview}>
                                    {row.category}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 160 }} className='global-font' onDoubleClick={onPreview}>
                                    {row.classification}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 135 }} className='global-font' onDoubleClick={onPreview}>
                                    {row.confident}
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{ minWidth: 95 }} >
                                    <Tooltip className='tooltip' title={'Metadata details'}>
                                        <InfoIcon onClick={onMataViewOn} className='cursor-icon' />
                                    </Tooltip>
                                    <Tooltip className='tooltip' title={'Peview document'}>
                                        <RemoveRedEyeIcon className='cursor-icon' />
                                    </Tooltip>
                                    <Tooltip className='tooltip' title={'Remove document'}>
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
            </TableContainer>
            {metaviewStatus ? <div className='metaview-box'>
                <div onClick={onMataviewOff} className='metaview-head'>
                    <ClearIcon className='metaview-close' />
                </div>
            </div>
                :
                <div></div>}
        </div>
    );
}