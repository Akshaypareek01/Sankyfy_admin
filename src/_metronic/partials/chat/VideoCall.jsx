import React from 'react'
import { Box, Modal, Typography,TextField,Button,LinearProgress  } from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import CancelIcon from '@mui/icons-material/Cancel';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

export const VideoCall = () => {
  return (
    <Box >
    <Box sx={{height:"50vh",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"20px"}}>

      <Box sx={{height:"500px",width:"500px",border:"1px solid red"}}>
      <RecordVoiceOverIcon sx={{fontSize:"500px"}} />
      </Box>
      <Box sx={{height:"500px",width:"500px",border:"1px solid red"}}>
      <RecordVoiceOverIcon sx={{fontSize:"500px"}} />
      </Box>
    
     
     
      </Box> 
        <Box sx={{width:"30%",margin:"auto"}}>
         <LinearProgress color="success" />
          </Box>
 <Box sx={{marginTop:"200px"}}>
 <Box sx={{display:"flex",justifyContent:"space-around",alignItems:"center",margin:"auto",width:"50%",borderRadius:"20px",background:"#F1F1F1"}}>
   
   <PauseCircleFilledIcon sx={{fontSize:"50px",color:"crimson"}} />
   <VideocamOffIcon sx={{fontSize:"50px",color:"crimson"}} />
   <CancelIcon sx={{fontSize:"50px",color:"crimson"}} />
   </Box>
 </Box>
 
 </Box>
  )
}
