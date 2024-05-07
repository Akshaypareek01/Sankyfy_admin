import React from 'react'
import { Box, Modal, Typography,TextField,Button,LinearProgress  } from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import CancelIcon from '@mui/icons-material/Cancel';

export const Call = () => {
const audioring = new Audio('./notification/callertune.mp3');
const callerring = new Audio('./notification/call-ring.mp3');
const busyring = new Audio('./notification/busy.mp3');

let isactive = false;
let vausername
let localStream
let peerConn
let isAudio = true
let isVideo = true
let cutingphone
  return (
    <Box >
       <Box sx={{height:"50vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
        
        
        <RecordVoiceOverIcon sx={{fontSize:"500px",marginLeft:"120px"}} />
    </Box> 
    <Box sx={{width:"30%",margin:"auto"}}>
    <LinearProgress color="success" />
    </Box>
    <Box sx={{marginTop:"200px"}}>
    <Box sx={{display:"flex",justifyContent:"space-around",alignItems:"center",margin:"auto",width:"50%",borderRadius:"20px",background:"#F1F1F1"}}>
      
      <PauseCircleFilledIcon sx={{fontSize:"50px",color:"crimson"}} />
      <PhoneDisabledIcon sx={{fontSize:"50px",color:"crimson"}} />
      <CancelIcon sx={{fontSize:"50px",color:"crimson"}} />
      </Box>
    </Box>
    
    </Box>
    
  )
}
