import { makeStyles } from '@mui/styles';

export const commonStyles = makeStyles({
    metaviewContent: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100% !important',
    },
    metaviewBox: {
        width: '200px !important',
        maxWidth: '200px !important',
        minWidth: '200px !important',
        backgroundColor: '#aaaaaa !important',
        borderRadius: '10px',
    },
    metaviewHead: {
        display: 'flex',
        justifyContent: 'flex-end',
        borderRadius: '10px',
    },
    metaviewClose: {
        cursor: 'pointer',
        marginTop: '10px',
        marginRight: '10px',
    },
    menuItem: {
        marginLeft: '10px !important',
        marginRight: '10px !important',
    },
    globalFont: {
        fontSize: '14px !important',
        // fontFamily: 'serif !important',
        fontStyle: 'normal !important',
        fontWeight: 'normal !important',
    },
    assistRoot: {
        width: '100% !important',
        marginBottom: '30px'
    },
    fullWidth: {
        width: '100% !important',
    },
    funcBox: {
        display: "flex !important",
        justifyContent: "space-between",
        width: '100% !important',
        alignItems: 'center'
    },
    categoryRoot: {
        margin: '0px !important'
    },
    uploadBox: {
        border: '1px solid #CAD2E0 !important',
        borderRadius: '10px',
        cursor: 'pointer',
        padding: '5px',
        background: '#F3F4F9',
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    uploadLetter: {
        display: 'flex', 
        justifyContent: 'center',
        fontSize: '14px !important',
        fontFamily: 'serif !important',
        fontStyle: 'normal !important',
        fontWeight: 'normal !important',
    },
    uploadNoSelect: {
        fontWeight: '200',
        fontSize: '12px !important',
        fontFamily: 'serif !important',
        fontStyle: 'normal !important',
    },
    passwordBox: {
        display: "flex",
    },
    visibility1: {
        zIndex: 9,
        background: "#F1F3F8"
    },
    visibility2: {
        zIndex: 9,
        background: "#F1F3F8"
    },
    visibilityBox: {
        position: "absolute",
        marginTop: "8px",
        right: "10px !important",
        height: "10px",
        backgroundColor: "white !important"
    },
    cursorIcon: {
        cursor: 'pointer',
        background: 'transparent !important',
        fontSize: '16px !important',
        marginLeft: '5px !important'
    },
    tooltip: {
        cursor: 'pointer',
    },
    pwdinput: {
        backgroundColor: "white !important"
    },
    pagination: {
        width: '100% !important',
        fontSize: '14px !important',
        fontWeight: 'normal !important',
        fontFamily: 'serif !important',
        fontStyle: 'normal !important',
    }
});