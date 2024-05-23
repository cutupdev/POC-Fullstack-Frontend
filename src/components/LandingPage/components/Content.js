import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
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

const { Dragger } = Upload;


export default function Content() {

  const [open, setOpen] = React.useState(false);
  const [fileList, setFileList] = React.useState([
    {
      uid: '0',
      name: 'xxx.png',
    },
  ]);
  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const onUploadChange = (e) => {
    console.log('upload change event');
    console.log(e);
    // const files = e.target.files;
    // if (files.length) {
    //   setFileList(prev => ({ ...prev, files }));
    // }
  }

  const onUploadDrop = (e) => {
    console.log('upload drop event');
    console.log(e);
    // const files = e.target.files;
    // if (files.length) {
    //   setFileList(prev => ({ ...prev, files }));
    // }
  }

  const onDelete = (e) => {
    console.log('upload delete event');
    console.log(e);
  }

  const handleFileUpload = (e) => {
    console.log('file upload button');
    console.log(e);
    // const files = e.target.files;
    // if (files.length) {
    //   setFileList(prev => ({ ...prev, files }));
    // }
  };

  const handleFolderUpload = (e) => {
    console.log('folder upload button');
    console.log(e);
    // const files = e.target.files;
    // if (files.length > 0) {
    //   setFileList(prev => ({ ...prev, files }));
    // }
  };

  const handleButtonClick = (e) => {
    // Prevent the Dragger's and other events from being triggered
    e.stopPropagation();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadSubmit = (e) => {
    setOpen(false);
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
                          <input type="file" list='text' multiple={true} id="file-upload" className='background-remove' style={{ display: 'none' }} onChange={handleFileUpload} />
                        </MenuItem>
                        <MenuItem className='pop-menu-box roboto-font font-size-16 mouse-pointer' >
                          <FileUploadIcon className='mr-15 background-remove' />
                          <label htmlFor="folder-upload" className='background-remove mouse-pointer'>Upload Folder</label>
                          <input type="file" list='text' multiple={true} id="folder-upload" className='background-remove' style={{ display: 'none' }} directory="" webkitdirectory="" onChange={handleFolderUpload} />
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </p>
              <p className="ant-upload-text bg-remove roboto-font">Click or drag files to this area to upload</p>
              <p className="ant-upload-hint bg-remove roboto-font">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
              </p>
            </Dragger>
          </DialogContent>
          <DialogActions className='space-between'>
            <Button onClick={handleClose} className='roboto-font font-size-16' >Cancel</Button>
            <Button onClick={uploadSubmit} className='roboto-font font-size-16 mr-10' >Upload</Button>
          </DialogActions>
        </Dialog>
        <CustomizedTables />
      </Container>
    </Box >
  );
}
