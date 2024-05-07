/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect,useContext} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Dropdown1, ChatInner} from '../../../../../_metronic/partials'
import { socket } from '../../../../../socket';
import { Box, Modal, Typography,TextField,Button  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ChatContext from '../../../../../Context/ChatContext';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CancelIcon from '@mui/icons-material/Cancel';
import { Call } from '../../../../../_metronic/partials/chat/Call';
import { VideoCall } from '../../../../../_metronic/partials/chat/VideoCall';
import { Howl } from 'howler';
import busyring from './notification/busy.mp3';
import callerring from './notification/call-ring.mp3'
import audioring from './notification/callertune.mp3'
import { IncommingCall } from '../../../../../_metronic/partials/chat/IncommingCall';
import { BASE_URL } from '../../../../Config/BaseUrl';
import axios from 'axios';

const Private = () => {
  const token = sessionStorage.getItem("token");
  const style = {
    textalign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const callStyle = {
    textalign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
   
    bgcolor: '#FAF0E4',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
//   const audioring = new Audio('./notification/callertune.mp3');
// const callerring = new Audio('./notification/call-ring.mp3');
// const busyring = new Audio('./notification/busy.mp3');
let isactive = false;
let vausername
let localStream
let peerConn
let isAudio = true
let isVideo = true
let cutingphone
  const userData=JSON.parse(sessionStorage.getItem('User'));
  const userEmail=userData.email;
  const created_by=userData._id;
  const username=userData.name;
  const userId = userData._id;
  const [AddContactopen, setAddContactopen] = React.useState(false);
  const [ConnectCallOpen, setConnectCallOpen] = React.useState(false);
  const [ConnectIncommingCallOpen, setConnectIncommingCallOpen] = React.useState(false);
  const [ConnectVideoCallOpen, setConnectVideoCallOpen] = React.useState(false);
  const [addContactData, setAddContactData] = React.useState({
    username: '',
    email: ''
  });
  const [ContactData, setContactData] = React.useState([]);
  const {previousMessageData, setpreviousMessageData} =useContext(ChatContext);
  const [ClickedContact, setClickedContact] = React.useState({});
  const [MessageMenueOpen, setMessageMenueOpen] = React.useState(false);
  const [MessageDeleteId, setMessageDeleteId] =React.useState("");
  let rspid="";
  let sameid="";
  let vaid="";
  useEffect(() => {
    // no-op if the socket is already connected
    console.log('Connect socket')
    socket.connect();
    socket.emit("new-user-joined", userId, username);
    // console.log('Soceket id',socket.id);
    // ContectList();
    socket.emit("userData", { userId });
    socket.on('contactsError', ({ msg }) => {
      console.log('Contacts error',msg);
      // toastr.error(msg, 'Error');
    });

    socket.on('Success', ({ msg }) => {
      console.log('Success',msg);
      // toastr.success(msg, 'Success');
      // value = document.getElementById("hide_modal")
      // value.click();
    });

    socket.on('contactsLists', ({ contacts }) => {
      // console.log('Contact===>', contacts);
      setContactData(contacts);
     
    });
   

    socket.on("contact_delete", function ({ receiverId, userId }) {
      console.log("delete", receiverId, userId);
      // document.getElementById(userId) ? document.getElementById(userId).remove() : '';
      // var we = document.getElementById("contact_" + userId).children[0].children[0].children[0].innerHTML[0];
      // document.getElementById("contact_" + userId).remove();
      // if (document.getElementById("s_chat_" + userId) != null) {
      //   document.querySelector(".user-profile-sidebar").style.display = "none";
      //   messageBox.innerHTML = "";
    
      //   document.getElementById("contact_" + receiverId) ? document.getElementById("contact_" + receiverId).remove() : '';
      //   document.getElementById(receiverId) ? document.getElementById(receiverId).remove() : '';
      //   const cntctlength = document.getElementById("contact-sort-" + we).getElementsByTagName('li').length;
      //   if (cntctlength <= 0) {
      //     document.getElementById('contact-of-' + we).remove();
      //   }
      //   document.getElementsByClassName("chat-conversation")[0].style.display = "none";
      //   document.getElementsByClassName("chat-input-section")[0].style.display = "none";
      //   document.getElementById("userProfileBar").style.display = "none";
      //   document.getElementsByClassName("chat-welcome-section")[0].style.display = "flex";
      // }
    });
 

    socket.on('contactInfo', ({ contacts }) => {
      // console.log("Contact info ===> " , contacts)
      CharacterData(contacts[0].user_id,contacts[0].name);
      vaid=contacts[0].user_id;
      // contacts.forEach(contact => {
      //   receiver_Id = contact.user_id;
      //   const time = new Date(contact.createdAt);
      //   const created_at =
      //     time.getDate() +
      //     "-" +
      //     (time.getMonth() + 1) +
      //     "-" +
      //     time.getFullYear() +
      //     "&ensp;" +
      //     time.getHours() +
      //     ":" +
      //     time.getMinutes();
    
     
      
     
      //   userhtml = CharacterData(contact.user_id, contact.name);
      
      // });
    });

    socket.on('onlineUser', ({ online }) => {
     console.log('onlineUser====>', online);
    });

    socket.on("message_delete",({ message_id, receiverId, userId })=>{
      console.log("Delete Message",message_id);
      if(message_id){
        setMessageDeleteId(message_id)
      }

   } );

   socket.on('itbusy', () => {
    console.log("Pesrosn is busy .....")
    playAudio(audioring,"pause");
    // audioring.pause();
    // audioring.currentTime = 0;
    // busyring.play();
    playAudio(busyring,"play");
    // endvcall();
    setTimeout(function () {
      // busyring.pause();
      playAudio(busyring,"pause");
      // busyring.currentTime = 0;
      // document.getElementById(`closevcmodel`).click();
      // document.getElementById(`audiotext`).innerHTML = "Calling...";
      // document.getElementById(`calltext`).innerHTML = "Calling...";
      // document.getElementById(`callvideomodel`).style.display = "block";
      // document.getElementById(`callaudiomodel`).style.display = "block";
      // document.getElementById(`audiotext`).style.display = "none";
      // document.getElementById(`calltext`).style.display = "none"; b
      // document.getElementById(`closeaudiomodel`).click();
      setConnectCallOpen(false);
    }, 3500)
  
  })
  socket.on('cutphoness', () => {
    console.log("cutphoness=====>")
    cutingphone = true;
    setConnectCallOpen(false)
    // document.getElementById(`cutincomingmodel`).click();
    // callerring.pause();
    playAudio(callerring,"pause")
    // callerring.currentTime = 0;
  
  })
  socket.on('cutpeeranswer', () => {
    console.log('cutpeeranswer.......')
    // document.getElementById(`audiotext`).innerHTML = "The person is busy";
    // document.getElementById(`calltext`).innerHTML = "The person is busy";
    // document.getElementById(`callvideomodel`).style.display = "none";
    // document.getElementById(`callaudiomodel`).style.display = "none";
    // audioring.pause();
    playAudio(audioring,"pause")
    // audioring.currentTime = 0;
    // busyring.play();
    playAudio(busyring,"play")
    // endvcall();
    setTimeout(function () {
      // busyring.pause();
      playAudio(busyring,"pause")
      // busyring.currentTime = 0;
      setConnectCallOpen(false);
      // document.getElementById(`closevcmodel`).click();
      // document.getElementById(`callvideomodel`).style.display = "block";
      // document.getElementById(`callaudiomodel`).style.display = "block";
      // document.getElementById(`audiotext`).style.display = "none";
      // document.getElementById(`calltext`).style.display = "none";
      // document.getElementById(`closeaudiomodel`).click();
    }, 3500)
  })
  socket.on("ringcalling", (uid, icid, name, image, ctype) => {
    if (!isactive) {
      console.log("ringcalling")
      cutingphone = false;
      rspid=icid;
      sameid=icid;
      handelInncomingCallModelOpen();
      // const user_img1 = `<img src="assets/images/users/${image}" class="avatar-title rounded-circle bg-soft-primary text-primary" alt="">`;
      // document.getElementById(`incomingimg`).innerHTML = user_img1;
      // document.getElementById('callimg').innerHTML = `<img src="assets/images/users/${image}" alt="" style="width: 500px; border-radius: 50%;">`;
      // document.getElementById('headerimg').setAttribute('src', `assets/images/users/${image}`);
      // document.getElementById(`icvid`).innerHTML = icid;
      // document.getElementById(`sameid`).innerHTML = icid;
      // document.getElementById(`icmname`).innerHTML = name;
      // document.getElementById(`samename`).innerHTML = name;
      // document.getElementById(`calltype`).innerHTML = 'video';
      // document.getElementById(`callicon`).innerHTML = ' <i class="ri-vidicon-fill"></i>';
      // document.getElementById(`calltypetext`).innerHTML = 'Incoming Video Call';
      if (ctype == 'audio') {
        console.log("ringcalling call type audio")
        // document.getElementById(`calltype`).innerHTML = 'audio';
        // document.getElementById(`callicon`).innerHTML = ' <i class="ri-phone-fill"></i>';
        // document.getElementById(`calltypetext`).innerHTML = 'Incoming Audio Call';
      }
      setTimeout(function () {
        if (!cutingphone) {
          
          // callerring.play();
          playAudio(callerring,"play");
          requestNotificationPermissions();
          var instance = new Notification(
            name, {
            body: `Incoming ${ctype} Call`,
            icon: `assets/images/users/${image}`
          });
          // document.getElementById(`openincoming_${uid}`).click();
          console.log("open incoming call model....")
        }
      }, 2500);
    } else {
      socket.emit('isbusy', icid);
    }
  })
  socket.on('answered', (rspid, ctype) => {
    // document.getElementById(`calltext`).style.display = 'none';
    if (ctype == 'video') {
      console.log("answered c type video")
      // document.getElementById("video-call-div")
      //   .style.display = "block";
    } else {
      // document.getElementById("video-call-div")
      //   .style.display = "none";
    }
    // audioring.pause();
    playAudio(audioring,"pause")
    // audioring.currentTime = 0;
    console.log("open call video model");
    // document.getElementById(`opencallvideomodel`).click();
    // document.getElementById(`closevcmodel`).click();
    // document.getElementById(`closeaudiomodel`).click();
  
  })
  socket.on('cutvc', (ctype) => {
    endvcall();
    console.log("end video call")
  })
  socket.on('getingonmsgs', (event) => {
    handleSignallingData(JSON.parse(event))
  })

   

    return () => {
      console.log('disconnect socket')
      socket.disconnect();

    };
  }, []);

  function playAudio(audio,action) {
 
   
    const sound = new Howl({
      src:audio,
      volume: 1.0,
      onend: function() {
        // Do something when the audio finishes playing
      }
    });
    if(action === "play" || action === "resume"){
      sound.play();
    }
    else{
      sound.pause();
    }
  }

  // const IncommingCallModelClose=(callType)=>{
  //   callerring.pause();
  //   callerring.currentTime = 0;
  //   socket.emit('cutanswerd', rspid, callType);
  // }
  // function requestNotificationPermissions() {
  //   if (Notification.permission !== "denied") {
  //     Notification.requestPermission(function (permission) { });
  //   }
  // }

  // function cutphones() {
  //   console.log("cut phone ...........")
  //   // if (document.getElementById(`audiotext`).style.display == 'block' || document.getElementById(`calltext`).style.display == 'block') {
  //   //   vaid = document.getElementById("vausername-input").value;
  //   //   socket.emit('cutphone', vaid);
  //   //   document.getElementById(`audiotext`).style.display = 'none';
  //   //   document.getElementById(`calltext`).style.display = 'none';
  //   //   setTimeout(() => {
  //   //     endvcall();
  //   //   }, 2000);
  //   // }
  // }
  // function handleSignallingData(data) {
  //   switch (data.type) {
  //     case "answer":
  //       peerConn.setRemoteDescription(data.answer)
  //       break
  //     case "candidate":
  //       peerConn.addIceCandidate(data.candidate)
  //       break
  //     case "offer":
  //       peerConn.setRemoteDescription(data.offer)
  //       createAndSendAnswer()
  //   }
  // }
  // function sendUsername(ctype) {
  //   console.log("sendUsername")
  //   // let users_id = document.getElementById("vausername-input").value
  //   // vausername = document.getElementById("vausername-input").value + '_' + userId;
  //   // socket.emit('ringcall', users_id, userId, globalusername, image, ctype)
  //   sendData({
  //     type: "store_user"
  //   })
  // }
  // function sendData(data) {
  //   data.username = vausername
  //   socket.emit('vccallmsg', JSON.stringify(data))
  // }
  // function createAndSendAnswer() {
  //   peerConn.createAnswer((answer) => {
  //     peerConn.setLocalDescription(answer)
  //     sendData({
  //       type: "send_answer",
  //       answer: answer
  //     })
  //   }, error => {
  //     console.log(error)
  //   })
  // }
  // function createAndSendOffer() {
  //   peerConn.createOffer((offer) => {
  //     sendData({
  //       type: "store_offer",
  //       offer: offer
  //     })
  //     peerConn.setLocalDescription(offer)
  //   }, (error) => {
  //     console.log(error)
  //   })
  // }
  // function startCall(ctype) {
  //   isactive = true;
  //   audioring.play();
  //   if (ctype == 'audio') {
  //     ctype = false
  //   } else {
  //     ctype = {
  //       frameRate: 24,
  //       width: {
  //         min: 480,
  //         ideal: 720,
  //         max: 1280
  //       },
  //       aspectRatio: 1.33333
  //     };
  //     // document.getElementById("video-call-div")
  //     //   .style.display = "inline";
  //   }
  
  //   navigator.getUserMedia({
  //     video: ctype,
  //     audio: true
  //   }, (stream) => {
  //     localStream = stream
  //     let configuration;
  //     if (ctype != false) {
  //       // document.getElementById("local-video").srcObject = localStream;
  //       configuration = {
  //         iceServers: [{
  //           "urls": ["stun:stun.l.google.com:19302",
  //             "stun:stun1.l.google.com:19302",
  //             "stun:stun2.l.google.com:19302"
  //           ]
  //         }]
  //       }
  //     }
  //     peerConn = new RTCPeerConnection(configuration)
  //     peerConn.addStream(localStream)
  
  //     peerConn.onaddstream = (e) => {
  //       // document.getElementById("remote-video")
  //       //   .srcObject = e.stream
  //     }
  
  //     peerConn.onicecandidate = ((e) => {
  //       if (e.candidate == null)
  //         return
  //       sendData({
  //         type: "store_candidate",
  //         candidate: e.candidate
  //       })
  //     })
  
  //     createAndSendOffer()
  //   }, (error) => {
  //     console.error('Device not found', 'Error');
  //     // document.getElementById(`cutincomingmodel`).click();
  //     cutphones();
  //   setTimeout(function () {
  //     // document.getElementById(`closevcmodel`).click();
  //     // document.getElementById(`closeaudiomodel`).click();
  //   }, 1500)
  //   })
  // }
  // function joinCall(jctype, userId, rspid) {
  //   isactive = true;
  //   if (jctype == 'audio') {
  //     jctype = false
  //   } else {
  //     jctype = {
  //       frameRate: 24,
  //       width: {
  //         min: 480,
  //         ideal: 720,
  //         max: 1280
  //       },
  //       aspectRatio: 1.33333
  //     };
  //     // document.getElementById("video-call-div")
  //     //   .style.display = "inline";
  //   }
  //   let vausername = userId + '_' + rspid
  
  //   navigator.getUserMedia({
  //     video: jctype,
  //     audio: true
  //   }, (stream) => {
  //     localStream = stream
  //     let configuration
  //     if (jctype != false) {
  //       // document.getElementById("local-video").srcObject = localStream
  //       configuration = {
  //         iceServers: [{
  //           "urls": ["stun:stun.l.google.com:19302",
  //             "stun:stun1.l.google.com:19302",
  //             "stun:stun2.l.google.com:19302"
  //           ]
  //         }]
  //       }
  //     }
  //     peerConn = new RTCPeerConnection(configuration)
  //     peerConn.addStream(localStream)
  //     peerConn.onaddstream = (e) => {
  //       document.getElementById("remote-video")
  //         .srcObject = e.stream
  //     }
  //     peerConn.onicecandidate = ((e) => {
  //       if (e.candidate == null)
  //         return
  
  //       sendData({
  //         type: "send_candidate",
  //         candidate: e.candidate
  //       })
  //     })
  //     sendData({
  //       type: "join_call"
  //     })
  
  //   }, (error) => {
  //     console.log(error)
  //   })
  // }
  // function endvcall() {
  //   console.log("endvcall")
  //   isactive = false;
  //   // $('#video i').attr('class', 'ri-camera-fill');
  //   // $('#audio i').attr('class', 'ri-mic-fill');
  //   isAudio = true
  //   isVideo = true
  //   audioring.pause();
  //   audioring.currentTime = 0;
  //   document.getElementById(`closevideomodel`).click();
  //   // if (localStream.getTracks != undefined) {
  //   //   localStream.getTracks().forEach(function (track) {
  //   //     if (track.readyState == 'live') {
  //   //       track.stop();
  //   //     }
  //   //   });
  //   // }
  //   if (peerConn.close !== undefined) peerConn.close();
  // }
  // function muteAudio() {
  //   if (isAudio == true) console.log('Muted Audio')
  //     // $('#audio i').attr('class', 'ri-mic-off-fill');
  //   else
  //     // $('#audio i').attr('class', 'ri-mic-fill');
  //     console.log('unMuted Audio')
  //   isAudio = !isAudio
  //   // localStream.getAudioTracks()[0].enabled = isAudio
  // }
  // function muteVideo() {
  //   if (isVideo == true)
  //     // $('#video i').attr('class', 'ri-camera-off-fill');
  //     console.log('Muted video isVideo',isVideo)
  //   else
  //     // $('#video i').attr('class', 'ri-camera-fill');
  //     console.log('Muted video else  isVideo',isVideo)
  //   isVideo = !isVideo
  //   localStream.getVideoTracks()[0].enabled = isVideo
  // }

  const handelMessageMenu=()=>{
    setMessageMenueOpen(true);
    setTimeout(()=>{
      setMessageMenueOpen(false);
    },5000)
  }


  function singleChat(id) {
  
      socket.emit('contactByUser', { id, userId });
      socket.emit('chat_online', { id });
     
  }

  function CharacterData(id, name) {
    let startm = 0
    socket.emit("userClick", { id, userId, startm });
  
    socket.on("userMessage", ({ users, msgno }) => {
      // console.log("userMessage",users, msgno)
      let msgtno = msgno;
      if(users.length > 0) {
        // console.log("Adding previous conversation---")
        setpreviousMessageData(users);
      }
     
      
    });
  
  }
 
  const handelClickedContact=(el)=>{
    // console.log("handelClickedContact==>",el)
    setClickedContact(el);
    singleChat(el.user_id);
  }

  const HandelAddContect=async()=>{
    // console.log("Add new Contect",userData);
    // setAddContactopen(false);
    const name=addContactData.username;
    const email=addContactData.email;
    
    socket.emit('contactList', { name, email, userEmail, created_by, username });
    setAddContactopen(false);
  
  }
  
  const handelContectChange=(e)=>{
    const { name, value } = e.target;
    setAddContactData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function deleteContact(contact_id, receiverId) {
    // socket.emit("contact_delete", { contact_id, receiverId, userId });
    // var form_class = document.getElementById("chat_add").getAttribute("class");
    // if (form_class == "message_form") {
    //   socket.emit("all_Message_delete", { receiverId });
    // } else {
    //   socket.emit("all_Group_Message_delete", { receiverId });
    // }
  
    // var we = document.getElementById("contact_" + receiverId).children[0].children[0].children[0].innerHTML[0];
    // document.getElementById("contact_" + receiverId).remove();
    // document.getElementById(receiverId).remove();
    // document.getElementById("s_chat_" + receiverId) ? document.getElementById("s_chat_" + receiverId).innerHTML = "" : '';
  
    // const cntctlength = document.getElementById("contact-sort-" + we).getElementsByTagName('li').length;
    // if (cntctlength <= 0) {
    //   document.getElementById('contact-of-' + we).remove();
    // }
  
    // var form_class = document.getElementById("chat_add").getAttribute("class");
    // document.querySelector(".chat-conversation").style.display = "none";
    // document.getElementsByClassName("chat-input-section")[0].style.display = "none";
    // document.getElementById("userProfileBar").style.display = "none";
    // document.getElementsByClassName("chat-welcome-section")[0].style.display = "flex";
  
  }

  const handelCallModelOpen=()=>{
    setConnectCallOpen(true);
    sendUsername('audio');
    startCall('audio');
    
     
   
   
  }
  const handelCallModelClose=()=>{
    setConnectCallOpen(false);
    cutphones()
    playAudio(audioring,"pause")
    
     
   
   
  }

  const handelInncomingCallModelOpen=()=>{
    setConnectIncommingCallOpen(true);
    sendUsername('audio');
    startCall('audio');
    
     
   
   
  }
  const handelInncomingCallModelClose=()=>{
    setConnectIncommingCallOpen(false);
    
     
   
   
  }

  const handelReciveCall=()=>{
    playAudio(callerring,"pause")
    console.log("Reciving call...")
    socket.emit('answerd', rspid, 'audio');

    joinCall("audio", userId, rspid);
  }

  function cutphones() {
    // if (document.getElementById(`audiotext`).style.display == 'block' || document.getElementById(`calltext`).style.display == 'block') {
      
      socket.emit('cutphone', vaid);
      document.getElementById(`audiotext`).style.display = 'none';
      document.getElementById(`calltext`).style.display = 'none';
      setTimeout(() => {
        endvcall();
      }, 2000);
    
  }

  function handleSignallingData(data) {
    switch (data.type) {
      case "answer":
        peerConn.setRemoteDescription(data.answer)
        break
      case "candidate":
        peerConn.addIceCandidate(data.candidate)
        break
      case "offer":
        peerConn.setRemoteDescription(data.offer)
        createAndSendAnswer()
    }
  }
  function sendUsername(ctype) {
    console.log("in sendUsername", ctype)
    let image=""
    // let users_id = document.getElementById("vausername-input").value
    vausername = username + '_' + userId;
    socket.emit('ringcall', ClickedContact.user_id, userId, username, image, ctype)
    sendData({
      type: "store_user"
    })
  }
  function sendData(data) {
    data.username = vausername
    socket.emit('vccallmsg', JSON.stringify(data))
  }
  function createAndSendAnswer() {
    peerConn.createAnswer((answer) => {
      peerConn.setLocalDescription(answer)
      sendData({
        type: "send_answer",
        answer: answer
      })
    }, error => {
      console.log(error)
    })
  }
  function createAndSendOffer() {
    peerConn.createOffer((offer) => {
      sendData({
        type: "store_offer",
        offer: offer
      })
      peerConn.setLocalDescription(offer)
    }, (error) => {
      console.log(error)
    })
  }
  function startCall(ctype) {
    console.log("in start calling...");
    isactive = true;
    // audioring.play();
    playAudio(audioring,"play")
    if (ctype == 'audio') {
      ctype = false
    } else {
      ctype = {
        frameRate: 24,
        width: {
          min: 480,
          ideal: 720,
          max: 1280
        },
        aspectRatio: 1.33333
      };
     
    }
  
    navigator.getUserMedia({
      video: ctype,
      audio: true
    }, (stream) => {
      localStream = stream
      let configuration;
      if (ctype != false) {
        // document.getElementById("local-video").srcObject = localStream;
        configuration = {
          iceServers: [{
            "urls": ["stun:stun.l.google.com:19302",
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302"
            ]
          }]
        }
      }
      peerConn = new RTCPeerConnection(configuration)
      console.log("peer connection", peerConn)
      peerConn.addStream(localStream)
  
      peerConn.onaddstream = (e) => {
        document.getElementById("remote-video")
          .srcObject = e.stream
      }
  
      peerConn.onicecandidate = ((e) => {
        if (e.candidate == null)
          return
        sendData({
          type: "store_candidate",
          candidate: e.candidate
        })
      })
  
      createAndSendOffer()
    }, (error) => {
     console.log('Device not found', 'Error');
      // document.getElementById(`cutincomingmodel`).click();
      cutphones();
    setTimeout(function () {
      // document.getElementById(`closevcmodel`).click();
      // document.getElementById(`closeaudiomodel`).click();
    }, 1500)
    })
  }
  function joinCall(jctype, userId, rspid) {
    console.log('join call  ==>',jctype, userId, rspid)
    isactive = true;
    if (jctype == 'audio') {
      jctype = false
    } else {
      jctype = {
        frameRate: 24,
        width: {
          min: 480,
          ideal: 720,
          max: 1280
        },
        aspectRatio: 1.33333
      };
      // document.getElementById("video-call-div")
      //   .style.display = "inline";
    }
    vausername = userId + '_' + rspid
  
    navigator.getUserMedia({
      video: jctype,
      audio: true
    }, (stream) => {
      localStream = stream
      let configuration
      if (jctype != false) {
        // document.getElementById("local-video").srcObject = localStream
        configuration = {
          iceServers: [{
            "urls": ["stun:stun.l.google.com:19302",
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302"
            ]
          }]
        }
      }
      peerConn = new RTCPeerConnection(configuration)
      peerConn.addStream(localStream)
      peerConn.onaddstream = (e) => {
        // document.getElementById("remote-video")
        //   .srcObject = e.stream
      }
      peerConn.onicecandidate = ((e) => {
        if (e.candidate == null)
          return
  
        sendData({
          type: "send_candidate",
          candidate: e.candidate
        })
      })
      sendData({
        type: "join_call"
      })
  
    }, (error) => {
      console.log(error)
    })
  }
  function endvcall() {
    isactive = false;
    // $('#video i').attr('class', 'ri-camera-fill');
    // $('#audio i').attr('class', 'ri-mic-fill');
    isAudio = true
    isVideo = true
    audioring.pause();
    audioring.currentTime = 0;
    document.getElementById(`closevideomodel`).click();
    if (localStream.getTracks != undefined) {
      localStream.getTracks().forEach(function (track) {
        if (track.readyState == 'live') {
          track.stop();
        }
      });
    }
    if (peerConn.close !== undefined) peerConn.close();
  }
  function muteAudio() {
    if (isAudio == true)
    console.log("Muted Audio")
      // $('#audio i').attr('class', 'ri-mic-off-fill');
    else
      // $('#audio i').attr('class', 'ri-mic-fill');
    isAudio = !isAudio
    localStream.getAudioTracks()[0].enabled = isAudio
  }
  function muteVideo() {
    if (isVideo == true)
      // $('#video i').attr('class', 'ri-camera-off-fill');\
      console.log("Muted video")
    else
      // $('#video i').attr('class', 'ri-camera-fill');
    isVideo = !isVideo
    localStream.getVideoTracks()[0].enabled = isVideo
  }

  function requestNotificationPermissions() {
    if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) { });
    }
  }

  return (
    <div className='d-flex flex-column flex-lg-row'>
      
      <div  className='flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0'>
        <div className='card card-flush'>
          <div className='card-header pt-7' id='kt_chat_contacts_header' style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <form className=' position-relative' autoComplete='off'>
              <KTSVG
                path='/media/icons/duotune/general/gen021.svg'
                className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y'
              />

              <input
                type='text'
                className='form-control form-control-solid px-15'
                name='search'
                placeholder='Search by username or email...'
              />
            </form>
            <Box >
         {/* <AddIcon fontSize='large' onClick={()=>setAddContactopen(true)}/> */}
            </Box>
          </div>

          <div style={{height:"80vh",overflow:"auto"}} className='card-body pt-5' id='kt_chat_contacts_body'>
            <div
              className='scroll-y me-n5 pe-5 h-200px h-lg-auto'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
              data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
              data-kt-scroll-offset='0px'
            >
            
            {ContactData.length > 0 &&
              ContactData.map((el,index)=>{
                    return (
                      <div key={index} onClick={()=>{handelClickedContact(el)}}>
                  <div className='d-flex flex-stack py-4'>
                <div className='d-flex align-items-center'>
                  <div className='symbol symbol-45px symbol-circle'>
                    <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
                  </div>

                  <div className='ms-5'>
                    <a href='#' className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                      {el.name}
                    </a>
                    <div className='fw-bold text-gray-400'>{el.email}</div>
                  </div>
                </div>

                <div className='d-flex flex-column align-items-end ms-2'>
                  <span className='text-muted fs-7 mb-1'>20 hrs</span>
                </div>
              </div>
              

                 <div className='separator separator-dashed d-none'></div>
                      </div>
                    )
              })
            }

              

             

              
            </div>
          </div>
        </div>
      </div>

      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
       
        {
            Object.keys(ClickedContact).length > 0 ?  
            <div className='card' id='kt_chat_messenger'>
            <div className='card-header' id='kt_chat_messenger_header'>
              <div className='card-title'>
                <div className='symbol-group symbol-hover'></div>
                <div className='d-flex justify-content-center flex-column me-3'>
                  <a
                    href='#'
                    className='fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1'
                  >
                    {ClickedContact && ClickedContact.name}
                  </a>
  
                  <div className='mb-0 lh-1'>
                    <span className='badge badge-success badge-circle w-10px h-10px me-1'></span>
                    <span className='fs-7 fw-bold text-gray-400'>Active</span>
                  </div>
                </div>
              </div>
  
              <div className='card-toolbar'>
                <div className='me-n3'>
                  <Box sx={{width:"200px",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                  <CallIcon style={{fontSize:"24px"}} onClick={()=>handelCallModelOpen()} />

                  
                  <VideoCallIcon style={{fontSize:"26px"}} onClick={()=>setConnectVideoCallOpen(true)} />
                
                  <MoreHorizIcon style={{fontSize:"28px"}}  onClick={handelMessageMenu}/>

                  </Box>
               
                


                  {/* <button
                    className='btn btn-sm btn-icon btn-active-light-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='top-end'
                  >
                    <i className='bi bi-three-dots fs-2'></i>
                   
                  </button> */}
                  <Dropdown1 />
                </div>
              </div>
            </div>
            <ChatInner Data={ClickedContact} MessageDeleteId={MessageDeleteId} MessageMenueOpen={MessageMenueOpen} previousMessageData={previousMessageData}  />
          
          </div>
            :
            <div style={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center"}}> 
              <div style={{textAlign:"center"}}>
              <img src="https://cdn.dribbble.com/users/665029/screenshots/16162764/media/3ea69cb1655fba401acc6c4328d38633.gif"
               alt="gif"/>
              <h1 style={{color:"#302A4E",fontSize:"35px",marginTop:"-80px"}}>Select  User To Chat</h1>

              </div>
             
            </div>
          }
      </div>
      <Modal
        open={AddContactopen}
        onClose={()=>setAddContactopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" style={{textAlign:"center",fontWeight:"bold"}} >Add Contect</Typography>
        <TextField id="outlined-basic" label="USER NAME" value={addContactData.username} name='username' onChange={handelContectChange} variant="outlined" style={{width:"100%",marginTop:"20px"}}/>
        <TextField id="outlined-basic" label="EMAIL" variant="outlined" value={addContactData.email} name='email' onChange={handelContectChange} style={{width:"100%",marginTop:"20px"}}/>
            
            <Box style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
            <Button variant="contained" size='large' onClick={HandelAddContect}>ADD</Button>
            </Box>
        
        </Box>
      </Modal>

      
      <Modal
        open={ConnectCallOpen}
        onClose={()=>handelCallModelClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={callStyle}>
          <Box  textAlign="right">
          
          <CancelIcon style={{fontSize:"34px"}} onClick={()=>handelCallModelClose()} />
          </Box>

          <Box>
            <Call/>
          </Box>
          {/* <Typography variant="h6" style={{textAlign:"center",fontWeight:"bold"}} >Call</Typography>
       
            
            <Box style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
            <Button variant="contained" size='large' onClick={HandelAddContect}>ADD</Button>
            </Box> */}
        
        </Box>
      </Modal>


      <Modal
        open={ConnectIncommingCallOpen}
        onClose={()=>handelInncomingCallModelClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={callStyle}>
          <Box  textAlign="right">
          
          <CancelIcon style={{fontSize:"34px"}} onClick={()=>handelInncomingCallModelClose()} />
          </Box>

          <Box>
            <IncommingCall handelReciveCall={handelReciveCall} />
          </Box>
          {/* <Typography variant="h6" style={{textAlign:"center",fontWeight:"bold"}} >Call</Typography>
       
            
            <Box style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
            <Button variant="contained" size='large' onClick={HandelAddContect}>ADD</Button>
            </Box> */}
        
        </Box>
      </Modal>

      <Modal
        open={ConnectVideoCallOpen}
        onClose={()=>setConnectVideoCallOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={callStyle}>
        <Box  textAlign="right">
          
          <CancelIcon style={{fontSize:"34px"}} onClick={()=>setConnectVideoCallOpen(false)} />
          </Box>

          <Box>
            <VideoCall />
          </Box>
          {/* <Typography variant="h6" style={{textAlign:"center",fontWeight:"bold"}} >Video Call</Typography>
       
            
            <Box style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
            <Button variant="contained" size='large' onClick={HandelAddContect}>ADD</Button>
            </Box> */}
        
        </Box>
      </Modal>
    </div>
  )
}

export {Private}
