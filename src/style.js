import { makeStyles } from '@mui/styles';

export const commonStyles = makeStyles({
    assistRoot: {
        width: '100% !important',
        marginBottom: '30px'
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
    pwdinput: {
        backgroundColor: "white !important"
    }
});