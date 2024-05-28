
import { Box, Button, Card, CardContent, CardHeader, Modal, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ThemColor } from '../../Them/ThemColor'
import TuneIcon from '@mui/icons-material/Tune';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { GenralTabel } from '../../TabelComponents/GenralTable';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { AddCircle } from '@mui/icons-material';
import { Base_url } from '../../Config/BaseUrl';
import axios from 'axios';
import UserContext from '../../../Context/UserContext';
import CloseIcon from '@mui/icons-material/Close';

export const AllShops = () => {
    const navigate = useNavigate();
    const { update, setUpdated } = useContext(UserContext);
    const [allShopsData, setAllShopsData] = useState([]);
    const [cords, setCords] = useState({ lat: '', lng: '' });
  
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${Base_url}api/shop`);
  
        if (response.status === 200) {
          const fetchedCategories = response.data.data;
          setAllShopsData(fetchedCategories);
        } else {
          console.error('Error fetching categories:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
   
  
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map2'), {
        center: { lat:20.00000000, lng:77.00000000 },
        zoom: 5,
      });
  
      const markerIcon = {
        url: 'https://vectorified.com/images/google-maps-marker-icon-38.png', // Replace with your custom marker image URL
        scaledSize: new window.google.maps.Size(40, 40), // Adjust size as needed
      };
  
      allShopsData.forEach((shop) => {
        const marker = new window.google.maps.Marker({
          position: { lat: shop.lat, lng: shop.lng },
          map: map,
          icon: markerIcon,
          title: shop.shopName, // Set the title to the shop name
        });
  
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><h3>${shop.shopName}</h3></div>`,
        });
  
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    };
  
    useEffect(() => {
      if (allShopsData.length > 0) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBiT-IQhU-7xJVBPuo7t7v5y38anGc6JCk`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);
  
        return () => {
          document.head.removeChild(script);
        };
      }
    }, [allShopsData]);
  
    useEffect(() => {
      fetchUser();
    }, [update]);
  
    return (
      <Box>
        <Box style={{ marginTop: '-2px' }}>
          <div id="map2" style={{ width: '100%', height: '80vh' }}></div>
        </Box>
        <Box></Box>
      </Box>
    );
  };
