
import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ThemColor } from '../../Them/ThemColor'
import TuneIcon from '@mui/icons-material/Tune';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { GenralTabel } from '../../TabelComponents/GenralTable';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircle } from '@mui/icons-material';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import UserContext from '../../../Context/UserContext';
const column = [
  { name: "Name" },
  { name: "Email" },
  // {name: "Phone Number"},
  {name: "Status"},
  { name: "Created At" },
  { name: "Action" },
  { name: "Delete" },
];
export const Users = () => {
    const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [rows,setrows] = useState([])
  // const [update,setupdate] = useState([])
  const {update,setUpdated} = useContext(UserContext);
  const handelViewClick=(id)=>{
    navigate(`/user_view/${id}`);
  }

  const handelAddUser=()=>{
    navigate("/user_add/")
  }
  const updateShopStatus = async (shopId, status) => {
    try {
      const response = await axios.post(`${Base_url}api/user/update-status`, { shopId, status });
      console.log('Shop status updated:', response.data);
      setUpdated((prev)=>prev+1)
    } catch (error) {
      console.error('Error updating shop status:', error);
    }
  };
 
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${Base_url}api/user`);

      if (response.status === 200) {
        const fetchedCategories = response.data.data;
        setCategories(fetchedCategories);
        const FormatedData = fetchedCategories.map((el,index)=>({
          "Name":el.name,
          "Email":el.email,
          // "PhoneNumber":el.mobile,
          "status":el.status ? <Button variant='outlined' color='success' >Active</Button> : <Button variant='outlined' color='error' >In Active</Button> ,
          "CreatedAt":el.createdAt,
          "Action":el.status ? <Button variant='contained' color='error' onClick={()=>{updateShopStatus(el._id,false)}}>InActive</Button> : <Button onClick={()=>{updateShopStatus(el._id,true)}} variant='contained' color='success' >Active</Button>,
          "Edit":<EditIcon onClick={()=>handelViewClick(el._id)} style={{ color: `${ThemColor.icon}` }} />,
          "Delete":<DeleteIcon color="error" onClick={()=>deleteUser(el._id)} />
        }))
        setrows(FormatedData)
      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const deleteUser = async(ID) => {
    try{
      const res = await axios.delete(`${Base_url}api/user/${ID}`);
      console.log(res)
      setUpdated((prev)=>prev+1)
    }
    catch(err){
      console.log("Error",err)
    }
  }


  useEffect(()=>{
    fetchUser()
  },[update])
  return (
    <Box >

       <Card>
        <CardContent>
          <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            {/* <Box>
            <Typography variant='h6' style={{fontWeight:400,letterSpacing:2}}>Categories</Typography>
            </Box> */}

            <Box style={{width:"30%",hieght:"50px"}}>
            {/* <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={rows.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search..."
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      /> */}
            </Box>

            <Box>
              <Button variant='contained' startIcon={<AddCircle />} onClick={handelAddUser} style={{backgroundColor:`${ThemColor.buttons}`,marginRight:"15px"}}>Create new</Button>
              <Button variant='contained' style={{backgroundColor:`${ThemColor.buttons}`}}>
                <TuneIcon />
              </Button>
            </Box>
           
          </Box>
        </CardContent>
       </Card>

       <Box style={{marginTop:"-2px"}}>
       
          <GenralTabel column={column} rows={rows} />
        
       </Box>
   </Box>
  )
}
