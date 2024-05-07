import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const CategoriesCard = ({Data,fun,funEdit}) => {
  const navigate = useNavigate()
  const handelView =(id) =>{
    navigate(`view-categorie/${id}`)
 }

  return (
    <Box sx={{border:"0.5px dashed grey",borderRadius:"5px",padding:"20px",minHeight:"150px"}}>
        
        <Box>
            <Box>
                <Typography sx={{fontSize:"25px"}}>{Data.partName.toUpperCase()}</Typography>
            </Box>

            <Box>
                <Typography sx={{fontSize:"18px"}}>Price : {Data.price}</Typography>
            </Box>

            <Box>
                <Typography sx={{fontSize:"14px"}}>Description : {Data.description}</Typography>
            </Box>
        </Box>

    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"15px"}}>
    
     
      <Button variant='contained' size='small' expand sx={{backgroundColor:"black",marginRight:"20px"}} onClick={()=>funEdit()}>Edit</Button>
      <Button variant='contained' size='small' expand sx={{backgroundColor:"crimson"}}  onClick={()=>fun(Data._id)}>Delete</Button>
    </Box>

</Box>
  )
}
