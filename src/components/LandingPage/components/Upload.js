import React from 'react';
import {useDropzone} from 'react-dropzone';
import { display } from '@mui/system';

export default function Basic(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path} className='upload-no-select'>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className='upload-box'>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p className='upload-letter' >Drag and Drop</p>
      </div>
      <aside>
        {acceptedFiles.length ? <ul>{files}</ul> : <b className='upload-no-select' >No selected files</b>}
      </aside>
    </section>
  );
}