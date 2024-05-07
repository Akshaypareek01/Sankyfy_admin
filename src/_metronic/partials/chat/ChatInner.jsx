/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState,useEffect, useRef,useContext} from 'react'
import clsx from 'clsx'
import {
  toAbsoluteUrl,
  defaultMessages,
  defaultUserInfos,
  MessageModel,
  UserInfoModel,
  messageFromClient,
} from '../../helpers'
import { socket } from '../../../socket'
import { Box } from '@mui/material'
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import ChatContext from '../../../Context/ChatContext'
const bufferMessages = []

const ChatInner = ({isDrawer = false,Data,MessageDeleteId,MessageMenueOpen,previousMessageData}) => {
  const userData=JSON.parse(sessionStorage.getItem('User'))
  const userEmail=userData.email;
  const created_by=userData._id;
  const username=userData.name;
  const userId = userData._id;
  const [chatUpdateFlag, toggleChatUpdateFlat] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(bufferMessages)
  const [userInfos] = useState(defaultUserInfos)
  const [Sendmessage, setSendMessage] = useState('');
  const [IncomingMessage, setIncomingMessage] = useState('')
  const [SenderisTyping, setSenderisTyping] = useState(false);
  const [MessageDelete,setMessageDelete]=useState(0);
  // const {previousMessageData,setpreviousMessageData} =useContext(ChatContext);
  const scrollableDivRef = useRef(null);
  const inputFieldRef = useRef(null);
  const {sharedData} = useContext(ChatContext)
  useEffect(() => {
    if(Object.keys(Data).length > 0 ){
      const scrollableDiv = scrollableDivRef.current;
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
    // console.log("working fine ===>",sharedData)
   
  }, [messages]);

  useEffect(()=>{
    // console.log("MessageData=====>",previousMessageData);
    
    const transformedMessages = previousMessageData.map(message => {
      const messageId=message._id;
      const createdAt = new Date(message.createdAt);
      const now = new Date();

      let time;
      if (now - createdAt < 60 * 60 * 1000) {
        const diffInMinutes = Math.floor((now - createdAt) / (60 * 1000));
        time = `${diffInMinutes} mins ago`;
      } else if (now - createdAt < 12 * 60 * 60 * 1000) {
        const diffInHours = Math.floor((now - createdAt) / (60 * 60 * 1000));
        time = `${diffInHours} hrs ago`;
      } else {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        time = createdAt.toLocaleDateString(undefined, options);
      }

      return {
        user: 2,
        type: message.sender_id === userId ? 'out' : 'in',
        text: message.message,
        time,
        createdAt: message.createdAt,
        messageId:messageId,
        flag:message.flag // Include the original createdAt value
      };
    });
    
    const sortedMessages = transformedMessages.sort((a, b) => {
      const timeA = new Date(a.createdAt);
      const timeB = new Date(b.createdAt);
      return timeA - timeB;
    });

    
     
   
    // console.log("Message Data after sturcture=====>",sortedMessages)
    setMessages(sortedMessages);
    
  },[previousMessageData,Data])

  useEffect(() => {
   
    
    const handleChatMessage = ({ id, message, sender_id, receiver_id, file_upload, createdAt, receiverName, receiverImage, myid, flag }) => {
      // console.log('on msg', message);
      if (sender_id !== userId) {
        const newMessage = {
          user: 2,
          type: 'in',
          text: message,
          time: 'Just now',
          createdAt:createdAt,
          messageId:id,
          flag:flag 
        };
  
        setMessages(prevMessages => [...prevMessages, newMessage]);
        
        addNewMessage({ id, message: message, sender_id, receiver_id, file_upload, createdAt, receiverName, receiverImage});
      }
    };
    const handelTyping=(data)=>{
      const { isTyping, nick, Image } = data;
      console.log("Typing =====>",isTyping, nick)
      setSenderisTyping(isTyping);
    }

    
  
    socket.on('chat message', handleChatMessage);

    socket.on("typing", handelTyping);
    
  //   socket.on("message_delete",({ message_id, receiverId, userId })=>{
  //     console.log("Delete Message",message_id);
  //     console.log(" Messages in messageDelete ==>",previousMessageData)
  //     setMessageDelete((prev)=>prev+1);
  //     if(message_id && messages.length>0){
      
  //        console.log("Updated Message oolu==>",messages)
  //        const updatedMessages = messages.filter((message) => message.messageId !== message_id);
         
  //        setMessages(updatedMessages);
      
      
  //      // setpreviousMessageData(updatedMessages);
  //     }
     
      

  //    //  setMessages()

  //  } );
   
      
  }, []);

  useEffect(()=>{
    if(MessageDeleteId !== " "){
      // console.log("Delete Message:====> " + MessageDeleteId);
      const updatedMessages = messages.filter((message) => message.messageId !== MessageDeleteId);
      setMessages(updatedMessages);
     }
  },[MessageDeleteId])
 

  const singleMessageDelete=(message)=> {
    // console.log(" Messages singleMessageDelete==>",message)
    const message_id = message.messageId;
    const receiverId=Data.user_id;
    let flag = '2';
    socket.emit("message_delete", { message_id, receiverId, userId, flag });
    const updatedMessages = messages.filter((message) => message.messageId !== message_id);
    setMessages(updatedMessages);
    // console.log("Delete Message fun call",updatedMessages)
  }

  const handleKeyUp = () => {
    const receiverId = Data.user_id;
   
    const inputValue = inputFieldRef.current.value;

    
      socket.emit('typing', {
        isTyping: inputValue.length > 0,
        nick: username,
        Image: "",
        receiverId: receiverId,
        senderId: userId,
      });
  

   
  };

  const addNewMessage = ({
    id,
    message,
    sender_id,
    receiver_id,
    file_upload,
    createdAt,
    receiverName,
    receiverImage,
   
  }) => {
    // console.log('adding message',receiver_id)
    socket.emit("receiverId", { receiver_id });
    socket.on("receiver_data", function ({ users }) {
      receiverName = users.name;
      // console.log("receiverName==>",users.name)
    });
  
  };

  const handleScroll = () => {
    const scrollableDiv = scrollableDivRef.current;
    if (scrollableDiv.scrollHeight - scrollableDiv.scrollTop === scrollableDiv.clientHeight) {
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  };

  const sendMessageIO = () => {
    // Emit the 'chat message' event
    // console.log("Sending message to",Data.name)
    socket.emit('chat message', {
      message: message,
      sender_id: userId,
      receiver_id: Data.user_id,
      file_upload: "",
      flag: '0'
    });
    // setSendMessage(message);
    const newMessage = {
      user: 2,
      type: 'out',
      text: message,
      time: 'Just now',
    }

    let id=Data.user_id;
    let startm=0;
    socket.emit("userClick", { id, userId, startm });
    // setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessage("");
    // bufferMessages.push(newMessage)
    // setMessages(bufferMessages)
    // toggleChatUpdateFlat(!chatUpdateFlag)
    // setMessage('')
  
    // ...
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      sendMessageIO()
    }
  }



  return (

    <div>

{Object.keys(Data).length > 0 
?
<div
style={{height:"80vh"}}
  className='card-body'
  id={isDrawer ? 'kt_drawer_chat_messenger_body' : 'kt_chat_messenger_body'}
>
  <div
  style={{height:"80%",overflow:"auto"}}
    // className={clsx('scroll-y me-n5 pe-5', {'h-300px h-lg-auto': !isDrawer})}
    ref={scrollableDivRef}
    onScroll={handleScroll}
    data-kt-element='messages'
    data-kt-scroll='true'
    data-kt-scroll-activate='{default: false, lg: true}'
    data-kt-scroll-max-height='auto'
    data-kt-scroll-dependencies={
      isDrawer
        ? '#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer'
        : '#kt_header, #kt_app_header, #kt_app_toolbar, #kt_toolbar, #kt_footer, #kt_app_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
    }
    data-kt-scroll-wrappers={
      isDrawer ? '#kt_drawer_chat_messenger_body' : '#kt_content, #kt_app_content, #kt_chat_messenger_body'
    }
    data-kt-scroll-offset={isDrawer ? '0px' : '5px'}
  >
    {messages.map((message, index) => {
      const userInfo = userInfos[message.user]
      const state = message.type === 'in' ? 'info' : 'primary'
      const templateAttr = {}
      if (message.template) {
        Object.defineProperty(templateAttr, 'data-kt-element', {
          value: `template-${message.type}`,
        })
      }
      const contentClass = `${isDrawer ? '' : 'd-flex'} justify-content-${
        message.type === 'in' ? 'start' : 'end'
      } mb-10`
      if(message.flag === "2"){
        return;
      }
      else{
        return (

          <div
            key={`message${index}`}
            className={clsx('d-flex', contentClass, 'mb-10', {'d-none': message.template})}
            {...templateAttr}
          >
            
            <div
              className={clsx(
                'd-flex flex-column align-items',
                `align-items-${message.type === 'in' ? 'start' : 'end'}`
              )}
            >
              <div className='d-flex align-items-center mb-2'>
                {message.type === 'in' ? (
                  <>
                    <div className='symbol  symbol-35px symbol-circle '>
                      <img alt='Pic' src={toAbsoluteUrl(`/media/${userInfo.avatar}`)} />
                    </div>
                    <div className='ms-3'>
                      <a
                        href='#'
                        className='fs-5 fw-bolder text-gray-900 text-hover-primary me-1'
                      >
                        {Data.name}
                      </a>
                      <span className='text-muted fs-7 mb-1'>{message.time}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='me-3'>
                      <span className='text-muted fs-7 mb-1'>{message.time}</span>
                      <a
                        href='#'
                        className='fs-5 fw-bolder text-gray-900 text-hover-primary ms-1'
                      >
                        You
                      </a>
                    </div>
                    <div className='symbol  symbol-35px symbol-circle '>
                      <img alt='Pic' src={toAbsoluteUrl(`/media/${userInfo.avatar}`)} />
                    </div>
                  </>
                )}
              </div>
              
  
              <div
                className={clsx(
                  'p-5 rounded',
                  `bg-light-${state}`,
                  'text-dark fw-bold mw-lg-400px',
                  `text-${message.type === 'in' ? 'start' : 'end'}`
                )}
                data-kt-element='message-text'
                dangerouslySetInnerHTML={{__html: message.text}}
              >
           
              </div>
              <Box  display={message.type === 'in' ? "none": "block"}>
  
                <Box  display={MessageMenueOpen ? "block": "none"}    >
               
               <Box width="100px" height="50px" display="flex" justifyContent="space-around" alignItems="center">
               <DeleteIcon  onClick={()=>{singleMessageDelete(message)}}  />
              
              <SendIcon  />
               </Box>
                
                </Box>
              </Box>
            
  
             
            </div>
          </div>
        )
      }
      
    })}
     <div>
              {SenderisTyping && 
              
              <Box style={{display:"flex",width:"120px",height:"50px",textAlign:"center",backgroundColor:"lightgreen",color:"white",fontWeight:"bold",fontSize:"20px",borderRadius:"20px",justifyContent:"center"}}>
              <p style={{marginTop:"8px"}}>Typing...</p>
              </Box>
              }
      </div>
  </div>

  <div
  style={{position:"absolute",bottom:"0",width:"95%",backgroundColor:"#F1F1F1",height:"130px",borderRadius:"20px"}}
    className='card-footer pt-4'
    id={isDrawer ? 'kt_drawer_chat_messenger_footer' : 'kt_chat_messenger_footer'}
  >
    <input
      ref={inputFieldRef}
      className='form-control form-control-flush mb-3'
      rows={1}
      data-kt-element='input'
      placeholder='Type a message'
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyUp={handleKeyUp}
      onKeyDown={onEnterPress}
    />
   
    <div className='d-flex flex-stack'>
      <div className='d-flex align-items-center me-2'>
        <button
          className='btn btn-sm btn-icon btn-active-light-primary me-1'
          type='button'
          data-bs-toggle='tooltip'
          title='Coming soon'
        >
          <i className='bi bi-paperclip fs-3'></i>
        </button>
        <button
          className='btn btn-sm btn-icon btn-active-light-primary me-1'
          type='button'
          data-bs-toggle='tooltip'
          title='Coming soon'
        >
          <i className='bi bi-upload fs-3'></i>
        </button>
      </div>
      <button
        className='btn btn-primary'
        type='button'
        data-kt-element='send'
        onClick={sendMessageIO}
      >
        Send
      </button>
    </div>
  </div>



 

  
  
</div>
:
<div> Select an User To chat</div>

}

    </div>
  
  
  )
}

export {ChatInner}
