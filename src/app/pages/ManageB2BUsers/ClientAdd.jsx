import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
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
export const ClientAdd = () => {
  const navigation = useNavigate();
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const [type, setType] = useState('');
  const [Teacherloading, setTeacherLoading] = useState(false);
  const [personName, setPersonName] = React.useState([]);
  const [visibleSection, setVisibleSection] = useState(1);
  const [showPass, setPass] = useState(false);

  const [TrainerSelected, setTrainerSelected] = useState(false);

  const [inputFields, setInputFields] = useState([
    { id: 1, label: "College", value: "" },
    { id: 2, label: "Courses", value: "" },
    // { id: 3, label: "Duration", value: "" },
    { id: 3, label: "Passing Year", value: "" },
    // { id: 5, label: "Additional therapy or courses", value: "" },
  ]);

  const [inputFieldsAc, setInputFieldsAc] = useState([
    { id: 1, label: "Course", value: "" },
    { id: 2, label: "School Name", value: "" },
    { id: 3, label: "Passing Year", value: "" },
  ]);
  const [setCounter, setSetCounter] = useState(1);
  const [setCounterAc, setSetCounterAc] = useState(1);
  const [loaction,setLocation] = useState({lat:"",lng:""})
  const [formDataTrainer, setFormDatasetFormData] = useState({
    type: "",
    business_Name: "",
    business_Website: "",
    business_Email: "",
    business_Phone: "",
    // alternative_contacts:"",
    name: "",
    mobile: "",
    email: "",
    // dob: null,

    alter_name: "",
    alter_mobile: "",
    alter_email: "",
    // alter_dob: null,

   
    pincode: "",
    address_type: "",
    city: "",
    country:"",
    address: "",
    description: "",
    lat:"",
    lng:""
  });

  const [userimageFile2, setUserImageFile2] = useState(null);
  const [TeacherimageFile1, setTeacherImageFile1] = useState(null);
  const [TeacherimageFile2, setTeacherImageFile2] = useState(null);
  const [isTCChecked, setTCChecked] = useState(false);

  const [value, setValue] = React.useState(0);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  
  const [addressOptions, setAddressOptions] = useState([]);

 
  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    // You can further process or store the selected address here
    console.log('Selected Address:', selectedAddress);
  };

  const handleTypeChange = (event) => {
    console.log("type",event.target.value)
    setType(event.target.value);
  };

  const handletermandconditionsCheck = () => {
    setTCChecked(!isTCChecked);
  };

  const handleChangetabs = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTrainer3 = (event) => {
    const checkedName = event.target.value;

    setFormDatasetFormData((prevFormData) => {
      const updatedExpertise = prevFormData.Expertise.includes(checkedName)
        ? prevFormData.Expertise.filter((name) => name !== checkedName)
        : [...prevFormData.Expertise, checkedName];

      return {
        ...prevFormData,
        Expertise: updatedExpertise,
      };
    });
  };

  const handleChangeTrainer = (e) => {
    const { name, value } = e.target;
    setFormDatasetFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange2Trainer = (event, id) => {
    const {
      target: { value },
    } = event;
    const updatedFields = inputFields.map((field) =>
      field.id === id ? { ...field, value: value } : field
    );
    setInputFields(updatedFields);
  };

  const handleDateChangeTrainer = (date) => {
    setFormDatasetFormData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };
  const handleAlterDateChangeTrainer = (date) => {
    setFormDatasetFormData((prevData) => ({
      ...prevData,
      alter_dob: date,
    }));
  };
  const handleChange3 = (e, id) => {
    const updatedFields = inputFields.map((field) =>
      field.id === id ? { ...field, value: e.target.value } : field
    );
    setInputFields(updatedFields);
  };

  const handleChange3Ac = (e, id) => {
    const updatedFields = inputFieldsAc.map((field) =>
      field.id === id ? { ...field, value: e.target.value } : field
    );
    setInputFieldsAc(updatedFields);
  };

  const handleAddFields = () => {
    setInputFields((prevFields) => [
      ...prevFields,
      { id: prevFields.length + 1, label: "College", value: "" },
      { id: prevFields.length + 2, label: "Courses", value: [] },
      // { id: prevFields.length + 3, label: "Duration", value: "" },
      { id: prevFields.length + 3, label: "Passing Year", value: "" },
    ]);
    if ((inputFields.length + 1) % 3 === 0) {
      setSetCounter((prevCounter) => prevCounter + 1);
    }
  };

  const handleRemoveFields = () => {
    setInputFields((prevFields) => prevFields.slice(0, prevFields.length - 3));
    if ((inputFields.length - 1) % 3 === 0) {
      setSetCounter((prevCounter) => prevCounter - 1);
    }
  };

  const handleAddFieldsAc = () => {
    setInputFieldsAc((prevFields) => [
      ...prevFields,
      { id: prevFields.length + 1, label: "Course", value: "" },
      { id: prevFields.length + 2, label: "School Name", value: "" },
      { id: prevFields.length + 3, label: "Passing Year", value: "" },
    ]);
    if ((inputFieldsAc.length + 1) % 3 === 0) {
      setSetCounterAc((prevCounter) => prevCounter + 1);
    }
  };

  const handleRemoveFieldsAc = () => {
    setInputFieldsAc((prevFields) =>
      prevFields.slice(0, prevFields.length - 3)
    );
    if ((inputFieldsAc.length - 1) % 3 === 0) {
      setSetCounterAc((prevCounter) => prevCounter - 1);
    }
  };
  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    // Assuming each section is 80% of the viewport height
    const sectionHeight = window.innerHeight * 0.1;

    console.log(
      "Scroll position",
      Math.floor(scrollPosition / sectionHeight) + 1
    );
    // Determine the section currently in view
    const currentSection = Math.floor(scrollPosition / sectionHeight) + 1;

    setVisibleSection(currentSection);
  };
  const updateCoordinates = (lat, lng) => {
    console.log("Updating Cordianets ===>", lat, lng);
    setFormDatasetFormData(prevData => ({
      ...prevData,
      lat,
      lng
    }));
  }
  const handelTrainerContinue = () => {
 
    setTeacherLoading(true);
    
    console.log("FormData ====>",formDataTrainer)
    axios
      .post(`${Base_url}api/client`, formDataTrainer)
      .then((response) => {
        setTeacherLoading(false);
        console.log("Teacher created successfully:", response.data);
      
        alert("Trainer Account created successfully");
        handelGoBack();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setTeacherLoading(false);
        alert("Refresh and try again");
      });
  };

  const Expertise = [
    "Hatha",
    "Vinyasa Flow",
    "Iyenger Yoga",
    "Power Yoga",
    "Ashtanga",
    "YIN",
    "Restorative",
    "Meditation",
    "Pranayama (Breath Work)",
    "Kids Yoga",
    "Pre & Postnatal",
    "Mudra",
    "Laughter Yoga",
    "Sound Healing",
  ];
  const course = ["B.S.C", "M.S.C", "P.H.D"];

  const handleFileChange2 = (e) => {
    setUserImageFile2(e.target.files[0]);
  };
  const handleFileChange3 = (e) => {
    setTeacherImageFile1(e.target.files[0]);
  };

  const handleFileChange4 = (e) => {
    setTeacherImageFile2(e.target.files[0]);
  };

  const handelNext = (value) => {
    setValue(value);
  };
  const handelPrevious = (value) => {
    setValue(value);
  };

  const handelGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    console.log("Address Data  ==>", address);
    if(address !== ""){
      // address.address_components.forEach(component => {
      //   const inputField = document.getElementById(component.types[0]); // Assuming the first type is used as input ID
      //   if (inputField) {
      //       inputField.value = component.long_name;
      //   }})
      const relevantTypes = ["street_number", "route", "neighborhood","sublocality_level_1","sublocality_level_2",];
      const relevantComponents = address.address_components.filter(component =>
        component.types.some(type => relevantTypes.includes(type))
      );
      
      // Construct the address string
      const address1 = relevantComponents.map(component => component.long_name).join(", ");
      // const address1 = address.address_components.map(component => component.long_name).join(", ");
    
      // Updating the form state with the fetched address
      setFormDatasetFormData(prevState => ({
        ...prevState,
        address: address.name + "," + address1,
        pincode: address.address_components.find(component => component.types.includes('postal_code'))?.long_name || '',
        city: address.address_components.find(component => component.types.includes('locality'))?.long_name || '',
        country: address.address_components.find(component => component.types.includes('country'))?.long_name || ''
      }));
    }
    
  }, [address])
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
              Add new client
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
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <ThemeProvider theme={orangeTheme}>
                  <Tabs
                    value={value}
                    onChange={handleChangetabs}
                    aria-label="basic tabs example"
                    textColor="primary"
                    indicatorColor="primary"
                  >
                    <Tab
                      label="Client Details"
                      {...a11yProps(0)}
                      style={{
                        backgroundColor: `${value === 0 ? "#EE731B" : "#fff"}`,
                        marginRight: "10px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                    <Tab
                      label="Address"
                      {...a11yProps(1)}
                      style={{
                        backgroundColor: `${value === 1 ? "#EE731B" : "#fff"}`,
                        marginRight: "10px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                    <Tab
                      label="Documents"
                      {...a11yProps(2)}
                      style={{
                        backgroundColor: `${value === 2 ? "#EE731B" : "#fff"}`,
                        marginRight: "10px",
                        borderRadius: "10px",
                        marginBottom: "10px",
                      }}
                    />
                  </Tabs>
                </ThemeProvider>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <div>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-multiple-checkbox-label">
                          Client Type
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          name="type"
                          value={formDataTrainer.type}
                          onChange={handleChangeTrainer}
                          sx={{ overflowX: "hidden", width: "100%" }}
                        >

                          <MenuItem value={"Individual"}>Individual</MenuItem>
                          <MenuItem value={"Business"}>Business</MenuItem>


                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  {
                    formDataTrainer.type === "Business" && <>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-basic"
                          label="Business Name"
                          variant="outlined"
                          style={{ width: "100%" }}
                          name="business_Name"
                          value={formDataTrainer.business_Name}
                          onChange={handleChangeTrainer}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-basic"
                          label="Business Website"
                          variant="outlined"
                          style={{ width: "100%" }}
                          name="business_Website"
                          value={formDataTrainer.business_Website}
                          onChange={handleChangeTrainer}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-basic"
                          label="Business Email"
                          variant="outlined"
                          style={{ width: "100%" }}
                          name="business_Email"
                          value={formDataTrainer.business_Email}
                          onChange={handleChangeTrainer}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          id="outlined-basic"
                          label="Business Phone"
                          variant="outlined"
                          style={{ width: "100%" }}
                          name="business_Phone"
                          value={formDataTrainer.business_Phone}
                          onChange={handleChangeTrainer}
                        />
                      </Grid>

                    </>
                  }




                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="name"
                      value={formDataTrainer.name}
                      onChange={handleChangeTrainer}
                    />
                  </Grid>


                  {/* <Grid item xs={12} sm={6} md={6}>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                          placeholder="DOB"
                          style={{ width: "100%" }}
                          value={formDataTrainer.dob}
                          onChange={handleDateChangeTrainer}
                        />
                      </LocalizationProvider>
                    </div>
                  </Grid> */}

                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Mobile"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="mobile"
                      value={formDataTrainer.mobile}
                      onChange={handleChangeTrainer}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="email"
                      value={formDataTrainer.email}
                      onChange={handleChangeTrainer}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <div style={{ padding: "10px 0px 10px 0px" }}>
                      <Typography variant="h5">Alternative Contacts ( optional )</Typography>
                    </div>

                  </Grid>



                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="alter_name"
                      value={formDataTrainer.alter_name}
                      onChange={handleChangeTrainer}
                    />
                  </Grid>


                  {/* <Grid item xs={12} sm={6} md={6}>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                          placeholder="DOB"
                          style={{ width: "100%" }}
                          value={formDataTrainer.alter_dob}
                          onChange={handleAlterDateChangeTrainer}
                        />
                      </LocalizationProvider>
                    </div>
                  </Grid> */}

                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Mobile"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="alter_mobile"
                      value={formDataTrainer.alter_mobile}
                      onChange={handleChangeTrainer}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="alter_email"
                      value={formDataTrainer.alter_email}
                      onChange={handleChangeTrainer}
                    />
                  </Grid>




                  <Grid item xs={12}>
                    <div
                      style={{
                        marginTop: "30px",
                        display: "flex",
                        justifyContent: "right",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        style={{ backgroundColor: "#EE731B" }}
                        onClick={() => handelNext(1)}
                      >
                        Next
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </CustomTabPanel>

              <CustomTabPanel value={value} index={1}>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={4} md={4}>
                    <CountryRegionSelector country={country} setCountry={setCountry} />
                  </Grid>

{
    
      country !== "" &&  <Grid item xs={12} sm={8} md={8}>
     <AddressAutoComplete selectedCountry={country} setAddress={setAddress} updateCoordinates={updateCoordinates}  />
    </Grid>
}
                 
              

                


                  <Grid item xs={12} sm={4} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Street Address"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="address"
                      value={formDataTrainer.address}
                      onChange={handleChangeTrainer}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="city"
                      value={formDataTrainer.city}
                      onChange={handleChangeTrainer}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Post code"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="pincode"
                      value={formDataTrainer.pincode}
                      onChange={handleChangeTrainer}
                    />
                  </Grid>





                  {/* 
                  <Grid item xs={12}>
                    <div
                      style={{
                        padding: 5,
                      
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <div>
                        <Typography
                          style={{
                            letterSpacing: 1,
                            fontWeight: "bold",

                            fontSize: "14px",
                          }}
                        >
                          Qualification
                        </Typography>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <IconButton onClick={handleAddFields} color="primary">
                          <AddIcon />
                        </IconButton>
                        {inputFields.length > 4 && (
                          <IconButton
                            onClick={handleRemoveFields}
                            color="error"
                          >
                            <RemoveIcon />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  </Grid>

                  {inputFields.map((field, index) => (
                    <Grid item xs={12} sm={12} md={4} key={field.id}>
                   
                      {index % 3 === 0 ? (
                        <div
                          style={{
                            padding: "5px",
                            marginBottom: "5px",
                            width: "100%",
                          }}
                        >
                          {index % 3 === 0 &&
                            setCounter + Math.floor(index / 3)}
                          .{" "}
                        
                        </div>
                      ) : (
                        <div style={{ padding: "5px", marginBottom: "5px" }}>
                 
                        </div>
                      )}
                      {field.label === "Courses" ? (
                        <FormControl sx={{ width: "100%", marginTop: "24px" }}>
                          <InputLabel
                            id={`demo-multiple-checkbox-label-${field.id}`}
                          >
                            {field.label}
                          </InputLabel>
                          <Select
                            value={field.value}
                            onChange={(e) => handleChange2Trainer(e, field.id)}
                            input={<OutlinedInput label={field.label} />}
                            style={{ height: "56px" }}
                          >
                      
                            {course.map((name) => (
                              <MenuItem key={name} value={name}>
                                <ListItemText color="black" primary={name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          id={`outlined-basic-${field.id}`}
                          label={field.label}
                          variant="outlined"
                          style={{
                            width: "100%",
                            marginTop: `${
                              field.label === "Passing Year" ? "24px" : "0px"
                            }`,
                          }}
                          value={field.value}
                          onChange={(e) => handleChange3(e, field.id)}
                        />
                      )}
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <div
                      style={{
                        padding: 5,
                     
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <div>
                        <Typography
                          style={{
                            letterSpacing: 1,
                            fontWeight: "bold",

                            fontSize: "14px",
                          }}
                        >
                          Additional Courses
                        </Typography>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <IconButton onClick={handleAddFieldsAc} color="primary">
                          <AddIcon />
                        </IconButton>
                        {inputFieldsAc.length > 3 && (
                          <IconButton
                            onClick={handleRemoveFieldsAc}
                            color="error"
                          >
                            <RemoveIcon />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  </Grid>

                  {inputFieldsAc.map((field, index) => (
                    <Grid item xs={12} sm={12} md={4} key={field.id}>
                    
                      {index % 3 === 0 ? (
                        <div
                          style={{
                            padding: "5px",
                            marginBottom: "5px",
                            width: "100%",
                          }}
                        >
                          {index % 3 === 0 &&
                            setCounterAc + Math.floor(index / 3)}
                          .{" "}
                   
                        </div>
                      ) : (
                        <div style={{ padding: "5px", marginBottom: "5px" }}>
                   
                        </div>
                      )}

                      <TextField
                        id={`outlined-basic-${field.id}`}
                        label={field.label}
                        variant="outlined"
                        style={{
                          width: "100%",
                          marginTop: `${
                            field.label === "Passing Year" ||
                            field.label === "School Name"
                              ? "24px"
                              : "0px"
                          }`,
                        }}
                        value={field.value}
                        onChange={(e) => handleChange3Ac(e, field.id)}
                      />
                    </Grid>
                  ))} */}

                  <Grid item xs={12}>
                    <div
                      style={{
                        marginTop: "30px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        style={{ backgroundColor: "#EE731B" }}
                        onClick={() => handelPrevious(0)}
                      >
                        Previous
                      </Button>

                      <Button
                        variant="contained"
                        size="large"
                        style={{ backgroundColor: "#EE731B" }}
                        onClick={() => handelNext(2)}
                      >
                        Next
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </CustomTabPanel>

              <CustomTabPanel value={value} index={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <DropzoneComponent />
                  </Grid>


                  <Grid item xs={12}>
                    <TextareaAutosize
                      style={{
                        background: "transparent",
                        padding: 10,
                        width: `${!isMobile ? "100%" : "93%"}`,

                        borderColor: "#814151",
                      }}
                      aria-label="minimum height"
                      minRows={4}
                      maxRows={5}
                      placeholder="Description"
                      name="description"
                      value={formDataTrainer.description}
                      onChange={handleChangeTrainer}
                    />
                  </Grid>

                  {/* <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Teaching Experience In Years"
                      variant="outlined"
                      style={{ width: "100%" }}
                      name="teachingExperience"
                      value={formDataTrainer.teachingExperience}
                      onChange={handleChangeTrainer}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextareaAutosize
                      style={{
                        background: "transparent",
                        padding: 10,
                        width: `${!isMobile ? "97%" : "93%"}`,

                        borderColor: "#814151",
                      }}
                      aria-label="minimum height"
                      minRows={4}
                      maxRows={5}
                      placeholder="Work Experience – 500 words"
                      name="description"
                      value={formDataTrainer.description}
                      onChange={handleChangeTrainer}
                    />
                  </Grid> */}

                  {/* <Grid item xs={12}>
                    <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                      <Typography
                        style={{
                          letterSpacing: 1,
                          fontWeight: "bold",

                          fontSize: "14px",
                        }}
                      >
                        Yoga poses images
                      </Typography>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "20px" }}>
                        {TeacherimageFile1 && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "150px",
                                height: "150px",
                                border: "1px solid #ddd",
                                background: `url(${URL.createObjectURL(
                                  TeacherimageFile1
                                )}) center/cover no-repeat`,
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            ></div>
                          </div>
                        )}

                        <input
                          type="file"
                          onChange={handleFileChange3}
                          id="noborder"
                        />
                      </div>

                      <div>
                        {TeacherimageFile2 && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "150px",
                                height: "150px",
                                border: "1px solid #ddd",
                                background: `url(${URL.createObjectURL(
                                  TeacherimageFile2
                                )}) center/cover no-repeat`,
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            ></div>
                          </div>
                        )}

                        <input
                          type="file"
                          onChange={handleFileChange4}
                          id="noborder"
                        />
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        checked={isTCChecked}
                        onChange={handletermandconditionsCheck}
                        inputProps={{ "aria-label": "Checkbox demo" }}
                      />
                      <p style={{ fontSize: "15px" }}>
                        By creating an account, you agree to Samsara Wellness
                        <a
                          href="#"
                          style={{
                            color: "blue",
                            marginLeft: "5px",
                            marginRight: "5px",
                            textDecoration: "none",
                          }}
                        >
                          Terms & Conditions
                        </a>
                        and
                        <a
                          href="#"
                          style={{
                            color: "blue",
                            marginLeft: "5px",
                            marginRight: "5px",
                            textDecoration: "none",
                          }}
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </Grid> */}

                  <Grid item xs={12}>
                    <div
                      style={{
                        marginTop: "30px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        style={{ backgroundColor: "#EE731B" }}
                        onClick={() => handelPrevious(1)}
                      >
                        Previous
                      </Button>

                      <Button
                        variant="contained"
                        size="large"
                        style={{ backgroundColor: "#EE731B" }}
                        onClick={handelTrainerContinue}
                        disabled={Teacherloading}
                      >
                        {Teacherloading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </CustomTabPanel>

            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
