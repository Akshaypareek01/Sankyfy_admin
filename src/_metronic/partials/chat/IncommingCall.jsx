import React from 'react'
import { Box, Modal, Typography,TextField,Button,LinearProgress  } from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PhoneIcon from '@mui/icons-material/Phone';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import CancelIcon from '@mui/icons-material/Cancel';

export const IncommingCall = ({handelReciveCall}) => {
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
      <PhoneIcon sx={{fontSize:"50px",color:"crimson"}} onClick={handelReciveCall} />
      <CancelIcon sx={{fontSize:"50px",color:"crimson"}} />
      </Box>
    </Box>
    
    </Box>
    
  )
}
