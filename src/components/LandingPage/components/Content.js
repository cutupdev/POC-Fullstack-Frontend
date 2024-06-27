import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import AuthContext from '../../../context/authContext';
import AppContext from '../../../context/appContext';
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
import CloseIcon from '@mui/icons-material/Close';
import { message, Upload } from 'antd';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import api from '../../../utils/api';
import { Buffer } from 'buffer';
// window.Buffer = window.Buffer || require("buffer").Buffer;
const { Dragger } = Upload;


export default function Content() {
  const [currentUser, setCurrentUser] = React.useContext(AuthContext);
  const { fileList, setFileList } = React.useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [newFiles, setNewFiles] = React.useState([]);
  const descriptionElementRef = React.useRef(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [currentCategory, setCurrentCategory] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [snackState, setSnackState] = React.useState({
    snackOpen: false,
    vertical: 'top',
    horizontal: 'center',
    message: ""
  });
  const { vertical, horizontal, snackOpen, message } = snackState;

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
    setNewFiles([]);
  }, [])

  React.useEffect(() => {
    if (searchValue) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [searchValue])

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  React.useEffect(() => {
    // console.log(newFiles);
  }, [newFiles])

  const searchChange = (e) => {
    console.log(e.target.value)
    setSearchValue(e.target.value);
  }

  const searchClose = (e) => {
    setVisible(false);
    setSearchValue("");
  }

  const allowedTypes = [
    'application/pdf',
    // 'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    // 'application/vnd.ms-powerpoint',
    // 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // 'application/xml',
    // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // 'application/vnd.ms-excel',
    // 'text/csv'
  ];

  const onUploadChange = (e) => {
    let temp = [];
    let flag = false;
    e.fileList.map(val => {
      if (allowedTypes.includes(val.type)) {
        if (val.originFileObj) {
          temp.push(val.originFileObj);
        } else {
          temp.push(val);
        }
      } else {
        flag = true;
      }
    })
    if (flag) {
      alert('Only pdf or doc/docx are supported…');
    }
    setNewFiles([...temp]);
  }

  const onUploadDrop = (e) => {
    // setNewFiles([...e.dataTransfer.files]);
  }

  const handleFileUpload = (e, popupState) => {
    let temp = [];
    Array.from(e.target.files).map(val => {
      if (allowedTypes.includes(val.type)) {
        temp.push(val);
      }
    })
    if (newFiles) {
      newFiles.map(val => {
        if (allowedTypes.includes(val.type)) {
          temp.push(val);
        }
      })
    }
    setNewFiles([...temp]);
    popupState.close();
  };

  const handleFolderUpload = (e, popupState) => {
    let temp = [];
    Array.from(e.target.files).map(val => {
      if (allowedTypes.includes(val.type)) {
        temp.push(val);
      }
    })
    if (newFiles) {
      newFiles.map(val => {
        if (allowedTypes.includes(val.type)) {
          temp.push(val);
        }
      })
    }
    setNewFiles([...temp]);
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
    console.log(currentUser)
    setNewFiles([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewFiles([]);
  };

  const uploadSubmit = async (e) => {
    console.log("length ===> ", newFiles.length)
    let tempList = fileList.slice(0, fileList.length)
    
    let uploadCount = 0;

    const uploadPromises = newFiles.map(async (file) => {
      const flag = await handleUpload(file);
      if (flag.status) {
        uploadCount++;
        tempList.unshift(flag.data)
      }
      return flag.status;
    });

    // Wait for all files to finish uploading
    await Promise.all(uploadPromises);

    if (uploadCount) {
      if (uploadCount === 1) {
        alert(`1 file uploaded successfully!`);
      } else {
        alert(`${uploadCount} files uploaded successfully!`);
      }
      setFileList([...tempList]);
    } else {
      alert(`No file uploaded!`);
    }
    setNewFiles([]);
    setOpen(false);
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
      Key: file.name,
      // Body: file,
      Body: fileBuffer
    };

    console.log(S3_BUCKET);
    try {
      const upload = await s3.putObject(params).promise();
      console.log("File uploaded successfully ===>>> ", upload);
      const fileInf = {
        creatorName: currentUser.username,
        filename: file.name,
        type: file.type,
        size: file.size,
        date: Date.now(),
      }
      console.log("backend sending data ===> ", fileInf);

      const token = localStorage.getItem('user')
      try {
        const res = await api.post(
          `files/newUpload`,
          fileInf,
          {
            headers: {
              'Authorization': `Bearer ${token.replace(/"/g, '')}`,
            },
          }
        );
        console.log("File Inf saving success ===> ", res.data.newData);
        
        return { status: true, data: res.data.newData };
      } catch (err) {
        console.log("File Inf saving error ===>>> ", err);
        return false;
      }
    } catch (error) {
      console.error("File uploading error ===>>> ", error);
      return false;
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
            <div className='password-box'>
              <TextField
                id="search-box"
                hiddenLabel
                value={searchValue}
                onChange={searchChange}
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
              <span className='visibility-box-search'>
                {visible && <CloseIcon onClick={searchClose} className='visibility' />}
              </span>
            </div>
            <CategoryButton
              className='global-font category-box'
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
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
            <Dragger accept='.docx, .pdf' name='drag' listType='text' onChange={onUploadChange} onDrop={onUploadDrop} onRemove={onDelete} fileList={newFiles} multiple={true} className='mb-100 bg-remove'>
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
                          <input accept='.docx, .pdf' type="file" multiple={true} id="file-upload" className='background-remove' style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, popupState)} />
                        </MenuItem>
                        <MenuItem className='pop-menu-box roboto-font font-size-16 mouse-pointer' >
                          <FileUploadIcon className='mr-15 background-remove' />
                          <label htmlFor="folder-upload" className='background-remove mouse-pointer'>Upload Folder</label>
                          <input accept='.docx, .pdf' type="file" multiple={true} id="folder-upload" className='background-remove' style={{ display: 'none' }} directory="" webkitdirectory="" onChange={(e) => handleFolderUpload(e, popupState)} />
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
            <p className='file-upload-support'>*only PDFs and Docx are supported</p>
            <Button onClick={handleClose} className='roboto-font font-size-16' >Cancel</Button>
            <Button disabled={snackOpen} onClick={uploadSubmit} className='roboto-font font-size-16 mr-10' >Upload</Button>
          </DialogActions>
        </Dialog>
        <CustomizedTables currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} searchValue={searchValue} setSearchValue={setSearchValue} />
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
