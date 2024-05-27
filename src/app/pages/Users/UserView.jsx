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

export const UserView = () => {
  const navigation = useNavigate();
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const {id} = useParams()
    const {update,setUpdated} = useContext(UserContext);
  
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword:''
    });
  
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
    
      e.preventDefault();
      try {
        const response = await axios.put(`${Base_url}api/user/${id}`, formData);
        console.log("Data==>",response.data);
        setUpdated((prev)=>prev+1);
        handelGoBack()
      } catch (error) {
        console.log("Error==>",error)
      }
    };
  
   
  
    const handelGoBack = () => {
      window.history.back();
    };


  const fetchClientById = async (id) => {
    try {
      const response = await axios.get(`${Base_url}api/user/${id}`); // Replace with your actual API endpoint
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
              Edit user
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
                  type="password"
                    sx={{ width: "100%" }}
                    label="Password"
                    variant="outlined"
                    name="password" 
                    value={formData.password} 
                  onChange={handleChange} 
                  />
                </Box>

               

                
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
