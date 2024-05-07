import { useRef, useEffect } from "react";
import "./AddressAutoComplete.css";
import { TextField } from "@mui/material";
const AddressAutoComplete = ({selectedCountry,setAddress,updateCoordinates}) => {
 const autoCompleteRef = useRef();
 const inputRef = useRef();
 const options = {
  componentRestrictions: { country:`${selectedCountry.toLowerCase()}`  },
  fields: ["address_components", "geometry", "icon", "name"],
  types: ["establishment"]
 };
 useEffect(() => {
  console.log("Selelcted country acc google ==>",selectedCountry.toLowerCase())
  autoCompleteRef.current = new window.google.maps.places.Autocomplete(
   inputRef.current,
   options
  );
  autoCompleteRef.current.addListener("place_changed", async function () {
    const place = await autoCompleteRef.current.getPlace();
    const { lat, lng } = place.geometry.location;
    console.log("Address search by googel -==============>",lat(),lng());
    updateCoordinates(lat(),lng())
    setAddress(place)
   });
 }, []);
 return (
  <div>
    {/* <TextField
    ref={inputRef}
                      
                    /> */}
   {/* <label>enter address :</label> */}
   <input placeholder="Search address using google" ref={inputRef} style={{width:"100%",height:"48px",borderColor:"#c4c4c4",padding:"10px"}} />
  </div>
 );
};
export default AddressAutoComplete;