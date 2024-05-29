import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import AuthContext from '../../../context/authContext';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Snackbar from '@mui/joy/Snackbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CategoryButton from './CategoryButton';
import CustomizedTables from './Table'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { message, Upload } from 'antd';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import axios from 'axios';
window.Buffer = window.Buffer || require("buffer").Buffer;
const { Dragger } = Upload;


export default function Content() {
  const [currentUser, setCurrentUser] = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);
  const descriptionElementRef = React.useRef(null);
  const [snackState, setSnackState] = React.useState({
    snackOpen: false,
    vertical: 'top',
    horizontal: 'center',
    message: ""
  });
  const { vertical, horizontal, snackOpen, message } = snackState;

  const S3_BUCKET = 'docubucket';
  const REGION = process.env.REACT_APP_BUCKET_REGION;

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_BUCKET_SECRET_ACCESS_KEY,
  });

  const s3 = new S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const allowedTypes = [
    'application/pdf',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/xml',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv'
  ];

  React.useEffect(() => {
    setFileList([]);
  }, [])

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  React.useEffect(() => {
    // console.log(fileList);
  }, [fileList])

  const onUploadChange = (e) => {
    let temp = [];
    e.fileList.map(val => {
      if (allowedTypes.includes(val.type)) {
        if (val.originFileObj) {
          temp.push(val.originFileObj);
        } else {
          temp.push(val);
        }
      }
    })
    setFileList([...temp]);
  }

  const onUploadDrop = (e) => {
    // setFileList([...e.dataTransfer.files]);
  }

  const handleFileUpload = (e, popupState) => {
    let temp = [];
    Array.from(e.target.files).map(val => {
      if (allowedTypes.includes(val.type)) {
        temp.push(val);
      }
    })
    if (fileList) {
      fileList.map(val => {
        if (allowedTypes.includes(val.type)) {
          temp.push(val);
        }
      })
    }
    setFileList([...temp]);
    popupState.close();
  };

  const handleFolderUpload = (e, popupState) => {
    let temp = [];
    Array.from(e.target.files).map(val => {
      if (allowedTypes.includes(val.type)) {
        temp.push(val);
      }
    })
    if (fileList) {
      fileList.map(val => {
        if (allowedTypes.includes(val.type)) {
          temp.push(val);
        }
      })
    }
    setFileList([...temp]);
    popupState.close();
  };

  const onDelete = (e) => {
    console.log('upload delete event');
    console.log(e);
  }

  const handleButtonClick = (e) => {
    // Prevent the Dragger's and other events from being triggered
    e.stopPropagation();
  };

  const handleClickOpen = () => {
    setFileList([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFileList([]);
  };

  const uploadSubmit = (e) => {
    console.log("length ===> ", fileList.length)

    if (fileList.length) {
      if (fileList.length === 1) {
        alert(`1 file uploaded successfully!`);
      } else {
        alert(`${fileList.length} files uploaded successfully!`);
      }
    } else {
      // alert(`No file uploaded!`);
    }

    for (let i = 0; i < fileList.length; i++) {
      handleUpload(fileList[i]);
    }
    // if(fileList.length) {
    //   alert(`${fileList.length} files uploaded successfully!`);
    // } else {
    //   alert(`No file uploaded!`);
    // }
    setFileList([]);
    setOpen(false);
  }

  const handleUpload = async (file) => {

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };
    console.log(S3_BUCKET);
    try {
      const upload = await s3.putObject(params).promise();
      console.log("File uploaded successfully ===>>> ", upload);
      const fileInf = {
        creatorName: currentUser.username,
        filename: file.name,
        type: file.type,
        size: file.size
      }
      console.log("backend sending data ===> ", fileInf);

      const token = localStorage.getItem('user')
      axios.post(
        'https://4a29-45-8-22-59.ngrok-free.app/api/files/newUpload',
        fileInf,
        {
          headers: {
            'x-auth-token': `Bearer ${token.replace(/"/g, '')}`,
          }
        }
      )
        .then(res => {
          console.log("File Inf saving success ===> ", res.data);
        })
        .catch(err => {
          console.log("File Inf saving error ===>>> ", err);
        })
    } catch (error) {
      console.error("File uploading error ===>>> ", error);
    }
  }

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
              className='global-font search-box'
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Search"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your email address',
                style: {
                  fontSize: 16,
                  fontFamily: 'roboto',
                  height: '32px'
                }
              }}
            />
            <CategoryButton
              className='global-font category-box'
            />
            <Button variant="contained" color="primary" className='doc-upload-btn' onClick={handleClickOpen} >
              Upload
            </Button>
          </Stack>
        </Stack>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title"><div className='roboto-font font-size-28 dis-center'>Document Upload</div></DialogTitle>
          <DialogContent>
            <Dragger name='drag' listType='text' onChange={onUploadChange} onDrop={onUploadDrop} onRemove={onDelete} fileList={fileList} multiple={true} className='mb-100 bg-remove'>
              <p className="ant-upload-drag-icon bg-remove" onClick={handleButtonClick}>
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Button variant="contained" {...bindTrigger(popupState)} className='pop-upload roboto-font font-size-16 mouse-pointer' >
                        Upload
                      </Button>
                      <Menu {...bindMenu(popupState)} >
                        <MenuItem className='pop-menu-box roboto-font font-size-16 mouse-pointer' >
                          <FileUploadIcon className='mr-15 background-remove' />
                          <label htmlFor="file-upload" className='background-remove mouse-pointer'>Upload File</label>
                          <input type="file" multiple={true} id="file-upload" className='background-remove' style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, popupState)} />
                        </MenuItem>
                        <MenuItem className='pop-menu-box roboto-font font-size-16 mouse-pointer' >
                          <FileUploadIcon className='mr-15 background-remove' />
                          <label htmlFor="folder-upload" className='background-remove mouse-pointer'>Upload Folder</label>
                          <input type="file" multiple={true} id="folder-upload" className='background-remove' style={{ display: 'none' }} directory="" webkitdirectory="" onChange={(e) => handleFolderUpload(e, popupState)} />
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </p>
              <p className="ant-upload-text bg-remove roboto-font up-exp">Click or Drag file here to upload</p>
              {/* <p className="ant-upload-hint bg-remove roboto-font">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
              </p> */}
            </Dragger>
          </DialogContent>
          <DialogActions className='space-between'>
            <Button onClick={handleClose} className='roboto-font font-size-16' >Cancel</Button>
            <Button disabled={snackOpen} onClick={uploadSubmit} className='roboto-font font-size-16 mr-10' >Upload</Button>
          </DialogActions>
        </Dialog>
        <CustomizedTables />
      </Container>
      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={7000}
        open={snackOpen}
        variant='outlined'
        color='primary'
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setSnackState({
            snackOpen: false,
            vertical: 'top',
            horizontal: 'center',
            message: ""
          })
        }}
      >
        {message}
      </Snackbar> */}
    </Box >
  );
}
