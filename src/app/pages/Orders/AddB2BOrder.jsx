import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { Box, Card, CardContent, FormControl, InputLabel, Typography } from '@mui/material';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import { DatePicker, LocalizationProvider,TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import "./AddJobs.css"
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];
export const AddB2BOrder = () => {
  const initalData = {
    assignedWorker: '',
    assignedSparePartWorker:'',
    jobName:"",
    description:"",
    partsRequired:[],
    name:"",
    email:"",
    mobileNumber:"",
    client:"",
    jobDate:"",
    startTime:"",
    stopTime:"",
    travelTime:""
    
  }
  const [formData, setFormData] = useState(initalData);

  const [b2bVendors, setB2BVendors] = useState([]);
  const [CollectorsData,setCollectorsData] = useState([]);
  const [WholesalersData,setWholesalersData] = useState([]);
  const [MediatorsData,setMediatorsData] = useState([]);
  const [FactoryData,setFactoryData] = useState([]);
  const [update,setupdate] = useState(0)
  const [toData,setToData] = useState([])
  const [fromData,setFromData] = useState([])
  const [subCategoryData,setSubCategoryData] = useState([])
  const [totalAmount,setTotalAmount] = useState("")
  const [selectedSubcategoryData,setSelectedSubcategoryData] = useState({})
  const [TechnicianData,setTechnicianData] = useState([])
  const [SparePartsData,setSparePratsTechnicianData] = useState([])
  const [TeamMemberData,setTeamMemberData] = useState([])
  const [ClientData,setClientData] = useState([])
  const [PartsData, setPartsData] = React.useState([]);
  const [AllSparePartsData, setAllSparePartsData] = useState([])
  const handlePartsChange = (event) => {
    const {
      target: { value },
    } = event;
    setPartsData(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleCategoryChange = (index, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index].category = value;
    setFormData({
      ...formData,
      details: updatedDetails,
    });
  };

  const handleQuantityChange = (index, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index].quantity = value;
    setFormData({
      ...formData,
      details: updatedDetails,
    });
  };

  const handleAddCategory = () => {
    setFormData({
      ...formData,
      details: [...formData.details, { category: '', quantity: 0 }],
    });
  };

  const handleRemoveCategory = (index) => {
    const updatedDetails = [...formData.details];
    updatedDetails.splice(index, 1);
    setFormData({
      ...formData,
      details: updatedDetails,
    });
  };

  const handleSubmit = () => {
    const userDetails ={
      name:formData.name,
      email:formData.email,
      mobileNumber:formData.mobileNumber,
      address:formData.address,
      pincode:formData.pincode,
      city:formData.city,
      country:formData.country
    }

    const filteredPartsData = AllSparePartsData.filter(part => PartsData.includes(part.partName));

// Extract IDs from the filtered objects
const matchingIds = filteredPartsData.map(part => part._id);

// Now matchingIds contains the IDs of objects where partName matches

// Create an array of objects with partsRequired field
// const partsRequiredArray = matchingIds.map(id => ({
//   id,
// }));
 
console.log("All Parts DAta ====>",matchingIds)
    const Data ={
      assignedWorker: formData.assignedWorker,
      assignedSparePartWorker:formData.assignedSparePartWorker,
      jobName:formData.jobName,
      description:formData.description,
      jobDate:formData.jobDate,
      startTime:formData.startTime,
      stopTime:formData.stopTime,
      user:userDetails,
      client:formData.client,
      travelTime:formData.travelTime
    }

    console.log("Data ==>",formData)
    createJob(Data);
    setFormData(initalData)
    setPartsData([])
    handelBack();
  };

  const createJob = async (data) => {
    try {
      const response = await axios.post(`${Base_url}api/job`,data );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const fetchTeamMember = async () => {
    try {
      const response = await axios.get(`${Base_url}api/worker`);

      if (response.status === 200) {
        const fetchedB2BUsers = response.data;
         setTeamMemberData(fetchedB2BUsers)
         const TechnicianData= fetchedB2BUsers.filter((el)=>{
          return el.role === "technician"
        })

        const SparePartsData= fetchedB2BUsers.filter((el)=>{
          return el.role === "spare parts"
        })

    
         
        setTechnicianData(TechnicianData);
        setSparePratsTechnicianData(SparePartsData);

      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const fetchClients = async () =>{
    try {
      const response = await axios.get(`${Base_url}api/client`);

      if (response.status === 200) {
        const Client = response.data;
        setClientData(Client)


      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  const handelBack = ()=>{
    window.history.back();
   }

   const getAllParts = async () => {
    try {
      const response = await axios.get(`${Base_url}api/parts`);
      setAllSparePartsData(response.data);
      console.log("Categories all", response.data)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      jobDate: date
    });
  };

  const handleStartTimeChange = (time) => {
    setFormData({
      ...formData,
      startTime: time
    });
  };

  const handleStopTimeChange = (time) => {
    setFormData({
      ...formData,
      stopTime: time
    });
  };


  useEffect(()=>{
    fetchClients()
    fetchTeamMember()
    getAllParts()
  },[update])
  return (
    <div>
      <Card sx={{minHeight:"100vh"}}>
        <CardContent>
        <div onClick={handelBack} style={{backgroundColor:"#7265bd",width:"35px",height:"35px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"10px",marginBottom:"15px"}}>
                <ArrowBackIosIcon style={{fontSize:"16px",color:"#fff"}}/>
            </div>
          <Box >
          <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Box>
            <Typography style={{fontSize:"30px",fontWeight:600,fontFamily:"sans-serif"}} >
             Create Jobs
            </Typography>
            </Box>
           

            {/* <Box>
              
              <Button variant="contained" style={{marginLeft:"20px",background:"#FF8604"}} startIcon={<AddIcon />} onClick={handelOrderClick} >Add Order</Button>
            </Box> */}
          </Box>
             
          <Grid container spacing={2} sx={{marginTop:"20px"}}>

          <Grid item xs={12} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Job Date"
            value={formData.jobDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Start Time"
            value={formData.startTime}
            onChange={handleStartTimeChange}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} sm={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Stop Time"
            value={formData.stopTime}
            onChange={handleStopTimeChange}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={3}>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Travel Time"
            value={formData.travelTime}
            onChange={handleTravelTimeChange}
            ampm={false}
          views={['minutes']}
          />
        </LocalizationProvider> */}
        <TextField
        label="Travel Time In Min"
        variant="outlined"
        name='travelTime'
        value={formData.travelTime}
        onChange={handleInputChange}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          maxLength: 2,
        }}
      />
      </Grid>

          <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Job Name"
          name="jobName"
          value={formData.jobName}
          onChange={handleInputChange}
        />
      </Grid>
     
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Job Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Assigne Worker</InputLabel>
        <Select
          fullWidth
          label="From"
          name="assignedWorker"
          value={formData.assignedWorker}
          onChange={handleInputChange}
        >
          {TechnicianData.map((el) => (
            <MenuItem key={el._id} value={el._id}>
              {el.name} 
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Assigne Spare Part Worker</InputLabel>
        <Select
          fullWidth
          label="From"
          name="assignedSparePartWorker"
          value={formData.assignedSparePartWorker}
          onChange={handleInputChange}
        >
          {SparePartsData.map((el) => (
            <MenuItem key={el._id} value={el._id}>
              {el.name} 
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </Grid>
     
     

      {/* <Grid item xs={12} sm={6}>
      
         <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Parts Required</InputLabel>
        <Select
        fullWidth
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={PartsData}
          onChange={handlePartsChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {AllSparePartsData.map((el,index) => (
            <MenuItem key={index} value={el.partName}>
              <Checkbox checked={PartsData.indexOf(el.partName) > -1} />
              <ListItemText primary={el.partName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid> */}

      <Grid item xs={12} >
         <Typography>Client Details</Typography>
      </Grid>

      <Grid item xs={12} sm={12}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Client</InputLabel>
        <Select
          fullWidth
          label="From"
          name="client"
          value={formData.client}
          onChange={handleInputChange}
        >
          {ClientData.map((el) => (
            <MenuItem key={el._id} value={el._id}>
              {el.name} 
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </Grid>

      {/* <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </Grid>


      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Mobile Number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Pin Code"
          name="pincode"
          value={formData.pincode}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
        />
      </Grid> */}
   
      <Grid item xs={12} sx={{textAlign:"right"}}>
        <Button variant="contained" sx={{bgcolor:"orange"}} size='large' onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
     
          </Box>
      
    
        </CardContent>
       </Card>
    
  </div>
  );
};
