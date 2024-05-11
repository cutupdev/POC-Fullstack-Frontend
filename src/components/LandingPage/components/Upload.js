import React from 'react';
import {useDropzone} from 'react-dropzone';
import { commonStyles } from '../../../style';
import { display } from '@mui/system';

export default function Basic(props) {
  const classes = commonStyles();
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path} className={classes.uploadNoSelect}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className={classes.uploadBox}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p className={classes.uploadLetter} >Drag and Drop</p>
      </div>
      <aside>
        {acceptedFiles.length ? <ul>{files}</ul> : <b className={classes.uploadNoSelect} >No selected files</b>}
      </aside>
    </section>
  );
}