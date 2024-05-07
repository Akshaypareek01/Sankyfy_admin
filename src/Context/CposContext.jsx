import { createContext,useEffect,useState } from "react";
import Cookies from 'js-cookie';
import { BASE_URL } from "../app/Config/BaseUrl";
import axios from "axios";

 const CposContext=createContext();

export const CpoContextProvider = ({ children }) => {
    
    const [update,setUpdated]=useState(0)

 
    return (
      // Provide the value to the components that consume this context
      <CposContext.Provider value={{setUpdated,update}}>
        {children}
      </CposContext.Provider>
    );
  };
  
  export default CposContext;