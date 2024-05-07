import { createContext,useState } from "react";


 const ChatContext=createContext();

export const ChatContextProvider = ({ children }) => {
    // Define the data or state you want to share
    const sharedData = 'Hello, World!';
    const [previousMessageData, setpreviousMessageData] = useState([]);
  
    return (
      // Provide the value to the components that consume this context
      <ChatContext.Provider value={{previousMessageData,setpreviousMessageData,sharedData}}>
        {children}
      </ChatContext.Provider>
    );
  };
  
  export default ChatContext;