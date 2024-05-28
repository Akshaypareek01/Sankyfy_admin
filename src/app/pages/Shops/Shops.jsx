
import { Box, Button, Card, CardContent, CardHeader, Modal, Typography } from '@mui/material'
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
import CloseIcon from '@mui/icons-material/Close';

const column = [
  { name: "Shop Owner" },
  { name: "Shop" },
  { name: "Category" },
  { name: "Email" },
  { name: "Mobile Number" },
  { name: "Alternative Number" },
  { name: "City" },
  { name: "State" },
  // {name: "Phone Number"},
  {name: "Status"},
  { name: "Created At" },
  {name:"View"},
  {name:"Action"},
  { name: "Edit" },
  { name: "Delete" },
];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'500px',
  height:'500px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:"20px",
  p: 4,
};

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'60vw',
  height:'60vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:"20px",
  p: 4,
};
export const Shops = () => {
    const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [rows,setrows] = useState([])
  const [ActiveImages,setActiveImages] = useState([]);
  // const [update,setupdate] = useState([])
  const {update,setUpdated} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [cords,setCords] = useState({lat:"",lng:""})
  const [open2, setOpen2] = useState(false);
  const handleOpen = (lat,lng) => {
    setCords({lat:lat,lng:lng})
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {

    setOpen2(true)
  };
  const handleClose2 = () => {
    setOpen2(false);
    setActiveImages([])
  };
  const handelViewClick=(id)=>{
    navigate(`/shop_view/${id}`);
  }

  const handelViewImages=(data)=>{
    setActiveImages(data)
    handleOpen2();
  }

  const handelAddUser=()=>{
    navigate("/shop_add/")
  }

  const updateShopStatus = async (shopId, status) => {
    try {
      const response = await axios.post(`${Base_url}api/shop/update-status`, { shopId, status });
      console.log('Shop status updated:', response.data);
      setUpdated((prev)=>prev+1)
    } catch (error) {
      console.error('Error updating shop status:', error);
    }
  };
 
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${Base_url}api/shop`);

      if (response.status === 200) {
        const fetchedCategories = response.data.data;
        setCategories(fetchedCategories);
        const FormatedData = fetchedCategories.map((el,index)=>({
          "Shop Keeper":el.shopkeeperId.name,
          "Shop Name":<Button onClick={()=>handleOpen(el.lat,el.lng)}   variant='text'>{el.shopName}</Button>,
          "shopCategory":el.shopCategory,
          "Email":el.emailId,
          "PhoneNumber":el.mobileNumber,
          "AltMobile":el.alternativeNumber,
          "City":el.city,
          "State":el.state,
          "status":el.status ? <Button variant='outlined' color='success' >Active</Button> : <Button variant='outlined' color='error' >In Active</Button> ,
          "CreatedAt":el.createdAt,
          "View":<RemoveRedEyeIcon onClick={()=>handelViewImages(el.images)} style={{ color: `${ThemColor.icon}` }}/>,
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
      const res = await axios.delete(`${Base_url}api/shop/${ID}`);
      console.log(res)
      setUpdated((prev)=>prev+1)
    }
    catch(err){
      console.log("Error",err)
    }
  }

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map2'), {
      center: { lat:cords.lat, lng:cords.lng },
      zoom: 10,
    });

    const markerIcon = {
      url: 'https://vectorified.com/images/google-maps-marker-icon-38.png', // Replace with your custom marker image URL
      scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
    };

    new window.google.maps.Marker({
      position: { lat: cords.lat, lng: cords.lng },
      map: map,
      icon: markerIcon,
    });
  };

  useEffect(() => {
    if (open) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBiT-IQhU-7xJVBPuo7t7v5y38anGc6JCk`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [open]);

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
       <Box>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{display:"flex",justifyContent:"right",alignItems:"center",marginTop:"-20px"}}>
          <CloseIcon onClick={handleClose} sx={{fontSize:"24px"}}/>
          </Box>
          <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10px"}}>
          <div id="map2" style={{width:"100%",height:"400px"}}></div>
          </Box>
        
      
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <Box sx={{display:"flex",justifyContent:"right",alignItems:"center",marginTop:"-20px"}}>
          <CloseIcon onClick={handleClose2} sx={{fontSize:"24px"}}/>
          </Box>
          <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"10px",flexWrap:"wrap",marginTop:"50px"}}>
                {
                  ActiveImages.length > 0 ? ActiveImages.map((el,index)=>{
                    return <img
                    key={index}
                    src={`${Base_url}api/${el.path}`}
                    alt="Metronic"
                    style={{height:"300px",width:"300px"}}
                  />
                  })
                  :
                  <span style={{fontWeight:"bold",fontSize:"24px"}}>No Images Found For This Shop</span>
                }
          </Box>
        
      
        </Box>
      </Modal>
       </Box>
   </Box>
  )
}
