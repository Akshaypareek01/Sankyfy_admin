import { Box, Button, Card, CardContent, Tab,InputAdornment, Tabs, Typography, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { InfoCard } from '../../../Components/InfoCard';
import Grid from "@mui/material/Grid";
import { OrdersCard } from '../../../Components/OrdersCard';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import { B2BOrdersCard } from '../../../Components/B2BOrderCard';
import { JobCard } from '../../../Components/JobCard';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth:"500px",
  
  bgcolor: 'background.paper',
  borderRadius:"10px",
  boxShadow: 24,
  p: 2,
};
const orangeTheme = createTheme({
  palette: {
    primary: {
      main: '#EE731B', // Set the main color to your desired shade of orange
    },
  },
});

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
        <Box sx={{ p: 3 }}>
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export const B2BOrders = () => {
  const navigate = useNavigate()
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
};

const thTdStyle = {
   fontSize:"16px",
    textAlign: 'center',
    padding: '8px',
};
  const [value, setValue] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  
  const [open, setOpen] = useState(false);
  const [OrdersData,setOrderData] = useState([]);
  const [JobData,setJobData] = useState([]);
  const [PendingJobData,setPendingJobData] = useState([]);
  const [InProgressJobData,setInProgressJobData] = useState([]);
  const [OnHoldJobData,setOnHoldJobData] = useState([]);
  const [CompletedJobData,setCompletedJobData] = useState([]);
  const [WorkerTravling,setWorkerTravling] = useState([]);
  const [TravelCompleted,setTravelCompleted] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedOrderData(null)
  }
  const [SelectedOrderData,setSelectedOrderData] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangetabs = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    // const filteredData = rows.filter((row) =>
    //   Object.values(row)
    //     .filter((value) => typeof value === 'string') // Filter only string values
    //     .some((value) =>
    //       value.toLowerCase().includes(searchInput.toLowerCase())
    //     )
    // );
    // setFilterRows(filteredData);
  };
  const handleResetFilter = () => {
    setSearchInput('');
    // setFilterRows(rows);
  };

 const createOrder = async (from, to, details, totalAmount, status) => {
    try {
      const response = await axios.post(`${Base_url}api/b2b_orders`, { from, to, details, totalAmount, status });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  // Function to get all B2B orders
 const getOrders = async () => {
    try {
      const response = await axios.get(`${Base_url}api/job`);
      console.log(response.data);
      const Jobs = response.data
      setJobData(Jobs)

      const PendingJobs = Jobs.filter (el=>el.status === 'pending')
      const OnHoldJobs = Jobs.filter (el=>el.status === 'onhold')
      const InProgressJobs = Jobs.filter (el=>el.status === 'inprogress')
      const CompletedJobs = Jobs.filter (el=>el.status === 'completed')
      const WorkerTravling = Jobs.filter (el=>el.status === 'worker traveling')
      const TravevlCompleted = Jobs.filter (el=>el.status === 'travel completed')
      // worker traveling,travel completed
      setPendingJobData(PendingJobs);
      setOnHoldJobData(OnHoldJobs);
      setInProgressJobData(InProgressJobs);
      setCompletedJobData(CompletedJobs);
      setWorkerTravling(WorkerTravling);
      setTravelCompleted(TravevlCompleted);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  // Function to get a B2B order by ID
  const getOrderById = async (id) => {
    try {
      const response = await axios.get(`${Base_url}api/b2b_orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  // Function to update a B2B order
  const updateOrder = async (id, from, to, details, totalAmount, status) => {
    try {
      const response = await axios.put(`${Base_url}api/b2b_orders/${id}`, { from, to, details, totalAmount, status });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  // Function to delete a B2B order
  const deleteOrder = async (id) => {
    try {
      const response = await axios.delete(`${Base_url}api/b2b_orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const handelOrderClick = ()=>{
    navigate("add")
  }

  const handelViewOrderClick = (data)=>{
    setSelectedOrderData(data);
    handleOpen()
  }

  useEffect(()=>{
    getOrders();
  },[])

  return (
    <Box >

       <Card sx={{minHeight:"100vh"}}>
        <CardContent>

          <Box >
          <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Box>
            <Typography style={{fontSize:"40px",fontWeight:600,fontFamily:"sans-serif"}} >
             Jobs
            </Typography>
            </Box>
           

            <Box>
              
              <Button variant="contained" style={{marginLeft:"20px",background:"#FF8604"}} startIcon={<AddIcon />} onClick={handelOrderClick} >Job</Button>
            </Box>
          </Box>
             

          <Box sx={{ borderBottom: 1, borderColor: 'divider',marginTop:"20px" }}>
      <ThemeProvider theme={orangeTheme}>
        <Tabs value={value} onChange={handleChangetabs} aria-label="basic tabs example" textColor="primary"
        indicatorColor="primary"
       
        >
          <Tab label="Pending" {...a11yProps(0)}  style={{fontSize:"16px",fontWeight:600,color:`${value === 0 ? "#EE731B" : "#555555"}`,marginRight:"10px",borderRadius:"10px",marginBottom:"10px"}}/>
          <Tab label="Worker Traveling" {...a11yProps(1)} style={{fontSize:"16px",fontWeight:600,color:`${value === 1 ? "#EE731B" : "#555555"}`,marginRight:"10px",borderRadius:"10px",marginBottom:"10px"}} />
          <Tab label="Worker Travel Completed" {...a11yProps(2)} style={{fontSize:"16px",fontWeight:600,color:`${value === 2 ? "#EE731B" : "#555555"}`,marginRight:"10px",borderRadius:"10px",marginBottom:"10px"}} />
          
          <Tab label="In Progress" {...a11yProps(3)}  style={{fontSize:"16px",fontWeight:600,color:`${value === 3 ? "#EE731B" : "#555555"}`,marginRight:"10px",borderRadius:"10px",marginBottom:"10px"}}/>
          <Tab label="On Hold" {...a11yProps(4)}  style={{fontSize:"16px",fontWeight:600,color:`${value === 4 ? "#EE731B" : "#555555"}`,marginRight:"10px",borderRadius:"10px",marginBottom:"10px"}}/>
          <Tab label="Completed" {...a11yProps(5)} style={{fontSize:"16px",fontWeight:600,color:`${value === 5 ? "#EE731B" : "#555555"}`,marginRight:"10px",borderRadius:"10px",marginBottom:"10px"}} />
          
        </Tabs>
        </ThemeProvider>
      </Box>

      <Box sx={{display:"flex",marginTop:"20px",justifyContent:"left",alignItems:"center"}}>
       
            
            <TextField
          label="Search"
          id="outlined-start-adornment"
          size='small'
          sx={{ m: 1, width: '250px' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
          }}
          value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
        />

<Button variant="contained" style={{marginLeft:"20px",background:"black",height:"33px"}} startIcon={<FilterListIcon />} >A-Z</Button>
            </Box>
          </Box>
         

          <Box sx={{ width: '100%',marginTop:"20px",height:"70vh",overflow:"auto" }}>
      

      

      <CustomTabPanel value={value} index={0}>
       

         <Grid container spacing={2}>
            {
                PendingJobData && PendingJobData.map((el,index)=>{
                   return <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                    <JobCard Fun={()=>handelViewOrderClick(el)} Data={el}/>
                    </Grid>
                })
            }
             

              </Grid>
        
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
      <Grid container spacing={2}>
            {
                WorkerTravling && WorkerTravling.map((el,index)=>{
                   return <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                    <JobCard Fun={()=>handelViewOrderClick(el)} Data={el}/>
                    </Grid>
                })
            }
             

              </Grid>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
      <Grid container spacing={2}>
            {
                TravelCompleted && TravelCompleted.map((el,index)=>{
                   return <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                    <JobCard Fun={()=>handelViewOrderClick(el)} Data={el}/>
                    </Grid>
                })
            }
             

              </Grid>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
      <Grid container spacing={2}>
            {
                InProgressJobData && InProgressJobData.map((el,index)=>{
                   return <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                    <JobCard Fun={()=>handelViewOrderClick(el)} Data={el}/>
                    </Grid>
                })
            }
             

              </Grid>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={4}>
      <Grid container spacing={2}>
            {
                OnHoldJobData && OnHoldJobData.map((el,index)=>{
                   return <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                    <JobCard Fun={()=>handelViewOrderClick(el)} Data={el}/>
                    </Grid>
                })
            }
             

              </Grid>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={5}>
      <Grid container spacing={2}>
            {
                CompletedJobData && CompletedJobData.map((el,index)=>{
                   return <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                    <JobCard Fun={()=>handelViewOrderClick(el)} Data={el}/>
                    </Grid>
                })
            }
             

              </Grid>
      </CustomTabPanel>

     


    </Box>
    
        </CardContent>
       </Card>


       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

{SelectedOrderData && 
<Box>
<Box style={{display:"flex",justifyContent:"right",alignItems:"center",marginTop:"20px"}}>
            <CloseIcon onClick={handleClose} sx={{marginTop:"-20px",fontSize:"23px"}}/>
          </Box>


<Box sx={{marginTop:"20px"}}>


<Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box >
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>status :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px",width:"130px",padding:"5px",textAlign:"center",borderRadius:"10px",bgcolor:"green"}}>
        <Typography sx={{fontSize:"14px",color:"#fff"}}>{SelectedOrderData.status}</Typography>
      </Box>
    </Box>
<Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box >
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>Date :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"15px"}}>{SelectedOrderData.date}</Typography>
      </Box>
    </Box>

  <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>Assigned Worker :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"15px",color:"blue",cursor:"pointer"}}>{SelectedOrderData.assignedWorker.name}</Typography>
      </Box>
    </Box>

    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>User :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        <Typography sx={{fontSize:"15px",color:"blue",cursor:"pointer"}}>{SelectedOrderData.user.name}</Typography>
      </Box>
    </Box>

    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>Category :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        {/* <Typography sx={{fontSize:"15px"}}>{SelectedOrderData.details.category}</Typography> */}
      </Box>
    </Box>

    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>Sub Category :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        {/* <Typography sx={{fontSize:"15px"}}>{SelectedOrderData.details.sub_category}</Typography> */}
      </Box>
    </Box>

    <Box sx={{display:"flex",justifyContent:"left",alignItems:"center",marginTop:"15px"}}>
      <Box>
      <Typography sx={{fontSize:"16px",fontWeight:"bold"}}>Quantity :</Typography>
      </Box>
      <Box sx={{marginLeft:"10px"}}>
        {/* <Typography sx={{fontSize:"15px"}}>{SelectedOrderData.details.quantity} Kg</Typography> */}
      </Box>
    </Box>

 
</Box>

</Box>
}
          
          
         
        </Box>
      </Modal>

       
   </Box>
  )
}

