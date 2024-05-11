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
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { commonStyles } from '../../../style';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
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
    const classes = commonStyles();
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
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
    createData('Microsoft', "Microgift", "2024-05-09 20:30", "Pdf", "10kbyte", "Contract", "Finished", "89%"),
];

export default function CustomizedTables() {
    const classes = commonStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
        <div className={classes.metaviewContent}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 815 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left" className={classes.globalFont} style={{ minWidth: 80 }}>Name</StyledTableCell>
                            <StyledTableCell align="center" className={classes.globalFont} style={{ minWidth: 80 }}>Creator</StyledTableCell>
                            <StyledTableCell align="center" className={classes.globalFont} style={{ minWidth: 120 }}>Creation Date</StyledTableCell>
                            <StyledTableCell align="center" className={classes.globalFont} style={{ minWidth: 100 }}>File Type</StyledTableCell>
                            <StyledTableCell align="center" className={classes.globalFont} style={{ minWidth: 80 }}>File Size</StyledTableCell>
                            <StyledTableCell align="center" className={classes.globalFont} style={{ minWidth: 70 }}>Category</StyledTableCell>
                            <StyledTableCell align="center" className={classes.globalFont} style={{ minWidth: 150 }}>Classification Status</StyledTableCell>
                            <StyledTableCell align="center" className={classes.globalFont} style={{ minWidth: 125 }}>Confident Score</StyledTableCell>
                            <StyledTableCell align="right" className={classes.globalFont} style={{ minWidth: 10 }}></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <StyledTableRow key={row.name} onDoubleClick={onPreview}>
                                <Tooltip className={classes.tooltip} title={'This is tooltip for metadata'}>
                                    <StyledTableCell align="left" style={{ minWidth: 80 }} className={classes.globalFont}>
                                        {row.name}
                                    </StyledTableCell>
                                </Tooltip>
                                <StyledTableCell align="center" style={{ minWidth: 80 }} className={classes.globalFont}>
                                    {row.creator}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 120 }} className={classes.globalFont}>
                                    {row.date}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 100 }} className={classes.globalFont}>
                                    {row.type}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 80 }} className={classes.globalFont}>
                                    {row.size}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 70 }} className={classes.globalFont}>
                                    {row.category}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 150 }} className={classes.globalFont}>
                                    {row.classification}
                                </StyledTableCell>
                                <StyledTableCell align="center" style={{ minWidth: 125 }} className={classes.globalFont}>
                                    {row.confident}
                                </StyledTableCell>
                                <StyledTableCell align="right"  style={{ minWidth: 10 }} >
                                    <Tooltip className={classes.tooltip} title={'Metadata details'}>
                                        <RemoveRedEyeIcon  onClick={onMataViewOn} className={classes.cursorIcon} />
                                    </Tooltip>
                                    <Tooltip className={classes.tooltip} title={'Remove document'}>
                                        <DeleteForeverIcon className={classes.cursorIcon} />
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
                                className={classes.pagination}
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
            </TableContainer>
            {metaviewStatus ? <div className={classes.metaviewBox}>
                <div onClick={onMataviewOff} className={classes.metaviewHead}>
                    <ClearIcon className={classes.metaviewClose} />
                </div>
            </div> 
                : 
            <div></div>}
        </div>
    );
}