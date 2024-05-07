import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import DescriptionIcon from '@mui/icons-material/Description';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: 'grey',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .2s ease-in-out',
  height:"200px",
  justifyContent:"center"
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function DropzoneComponent(props) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: '.pdf, .doc, .docx' // Specify document file types here
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map(file => (
    <div key={file.name}>
      {file.type === 'application/pdf' ? (
        <embed src={file.preview} type="application/pdf" width="200" height="200" />
      ) : (
        <div>{file.name}</div>
      )}
    </div>
  ));

  // clean up
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section>
         <div style={{display:"flex",justifyContent:"left",alignItems:"center"}}>
        <aside>
          {thumbs}
        </aside>
      </div>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <DescriptionIcon style={{color:"blue",fontSize:"27px"}}/>
          <span style={{fontSize:"18px",marginLeft:"10px"}}>Drag and drop your documents here.</span>
        </div>
      </div>
     
    </section>
  )
}

export default DropzoneComponent;
