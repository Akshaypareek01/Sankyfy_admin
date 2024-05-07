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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_url } from '../../Config/BaseUrl';
import { toAbsoluteUrl } from '../../../_metronic/helpers';

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
export const Team = () => {
 const navigate = useNavigate()
  const [value, setValue] = React.useState(0);
  const [searchInput, setSearchInput] = React.useState('');
  const [AllVendorsData,setVendorsData] = useState([])
  const [update,setupdate] = useState(0)
  const [CollectorsData,setCollectorsData] = useState([]);
  const [WholesalersData,setWholesalersData] = useState([]);
  const [MediatorsData,setMediatorsData] = useState([]);
  const [FactoryData,setFactoryData] = useState([]);

  const [TechnicianData,setTechnicianData] = useState([])
  const [SparePartsData,setSparePratsTechnicianData] = useState([])
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

  const handelAddVendors =()=>[
    navigate("add")
  ]

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${Base_url}api/worker`);

      if (response.status === 200) {
        const fetchedB2BUsers = response.data;
        // setCategories(fetchedCategories);

        console.log("Fetch users == >",fetchedB2BUsers)
        
        setVendorsData(fetchedB2BUsers)
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

  const deleteUser = async(ID) => {
    try{
      const res = await axios.delete(`${Base_url}api/category/${ID}`);
      console.log(res)
      setupdate((prev)=>prev+1)
    }
    catch(err){
      console.log("Error",err)
    }
  }


  useEffect(()=>{
    fetchTeamMembers()
  },[update])

  return (
    <Box >

       <Card sx={{minHeight:"100vh"}}>
        <CardContent>

          <Box >
          <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Box>
            <Typography style={{fontSize:"40px",fontWeight:600,fontFamily:"sans-serif"}} >
            Team
            </Typography>
            </Box>
           

            <Box>
             
              <Button variant="contained" style={{marginLeft:"20px",background:"#FF8604"}} startIcon={<AddIcon />} onClick={handelAddVendors} >Add Member</Button>
            </Box>
          </Box>
             

          <Box sx={{ borderBottom: 1, borderColor: 'divider',marginTop:"20px" }}>
      <ThemeProvider theme={orangeTheme}>
        <Tabs value={value} onChange={handleChangetabs} aria-label="basic tabs example" textColor="primary"
        indicatorColor="primary"
       
        >
          <Tab label="Technician Team" {...a11yProps(0)}  style={{fontSize:"16px",fontWeight:600,color:`${value === 0 ? "#EE731B" : "#555555"}`,marginRight:"10px",borderRadius:"10px",marginBottom:"10px"}}/>
          <Tab label="Spare Parts Team" {...a11yProps(1)} style={{fontSize:"16px",fontWeight:600,color:`${value === 1 ? "#EE731B" : "#555555"}`,marginRight:"10px",borderRadius:"10px",marginBottom:"10px"}} />
          
        </Tabs>
        </ThemeProvider>
      </Box>

      <Box sx={{display:"flex",marginTop:"20px",justifyContent:"left",alignItems:"center"}}>
            {/* <TextField fullWidth label="Search" /> */}
            
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
                TechnicianData && TechnicianData.length > 0  ? TechnicianData.map((el,index)=>{
                  return <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <InfoCard  Data={el}/>
                  </Grid>
                })
                :
                <Grid  item xs={12} style={{textAlign:"center"}}>
                    <div style={{textAlign:"center",height:"300px"}}>
             <img src={toAbsoluteUrl('/media/illustrations/dozzy-1/5-dark.png')} style={{height:"90%"}}  alt='' />
            <h2>No Technician Member Found</h2>
            </div>
                  </Grid>
               }

               

               


              
              </Grid>
        
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
      <Grid container spacing={2}>
                

                {
                 SparePartsData && SparePartsData.length > 0 ? SparePartsData.map((el,index)=>{
                   return <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                   <InfoCard  Data={el}/>
                   </Grid>
                 })
                 :
                <Grid  item xs={12} style={{textAlign:"center"}}>
                    <div style={{textAlign:"center",height:"300px"}}>
             <img src={toAbsoluteUrl('/media/illustrations/dozzy-1/5-dark.png')} style={{height:"90%"}}  alt='' />
            <h2>No Spare Parts Team Member Found</h2>
            </div>
                  </Grid>
                }
 
                
 
                
 
 
               
               </Grid>
      </CustomTabPanel>

      

    </Box>
    
        </CardContent>
       </Card>

       
   </Box>
  )
}

