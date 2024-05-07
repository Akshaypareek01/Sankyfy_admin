/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'

import {useIntl} from 'react-intl'
// import PieChart from 'react-pie-graph-chart';
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  MixedWidget2,
  ChartsWidget3,
  ChartsWidget6
} from '../../../_metronic/partials/widgets'
import { ChartsWidget170 } from './ChartsWidget170'
import { AllChargersMap } from './AllChargersMap'
import { PieWidgetDashboard } from './PieWidgetDashboard'
import { BASE_URL, Base_url } from '../../Config/BaseUrl'
import axios from 'axios'

const DashboardPage = ({jobs,teamMember}) => (
  
  <>

    {/* begin::Row */}
    <div className='row g-5 g-xl-10'>
      {/* begin::Col */}
      {/* <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 ' >
       
        <MixedWidget2
            className='card-xl-stretch mb-xl-8 '
            chartColor='info'
            chartHeight='100px'
            strokeColor='#4e12c4'
          />
          
        
      </div> */}
      {/* end::Col */}

      {/* begin::Col */}
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 ' >
        {/* mb-md-5 mb-xl-10 */}
      <CardsWidget20
          className=' mb-5'
          description='Total Jobs'
          color='#1B9A8B'
          img={'https://theodin.in/demos2/ic_dashboard/dist/assets/media/patterns/vector-12.png'}
          percent="72"
          heading={jobs.length}
          pending="Resolved"
        />
       
         <CardsWidget7
          className=' '
          description='Team'
          color='#1B9A8B'
          icon={false}
          stats={teamMember.length}
          labelColor='dark'
          textColor='gray-300'
          />
      
      </div>

     
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 ' >
        <div className="row">
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-12 mb-md-5  '>
        
        <CardsWidget17 className=' '/>
        </div>

        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-12 mb-md-5  ' >
         <ChartsWidget170 className=' '/>
        </div>
        </div>    
      </div>

	  
    </div>
    {/* end::Row */}

   


   

    {/* begin::Row */}
    <div className='row gy-5 gx-xl-8' style={{marginTop:"20px"}}>
      <div className='col-md-6'>
        <ChartsWidget3 className='card-xl-stretch mb-xl-8'/>
      </div>
      <div className='col-md-6'>
        <PieWidgetDashboard className='card-xl-stretch mb-xl-8'/>
      </div>
    </div>

    <div className='row gy-5 gx-xl-8' style={{marginTop:"20px"}}>
      <div className='col-md-12'>
       <ChartsWidget6 className='card-xl-stretch mb-xl-8'/>
      </div>
    </div>

	
   
	 

   
  
  
    
  </>
)

const DashboardWrapper = () => {
  const intl = useIntl()
  const token =sessionStorage.getItem('token');
  const [usersrows, setUsersRows] = useState([]);
  const [jobData,setJobData] = useState([])
  const [teamData,setteamData] = useState([])
  const getAllJobs = async () => {
    try {
      const response = await axios.get(`${Base_url}api/job`);
      console.log(response.data);
      const Jobs = response.data
      setJobData(Jobs)

      

      return response.data;
    } catch (error) {
      console.log("Error",error)
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${Base_url}api/worker`);

      if (response.status === 200) {
        const fetchedUsers = response.data;
        // setCategories(fetchedCategories);

        console.log("Fetch users == >",fetchedUsers)
        
        setteamData(fetchedUsers)
       

      } else {
        console.error('Error fetching categories:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(()=>{
    getAllJobs()
    fetchTeamMembers()
  },[])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage  jobs={jobData} teamMember={teamData}/>
    </>
  )
}

export {DashboardWrapper}
