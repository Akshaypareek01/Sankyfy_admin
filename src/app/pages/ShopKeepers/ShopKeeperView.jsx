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
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ShopKeeperView = () => {
  
    const {id} = useParams()
   
  
    const navigation = useNavigate();
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
  
    
      const {update,setUpdated} = useContext(UserContext);
    
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        aadharOrPAN: '',
        fssaiLicense: '',
        gstinNumber: '',
        businessPanCardNumber: '',
        companyName: '',
        status: false,
        images: [],
    });

    const [AdharorPanImage,setAdharorPanImage] = useState(null);
    const [GetCertificateImage,setGetCertificateImage] = useState(null);
    const [GstPanImage,setGstPanImage] = useState(null);

    const [editNewImages,setEditNewImages] =  useState(false);

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
         
      formData1.append('name', formData.name);
      formData1.append('email', formData.email);
      formData1.append('mobile', formData.mobile);
      formData1.append('password', formData.password);
      formData1.append('aadharOrPAN', formData.aadharOrPAN);
      formData1.append('fssaiLicense', formData.fssaiLicense);
      formData1.append('gstinNumber', formData.gstinNumber);
      formData1.append('businessPanCardNumber', formData.businessPanCardNumber);
      formData1.append('companyName', formData.companyName);
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
        const response = await axios.put(`${Base_url}api/shopkeeper/${id}`, formData1);
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
      const response = await axios.get(`${Base_url}api/shopkeepers/${id}`); // Replace with your actual API endpoint
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
              Edit Shop Owner
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
                  <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Name"
                    variant="outlined"
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                  />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    id="inputBox"
                    sx={{ width: "100%" }}
                    label="Email"
                    variant="outlined"
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                 
                    sx={{ width: "100%" }}
                    label="Mobile"
                    variant="outlined"
                    name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                  />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="Aadhar or PAN"
                name="aadharOrPAN"
                value={formData.aadharOrPAN}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="FSSAI License"
                name="fssaiLicense"
                value={formData.fssaiLicense}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
                </Box>

              

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="GSTIN Number"
                name="gstinNumber"
                value={formData.gstinNumber}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="Business PAN Card Number"
                name="businessPanCardNumber"
                value={formData.businessPanCardNumber}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
                </Box>

                <Box sx={{ marginTop: "20px" }}>
                <TextField
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
                </Box>


            
                <Box sx={{marginTop:"30px"}}>
                <div style={{ display: "flex",justifyContent:"space-between", alignItems: "center" }}>
                    <div >
                     <div>
                     <span>Adhar or Pan Image</span>
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
                     <span>Gst Certificate Image</span>
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
                     <span>Gst Pan Image</span>
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
     <span>Adhar or Pan Image</span>
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
     <span>Gst Certificate Image</span>
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
     <span>Gst Pan Image</span>
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
              </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
