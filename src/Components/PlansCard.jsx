import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export const PlansCard = () => {
  return (
    <Card sx={{width:"280px",height:"476px",borderRadius:"5px"}}>
        <CardContent sx={{padding:0,margin:0}}>
        <Box >
       
       <Box sx={{height:"30%",background:"black",padding:"20px"}}>
           <Box>
            <Typography sx={{color:"#fff",fontSize:"17px"}}>Basic Plan</Typography>
           </Box>

           <Box sx={{textAlign:"left",marginTop:"20px"}}>
            <Typography sx={{color:"#fff",fontSize:"25px"}}>
            ₹ 45,000 / <span style={{fontSize:"16px",color:"grey"}}>month</span> 
            </Typography>
           </Box>
       </Box>

<Box sx={{padding:"20px"}}>
    <Box>
        <Typography sx={{fontSize:"18px"}} >Features</Typography>
        <Typography sx={{fontSize:"14px",color:"grey"}}>Everything In Your Free Plan Plus</Typography>
    </Box>
<Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
        <CheckCircleIcon sx={{fontSize:"18px"}}/>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"14px"}}>Access To Basic Features</Typography>
      </Box>
</Box>

<Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
        <CheckCircleIcon sx={{fontSize:"18px"}}/>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"14px"}}>Access To Basic Features</Typography>
      </Box>
</Box>


<Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
        <CheckCircleIcon sx={{fontSize:"18px"}}/>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"14px"}}>Access To Basic Features</Typography>
      </Box>
</Box>


<Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
        <CheckCircleIcon sx={{fontSize:"18px"}}/>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"14px"}}>Access To Basic Features</Typography>
      </Box>
</Box>

<Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
        <CheckCircleIcon sx={{fontSize:"18px"}}/>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"14px"}}>Access To Basic Features</Typography>
      </Box>
</Box>

    

    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"25px"}}>
      <Button variant='contained' size='large' expand sx={{backgroundColor:"#FF8604"}}>Get Started</Button>
    </Box>
</Box>
  

</Box>
        </CardContent>
    </Card>
    
  )
}
