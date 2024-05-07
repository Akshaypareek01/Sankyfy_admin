import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    TextareaAutosize,
    Typography,
    Select,
    FormControl ,
    MenuItem ,
    InputLabel ,
    Checkbox,
    ListItemText

  } from "@mui/material";
  import React, { useState } from "react";
  import { ThemColor } from "../../Them/ThemColor";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import { useNavigate } from "react-router-dom";
  import { BASE_URL, Base_url } from "../../Config/BaseUrl";
  import axios from "axios";
  import Grid from "@mui/material/Grid";
  // import CountryList from 'react-select-country-list';
  export const AddTeam = () => {
    const navigate = useNavigate();
    const [Formdata, setFormData] = useState({
      name: "",
      mobile: "",
      gender: "",
      email: "",
      description:"",
      pincode: "",
      address: "",
      city: "",
      country: "",
      languages:[],
      experience:0,
      role:"",
      pin: "",
    });
    const [Category, setCategory] = React.useState('');
    const [VendorType, setVendorType] = React.useState('');
    

    const [imageFile, setImageFile] = useState(null);
    const [PanimageFile1,setPanImageFile1] = useState(null)
    const [PanimageFile2,setPanImageFile2] = useState(null)
    const [AddharimageFile1,setAddharImageFile1] = useState(null)
    const [AddharimageFile2,setAddharImageFile2] = useState(null)
    const handelGoBack = () => {
      window.history.back();
    };

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    // const handleVendorTypeChange = (event) => {
    //     setVendorType(event.target.value);
    // };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...Formdata, [name]: value });
    };
    const handleFileChange1 = (e) => {
      setPanImageFile1(e.target.files[0]);
    };
    const handleFileChange2 = (e) => {
      setPanImageFile2(e.target.files[0]);
    };
    const handleFileChange3 = (e) => {
      setAddharImageFile1(e.target.files[0]);
    };
    const handleFileChange4 = (e) => {
      setAddharImageFile2(e.target.files[0]);
    };

  
    const handleSubmit = async () => {
     
     const Data = Formdata
  
      try {
        const response = await axios.post(`${Base_url}api/worker`,Data);
        if (response.status === 201) {
          const newProduct = response.data;
          console.log("New worker created:", newProduct);
          setFormData({
            name: "",
      mobile: "",
      gender: "",
      email: "",
      description:"",
      pincode: "",
      address: "",
      city: "",
      country: "",
      languages:[],
      experience:0,
      role:"",
      pin: "",
          });
          
          handelGoBack();
        } else {
          console.error("Error creating product:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
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
    return (
      <Box>
        <Box style={{ marginTop: "30px" }}>
          <Card>
            <CardContent>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <ArrowBackIcon
                  onClick={handelGoBack}
                  style={{ marginRight: "20px", color: `${ThemColor.buttons}` }}
                />
                <Typography variant="h6" style={{ letterSpacing: 1 }}>
                  Add new team member
                </Typography>
              </Box>
  
              {/* <Box>
              {PanimageFile1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        border: "1px solid #ddd",
                        background: `url(${URL.createObjectURL(
                          PanimageFile1
                        )}) center/cover no-repeat`,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    ></div>
                  </div>
                )}
  
                {PanimageFile2 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        border: "1px solid #ddd",
                        background: `url(${URL.createObjectURL(
                          PanimageFile2
                        )}) center/cover no-repeat`,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    ></div>
                  </div>
                )}
  
  
                {AddharimageFile1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        border: "1px solid #ddd",
                        background: `url(${URL.createObjectURL(
                          AddharimageFile1
                        )}) center/cover no-repeat`,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    ></div>
                  </div>
                )}
  
                 {AddharimageFile2 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "left",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                        border: "1px solid #ddd",
                        background: `url(${URL.createObjectURL(
                          AddharimageFile2
                        )}) center/cover no-repeat`,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    ></div>
                  </div>
                )}
  
  
              </Box> */}
              
  
              <Box style={{ marginTop: "20px" }}>
                
                <Grid container spacing={2}>
                <Grid item xs={4}>
                   <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> Member Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="role"
          value={Formdata.role}
          label="Role"
          onChange={handleInputChange}
        >
          <MenuItem value={"technician"}>Technician</MenuItem>
          <MenuItem value={"spare parts"}>Spare Parts</MenuItem>
        
          
        </Select>
      </FormControl>
    </Box>
                  </Grid>

  
                  <Grid item xs={4}>
                    <TextField
                      label="Name"
                      name="name"
                      value={Formdata.name}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>

         
  
                  {/* <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Select Category</InputLabel>
                  <Select
                    label="Select Category"
                    name="category"
                    value={Formdata.category}
                    onChange={handleInputChange}
                    required
                  >
                    {
                      categories.map((el,index)=>{
                            return  <MenuItem key={index} value={el._id}>{el.name}</MenuItem>
                      })
                    }
                   
                    
                  </Select>
                </FormControl>
              </Grid> */}
  
                

                  <Grid item xs={4}>
                   <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="gender"
          value={Formdata.gender}
          onChange={handleInputChange}
          label="gender"
          
        >
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
          <MenuItem value={"others"}>Others</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
                  </Grid>
  
                  <Grid item xs={4}>
                    <TextField
                      type="Eamil"
                      label="email"
                      name="email"
                      value={Formdata.email}
                      onChange={handleInputChange}
                      fullWidth
                      multiline
                      required
                    />
                  </Grid>
  
                  <Grid item xs={4}>
                    <TextField
                      label="Mobile"
                      name="mobile"
                      value={Formdata.mobile}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
  
                  <Grid item xs={4}>
                    <TextField
                      label="PIN"
                      name="pin"
                      value={Formdata.pin}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="experience"
                      name="experience"
                      value={Formdata.experience}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      label="languages"
                      name="languages"
                      value={Formdata.languages}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
  
                  <Grid item xs={4}>
                    <TextField
                      label="description"
                      name="description"
                      value={Formdata.description}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
  
            
  
                  
  
                  <Grid item xs={4}>
                    <TextField
                      label="Address"
                      name="address"
                      value={Formdata.address}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
  
                  <Grid item xs={4}>
                    <TextField
                      label="City"
                      name="city"
                      value={Formdata.city}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
  
                  <Grid item xs={4}>
                    <TextField
                      label="Pincode"
                      name="pincode"
                      value={Formdata.pincode}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
  
                  <Grid item xs={4}>
                    <TextField
                      label="Country"
                      name="country"
                      value={Formdata.country}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                    {/* <label>Select Country:</label>
      <CountryList
      name="country"
        value={Formdata.country}
        onChange={handleInputChange}
        label="Select a country"
      /> */}
                  </Grid>
  
                 
  
                  
                </Grid>
  
               
                     <Grid container spacing={2} style={{marginTop:"20px"}}>
                     {/* <Grid item xs={12}>
                     <Box>
                      <Typography>Uplode Pan Card Images</Typography>
                     </Box>
                 </Grid> */}
                     {/* <Grid item xs={6}>
                    
                   
                     <TextField
                      type="file"
                      variant="outlined"
                      onChange={handleFileChange1}
                      fullWidth
                    />
                  </Grid>
  
                  <Grid item xs={6}>
                    
                    <TextField
                      type="file"
                      variant="outlined"
                      onChange={handleFileChange2}
                      fullWidth
                    />
                   
                  </Grid>
  
                  <Grid item xs={12}>
                     <Box>
                      <Typography>Uplode Addhar Card Images</Typography>
                     </Box>
                 </Grid>
  
                 <Grid item xs={6}>
                    
                   
                    <TextField
                     type="file"
                     variant="outlined"
                     onChange={handleFileChange3}
                     fullWidth
                   />
                 </Grid>
  
                 <Grid item xs={6}>
                   
                   <TextField
                     type="file"
                     variant="outlined"
                     onChange={handleFileChange4}
                     fullWidth
                   />
                  
                 </Grid> */}
  
                 <Grid item xs={12}>
                    <Box
                      style={{
                        marginTop: "40px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{ backgroundColor: `${ThemColor.buttons}` }}
                        onClick={handleSubmit}
                        size="large"
                      >
                        Submit
                      </Button>
                    </Box>
                  </Grid>
  
                     </Grid>
  
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  };
  