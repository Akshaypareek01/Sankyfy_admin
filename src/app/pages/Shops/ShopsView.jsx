import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
  stepperClasses,
  IconButton,
  Modal
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers/DateField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { createTheme } from "@mui/material/styles";

import axios from "axios";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ThemeProvider } from "@mui/material/styles";
import { Base_url } from "../../Config/BaseUrl";
import { ThemColor } from "../../Them/ThemColor";
import CircularProgress from "@mui/material/CircularProgress";
import DropzoneComponent from "../../../Components/DropZoneComponent";
import AddressAutoComplete from "../../../Components/AddressAutoComplete";
import CountryRegionSelector from "../../../Components/CountryDropDown";
import UserContext from "../../../Context/UserContext";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const orangeTheme = createTheme({
  palette: {
    primary: {
      main: "#fff", // Set the main color to your desired shade of orange
    },
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'100vw',
  height:'100vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ShopsView = () => {
  
    const {id} = useParams()
   
  
    const navigation = useNavigate();
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
  
    
      const {update,setUpdated} = useContext(UserContext);
    
      const [formData, setFormData] = useState({
        shopkeeperId: '',
        shopName: '',
        mobileNumber: '',
        alternativeNumber: '',
        emailId: '',
        shopCategory: '',
        pincode: '',
        state: '',
        city: '',
        address: '',
        howYouHearAboutUs: '',
        lat: '',
        lng: '',
        images: [],
      });

    const [AdharorPanImage,setAdharorPanImage] = useState(null);
    const [GetCertificateImage,setGetCertificateImage] = useState(null);
    const [GstPanImage,setGstPanImage] = useState(null);

    const [editNewImages,setEditNewImages] =  useState(false);
    const [address, setAddress] = useState(null);
    const [location, setLocation] =  useState(null);
    const [addressData,setAddressData] = useState(true);
    const [shopKeepeersData,setShopKeepersData] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAddressHide();
  };

    const handleMapClick = (event) => {
      console.log("Event ==>",event)
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setLocation({ lat, lng });
      getAddress(lat, lng);
      // handleClose();
    };
  
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat:20.00000000, lng:77.00000000 },
        zoom: 5,
      });
  
      map.addListener('click', handleMapClick);
    };
  
    function parseGoogleMapsApiResponse(response) {
      const addressComponents = response.results[0].address_components;
      let state = '';
      let pincode = '';
      let address =  response.results[0].formatted_address;
      let city = '';
      let lat = response.results[0].geometry.location.lat;
      let lng = response.results[0].geometry.location.lng;
  
      addressComponents.forEach(component => {
          if (component.types.includes('administrative_area_level_1')) {
              state = component.long_name;
          }
          if (component.types.includes('postal_code')) {
              pincode = component.long_name;
          }
          if (component.types.includes('locality')) {
            city = component.long_name;
        }
        
      });
  
      return {
          state,
          city,
          pincode,
          address,
          lat,
          lng
      };
  }
  
    const getAddress = (lat, lng) => {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBiT-IQhU-7xJVBPuo7t7v5y38anGc6JCk`;
      
      fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            console.log("Adress for geocode api ==>",data.results[0])
            setAddress(data.results[0].formatted_address);
            const {city,state,pincode,address,lat,lng} = parseGoogleMapsApiResponse(data);
            
            console.log("Address ====>",city,state,pincode,address,lat,lng);
            setFormData((prevFormData) => ({
              ...prevFormData,
              city: city,
              state: state,
              pincode: pincode,
              address: address,
              lat: lat,
              lng: lng,
            }));
            setAddressVisibel()
          } else {
            setAddress('Address not found');
          }
        })
        .catch(error => {
          console.error('Error fetching address:', error);
          setAddress('Error fetching address');
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

    const handelEditNewIamges = () =>{
      setEditNewImages(!editNewImages)
    }
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      console.log("Data==>",formData)
      // if(formData.password !== formData.confirmPassword){
      //   alert("Password mismatch");
      //   return 
      // }
      e.preventDefault();
      const formData1 = new FormData();
         
      formData1.append('shopkeeperId', formData.shopkeeperId);
    formData1.append('shopName', formData.shopName);
    formData1.append('mobileNumber', formData.mobileNumber);
    formData1.append('alternativeNumber', formData.alternativeNumber);
    formData1.append('emailId', formData.emailId);
    formData1.append('shopCategory', formData.shopCategory);
    formData1.append('pincode', formData.pincode);
    formData1.append('state', formData.state);
    formData1.append('city', formData.city);
    formData1.append('address', formData.address);
    formData1.append('howYouHearAboutUs', formData.howYouHearAboutUs);
    formData1.append('lat', formData.lat);
    formData1.append('lng', formData.lng);
      if(AdharorPanImage){
        formData1.append('images', AdharorPanImage);
      }
      if(GetCertificateImage){
        formData1.append('images', GetCertificateImage);
      }
      if(GstPanImage){
        formData1.append('images', GstPanImage);
      }
  
      try {
        const response = await axios.put(`${Base_url}api/shop/${id}`, formData1);
        console.log("Data==>",response.data);
        setUpdated((prev)=>prev+1);
        handelGoBack()
      } catch (error) {
        console.log("Error==>",error)
      }
    };
  
    const handleFileChange3 = (e) => {
      setAdharorPanImage(e.target.files[0]);
    };
  
    const handleFileChange4 = (e) => {
      setGetCertificateImage(e.target.files[0]);
    };
  
    const handleFileChange5 = (e) => {
      setGstPanImage(e.target.files[0]);
    };
   
  
    const handelGoBack = () => {
      window.history.back();
    };


  const fetchClientById = async (id) => {
    try {
      const response = await axios.get(`${Base_url}api/shop/${id}`); // Replace with your actual API endpoint
      // setUsers(response.data.data.users);
      const Data= response.data
      console.log("User Data edit ==>",Data)
      if(Data){
        // const formattedDate = dayjs(Data.dob);
        // console.log("Formated Data ===>", formattedDate)
        setFormData(Data.data)
      

         

    // Update the state with the formatted date
   
    
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const fetchShopOwners = async (id) => {
    try {
      const response = await axios.get(`${Base_url}api/shopkeepers/`); // Replace with your actual API endpoint
      // setUsers(response.data.data.users);
      const Data= response.data
      console.log("User Data edit ==>",Data)
      if(Data){
        // const formattedDate = dayjs(Data.dob);
        // console.log("Formated Data ===>", formattedDate)
        setShopKeepersData(Data.data)
      

         

    // Update the state with the formatted date
   
    
      }
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const setAddressVisibel = ()=>{
    setAddressData(true)
  }

  const setAddressHide = ()=>{
    setAddressData(false)
  }

  const handelConfirmLocation = ()=>{
    setOpen(false)
  }

  useEffect(() => {
    fetchShopOwners()
  }, []);

  useEffect(() => {
    fetchClientById(id)
  }, []);


  return (
   <div style={{ display: "flex", backgroundColor: "#fff" }}>
      <div
        style={{
          flex: 1,
          padding: "20px",
          // backgroundColor: "#FFFBF5",
          margin: `${!isMobile ? "30px" : "0px"}`,
          borderRadius: `${!isMobile ? "50px" : "0px"}`,
          // boxShadow:
          //   "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      >
        <div style={{ height: "100%" }}>

          <Box style={{ display: "flex", alignItems: "center" }}>
            <ArrowBackIcon
              onClick={handelGoBack}
              style={{ marginRight: "20px", color: `${ThemColor.buttons}` }}
            />
            <Typography
              variant="h5"
              style={{
                letterSpacing: 1,
                fontSize: 14,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Edit Shop Details
            </Typography>
          </Box>
       
         
          <div
            style={{
              marginTop: 25,
              height: "600px",
              overflowY: "auto",
              paddingTop: 5,

              // Hide the scrollbar
            }}
          >
            <Box sx={{width:"100%"}}>
            


              <Box
                sx={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "left",
                  alignContent: "center",
                  flexDirection: "column",
                }}
              >

<Box>
<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Shop Owner</InputLabel>
        <Select
          fullWidth
          label="From"
          name="shopkeeperId"
          value={formData.shopkeeperId}
          onChange={handleChange}
        >
          {shopKeepeersData.map((el) => (
            <MenuItem key={el._id} value={el._id}>
              {el.name} 
            </MenuItem>
          ))}
        </Select>
        </FormControl>
                </Box>

                 <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Shop Name"
                    variant="outlined"
                    name="shopName" 
                    value={formData.shopName} 
                    onChange={handleChange} 
                  />
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Mobile Number"
                    variant="outlined"
                    name="mobileNumber" 
                    value={formData.mobileNumber} 
                    onChange={handleChange} 
                  />
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Alternative Number"
                    variant="outlined"
                    name="alternativeNumber" 
                    value={formData.alternativeNumber} 
                    onChange={handleChange} 
                  />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Email Id"
                    variant="outlined"
                    name="emailId" 
                    value={formData.emailId} 
                    onChange={handleChange} 
                  />
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                 
                    sx={{ width: "100%" }}
                    label="Shop Category"
                    variant="outlined"
                    name="shopCategory"
                value={formData.shopCategory}
                onChange={handleChange}
                  />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="How You Hear AboutUs"
                name="howYouHearAboutUs"
                value={formData.howYouHearAboutUs}
                onChange={handleChange}
                required
                fullWidth
               
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                  <span style={{fontSize:"24px"}}>Shop Address</span>
                </Box>


                <Box sx={{display:"flex",justifyContent:"space-around",alignItems:"center",marginTop: "20px"}}>
                  <Button onClick={handleOpen} variant="contained">Select From Map</Button>

                  <Button onClick={setAddressVisibel} variant="contained">Fill Manually</Button>
                </Box>

                {
                  addressData && <>
                      <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="lat"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                required
                fullWidth
                
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="lng"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
                required
                fullWidth
               
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                fullWidth
               
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="Pincode"
                name="pincode"
               
                value={formData.pincode}
                onChange={handleChange}
                required
                fullWidth
               
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                fullWidth
             
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
               
            />
                </Box>
                  
                  </>
                }

             

              

               

              

                


            
<Box sx={{marginTop:"30px"}}>
                <div style={{ display: "flex",justifyContent:"space-between", alignItems: "center" }}>
                    <div >
                     <div>
                     <span>Shop Image 1</span>
                      </div> 
                      {
            formData.images[0] &&  <img
            src={`${Base_url}api/${formData.images[0].path}`}
            alt="Metronic"
            style={{height:"80px",width:"80px"}}
          />
          }
                      
                 
        
                    </div>

                    <div >
                    <div>
                     <span>Shop Image 2</span>
                      </div> 
                      {
            formData.images[1] &&  <img
            src={`${Base_url}api/${formData.images[1].path}`}
            alt="Metronic"
            style={{height:"80px",width:"80px"}}
          />
          }
                    
                    
                    </div>

                    <div >
                    <div>
                     <span>Shop Image 3</span>
                      </div> 
                      {
            formData.images[2] &&  <img
            src={`${Base_url}api/${formData.images[2].path}`}
            alt="Metronic"
            style={{height:"80px",width:"80px"}}
          />
          }
                    
                  
                    </div>
                  </div>
                </Box>
                 
                 <Box sx={{marginTop:"30px"}}>
                  <Button variant="contained" onClick={handelEditNewIamges}>Edit Images</Button>
                 </Box>
              
                 {
editNewImages &&
<Box sx={{marginTop:"60px"}}>
  <div>
    <span style={{fontSize:"24px"}}>Uplode New Images</span>
  </div>
<div style={{ display: "flex",justifyContent:"space-between", alignItems: "center",marginTop:"30px" }}>
    <div >
     <div>
     <span>Shop Image 1</span>
      </div> 
      {
        AdharorPanImage && <div style={{display: "flex", alignItems: "center",justifyContent:"center" }}>
        <div
          style={{
            width: "150px",
            height: "150px",
            border: "1px solid #ddd",
            background: `url(${URL.createObjectURL(AdharorPanImage)}) center/cover no-repeat`,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
         
        >
        
        </div>
        </div>
      }
      
      
      <input  type='file'    onChange={handleFileChange3} id="noborder" />

    </div>

    <div >
    <div>
     <span>Shop Image 2</span>
      </div> 
      {
        GetCertificateImage && <div style={{display: "flex", alignItems: "center",justifyContent:"center" }}>
        <div
          style={{
            width: "150px",
            height: "150px",
            border: "1px solid #ddd",
            background: `url(${URL.createObjectURL(GetCertificateImage)}) center/cover no-repeat`,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          
        >
         
        </div>
        </div>
      }
    
      <input  type='file'    onChange={handleFileChange4} id="noborder" />
    </div>

    <div >
    <div>
     <span>Shop Image 3</span>
      </div> 
      {
        GstPanImage && <div style={{display: "flex", alignItems: "center",justifyContent:"center" }}>
        <div
          style={{
            width: "150px",
            height: "150px",
            border: "1px solid #ddd",
            background: `url(${URL.createObjectURL(GstPanImage)}) center/cover no-repeat`,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          
        >
         
        </div>
        </div>
      }
    
      <input  type='file'    onChange={handleFileChange5} id="noborder" />
    </div>
  </div>
</Box>
                 }
               


                
              </Box>




              <Box sx={{ marginTop: "40px" }}>
    <Button onClick={handleSubmit}  fullWidth variant="contained">
   Submit
  </Button>
  
 
               
              </Box>
              <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div id="map" style={{width:"100%",height:"80vh"}}></div>

        <div>
          {
            location &&  <span>Location : {location.lat},{location.lng}</span>
          }
          
          <p>Address: {address}</p>
        </div>
        
        <Button onClick={handelConfirmLocation} variant="contained">Confirm Location</Button>
        <Button sx={{marginLeft:"30px"}} onClick={handleClose} variant="contained">Close</Button>
        </Box>
      </Modal>
              </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
