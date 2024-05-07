/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {KTSVG} from '../../../helpers'
import {getCSSVariableValue} from '../../../assets/ts/_utils'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {useThemeMode} from '../../layout/theme-mode/ThemeModeProvider'
import InventoryIcon from '@mui/icons-material/Inventory';
import EvStationIcon from '@mui/icons-material/EvStation';
import { BASE_URL } from '../../../../app/Config/BaseUrl'
import axios from 'axios'
import { Button, Switch } from '@mui/material'
type Props = {
  className: string
  chartColor: string
  strokeColor: string
  chartHeight: string
}

const MixedWidget2: React.FC<Props> = ({className, chartColor, chartHeight, strokeColor}) => {
  const token = sessionStorage.getItem("token");
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartHeight, chartColor, strokeColor)
    )
    if (chart) {
      chart.render()
    }

    return chart
  }
  const [CposData,setCposData]=useState<any>(null)
  const [ChargersfilterRows,setChargersfilterRows] = useState<any>([])
  const [DcChargers,setDcChargers] = useState([])
  const [AcChargers,setAcChargers] = useState([])
  const [ActiveChargers,setActiveChargers] = useState([])
  const [InActiveChargers,setInActiveChargers] = useState([])

  useEffect(() => {
    const chart = refreshChart()
    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode])
  const fetchChargerData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/chargers/`, {
        headers: { Authorization: `${token}` },
      });
      // Assuming the response data is an array of objects with the required properties
      
      const data = response.data;
      const ChargerData=data.data.chargers;
      console.log("response chargers==>", data);
      if(data && data.status === 'success'){
           const formattedData = ChargerData.map((item:any) => ({
          "Name":item.ChargerName,
          "Station Name":item.ChargerStation,
          "Location":<span>{item.Latitude},{item.Longitude}</span>,
          "OCPP ID":item.OCPP_ID,
          "Address":<span>{item.street},{item.area},{item.city},{item.Pincode},{item.state}</span>,
          "Status":item.functional,
          "City":item.city,
          "ChargerType":item.ChargerType,
          "Power Rating":"60.00KW",
          "Connectors":"CCS / GBT/ TYPE 2",
      }));

      const ChargersDcData = formattedData.filter((item:any) => {
        return item.ChargerType.toLowerCase() === "dc"
      });

      const ChargersAcData = formattedData.filter((item:any) => {
        return item.ChargerType.toLowerCase() === "ac"
      });

      const ChargersActiveData = formattedData.filter((item:any) => {
        return item.Status === true
      });

      const ChargersInActiveData = formattedData.filter((item:any) => {
        return item.Status === false
      });

     
      setChargersfilterRows(formattedData);
      setDcChargers(ChargersDcData);
      setAcChargers(ChargersAcData)
      setActiveChargers(ChargersActiveData)
      setInActiveChargers(ChargersInActiveData)
      }
     
      
    } catch (error) {
      console.error("Error fetching data:", error);
      
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cpo/users`, {
          headers: { Authorization: `${token}` },
        });
        // Assuming the response data is an array of objects with the required properties
        console.log("response in dashbord wegit", response.data);
        setCposData(response.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchChargerData();
  }, []);

  return (
    <div className="card card-flush h-xl-100" >
    {/*begin::Heading*/}
    <div
      className="card-header rounded bgi-no-repeat bgi-size-cover bgi-position-y-top bgi-position-x-center align-items-start h-250px"
      style={{
        backgroundImage: 'url("https://theodin.in/demos2/ic_dashboard/dist/assets/media/patterns/pattern-1.jpg")'
      }}
      data-bs-theme="light"
    >
      {/*begin::Title*/}
      <h3 className="card-title align-items-start flex-column text-white pt-15">
        <span className="fw-bold fs-2x mb-3"> Summary</span>
        <div className="fs-4 text-white">
          <span className="position-relative d-inline-block">
            <a
              href=""
              className="link-white opacity-75-hover fw-bold d-block mb-1"
            >
              7 New
            </a>
            {/*begin::Separator*/}
            <span className="position-absolute opacity-50 bottom-0 start-0 border-2 border-body border-bottom w-100" />
            {/*end::Separator*/}
          </span>
          <span className="opacity-75"> Users added in last 24 hours</span>
        </div>
      </h3>
      {/*end::Title*/}
      {/*begin::Toolbar*/}
      <div className="card-toolbar pt-5">
        {/*begin::Menu*/}
        <button
          className="btn btn-sm btn-icon btn-active-color-primary btn-color-white bg-white bg-opacity-25 bg-hover-opacity-100 bg-hover-white bg-active-opacity-25 w-20px h-20px"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-overflow="true"
        >
          {/*begin::Svg Icon | path: icons/duotune/general/gen052.svg*/}
          <span className="svg-icon svg-icon-4">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x={10}
                y={10}
                width={4}
                height={4}
                rx={2}
                fill="currentColor"
              />
              <rect
                x={17}
                y={10}
                width={4}
                height={4}
                rx={2}
                fill="currentColor"
              />
              <rect
                x={3}
                y={10}
                width={4}
                height={4}
                rx={2}
                fill="currentColor"
              />
            </svg>
          </span>
          {/*end::Svg Icon*/}
        </button>
        {/*end::Menu*/}
      </div>
      {/*end::Toolbar*/}
    </div>
    {/*end::Heading*/}
    {/*begin::Body*/}
    <div className="card-body mt-n20">
      {/*begin::Stats*/}
      <div className="mt-n20 position-relative">
        {/*begin::Row*/}
        <div className="row g-3 g-lg-6">
          {/*begin::Col*/}
          <div className="col-6">
            {/*begin::Items*/}
            <div className="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5">
              {/*begin::Symbol*/}
              <div className="symbol symbol-30px me-5 mb-8">
                <span className="symbol-label">
                  {/*begin::Svg Icon | path: icons/duotune/medicine/med005.svg*/}
                  <span className="svg-icon svg-icon-1 svg-icon-primary">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.3"
                        d="M17.9061 13H11.2061C11.2061 12.4 10.8061 12 10.2061 12C9.60605 12 9.20605 12.4 9.20605 13H6.50606L9.20605 8.40002V4C8.60605 4 8.20605 3.6 8.20605 3C8.20605 2.4 8.60605 2 9.20605 2H15.2061C15.8061 2 16.2061 2.4 16.2061 3C16.2061 3.6 15.8061 4 15.2061 4V8.40002L17.9061 13ZM13.2061 9C12.6061 9 12.2061 9.4 12.2061 10C12.2061 10.6 12.6061 11 13.2061 11C13.8061 11 14.2061 10.6 14.2061 10C14.2061 9.4 13.8061 9 13.2061 9Z"
                        fill="currentColor"
                      />
                      <path
                        d="M18.9061 22H5.40605C3.60605 22 2.40606 20 3.30606 18.4L6.40605 13H9.10605C9.10605 13.6 9.50605 14 10.106 14C10.706 14 11.106 13.6 11.106 13H17.8061L20.9061 18.4C21.9061 20 20.8061 22 18.9061 22ZM14.2061 15C13.1061 15 12.2061 15.9 12.2061 17C12.2061 18.1 13.1061 19 14.2061 19C15.3061 19 16.2061 18.1 16.2061 17C16.2061 15.9 15.3061 15 14.2061 15Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  {/*end::Svg Icon*/}
                </span>
              </div>
              {/*end::Symbol*/}
              {/*begin::Stats*/}
              <div className="m-0">
                {/*begin::Number*/}
                <span className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                  {CposData !== null && CposData.length}
                </span>
                {/*end::Number*/}
                {/*begin::Desc*/}
                <span className="text-gray-500 fw-semibold fs-6">Business Profile</span>
                {/*end::Desc*/}
              </div>
              {/*end::Stats*/}
            </div>
            {/*end::Items*/}
          </div>
          {/*end::Col*/}
          {/*begin::Col*/}
          <div className="col-6">
            {/*begin::Items*/}
            <div className="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5">
              {/*begin::Symbol*/}
              <div className="symbol symbol-30px me-5 mb-8 d-flex justify-content-between">
                <span className="symbol-label">
                  {/*begin::Svg Icon | path: icons/duotune/finance/fin001.svg*/}
                  <span className="svg-icon svg-icon-1 svg-icon-primary">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.3"
                        d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  {/*end::Svg Icon*/}
                </span>

               

              </div>
              {/*end::Symbol*/}
              {/*begin::Stats*/}
              <div className="m-0">
                {/*begin::Number*/}
                <div className="d-flex justify-content-between">
                  

                  <div >
                  <span className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                  1789
                </span>
                <span className="text-gray-500 fw-semibold fs-6">Active Users</span>
                  </div>

                  <div >
                  <span className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                 23
                </span>
                <span className="text-gray-500 fw-semibold fs-6">Inactive Users</span>
                  </div>
               
                
                
                </div>
               
                {/*end::Number*/}
                {/*begin::Desc*/}
               
                
                {/*end::Desc*/}
              </div>
              {/*end::Stats*/}
            </div>
            {/*end::Items*/}
          </div>
          {/*end::Col*/}
          {/*begin::Col*/}
          <div className="col-6">
            {/*begin::Items*/}
            <div className="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5">
              {/*begin::Symbol*/}
              <div className="symbol symbol-30px me-5 mb-8">
                <span className="symbol-label">
                  {/*begin::Svg Icon | path: icons/duotune/general/gen020.svg*/}
                  <span className="svg-icon svg-icon-1 svg-icon-primary">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 18V16H10V18L9 20H15L14 18Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.3"
                        d="M20 4H17V3C17 2.4 16.6 2 16 2H8C7.4 2 7 2.4 7 3V4H4C3.4 4 3 4.4 3 5V9C3 11.2 4.8 13 7 13C8.2 14.2 8.8 14.8 10 16H14C15.2 14.8 15.8 14.2 17 13C19.2 13 21 11.2 21 9V5C21 4.4 20.6 4 20 4ZM5 9V6H7V11C5.9 11 5 10.1 5 9ZM19 9C19 10.1 18.1 11 17 11V6H19V9ZM17 21V22H7V21C7 20.4 7.4 20 8 20H16C16.6 20 17 20.4 17 21ZM10 9C9.4 9 9 8.6 9 8V5C9 4.4 9.4 4 10 4C10.6 4 11 4.4 11 5V8C11 8.6 10.6 9 10 9ZM10 13C9.4 13 9 12.6 9 12V11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11V12C11 12.6 10.6 13 10 13Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  {/*end::Svg Icon*/}
                </span>
              </div>
              {/*end::Symbol*/}
              {/*begin::Stats*/}
              <div className="m-0">
                {/*begin::Number*/}
                <span className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                  3,214
                </span>
                {/*end::Number*/}
                {/*begin::Desc*/}
                <span className="text-gray-500 fw-semibold fs-6">
                  Total Products Sold
                </span>
                {/*end::Desc*/}
              </div>
              {/*end::Stats*/}
            </div>
            {/*end::Items*/}
          </div>
          {/*end::Col*/}
          {/*begin::Col*/}
          <div className="col-6">
            {/*begin::Items*/}
            <div className="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5">
              {/*begin::Symbol*/}
              <div className="symbol symbol-30px me-5 mb-8">
                <span className="symbol-label">
                  {/*begin::Svg Icon | path: icons/duotune/general/gen013.svg*/}
                  <span className="svg-icon svg-icon-1 svg-icon-primary">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.3"
                        d="M20.9 12.9C20.3 12.9 19.9 12.5 19.9 11.9C19.9 11.3 20.3 10.9 20.9 10.9H21.8C21.3 6.2 17.6 2.4 12.9 2V2.9C12.9 3.5 12.5 3.9 11.9 3.9C11.3 3.9 10.9 3.5 10.9 2.9V2C6.19999 2.5 2.4 6.2 2 10.9H2.89999C3.49999 10.9 3.89999 11.3 3.89999 11.9C3.89999 12.5 3.49999 12.9 2.89999 12.9H2C2.5 17.6 6.19999 21.4 10.9 21.8V20.9C10.9 20.3 11.3 19.9 11.9 19.9C12.5 19.9 12.9 20.3 12.9 20.9V21.8C17.6 21.3 21.4 17.6 21.8 12.9H20.9Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16.9 10.9H13.6C13.4 10.6 13.2 10.4 12.9 10.2V5.90002C12.9 5.30002 12.5 4.90002 11.9 4.90002C11.3 4.90002 10.9 5.30002 10.9 5.90002V10.2C10.6 10.4 10.4 10.6 10.2 10.9H9.89999C9.29999 10.9 8.89999 11.3 8.89999 11.9C8.89999 12.5 9.29999 12.9 9.89999 12.9H10.2C10.4 13.2 10.6 13.4 10.9 13.6V13.9C10.9 14.5 11.3 14.9 11.9 14.9C12.5 14.9 12.9 14.5 12.9 13.9V13.6C13.2 13.4 13.4 13.2 13.6 12.9H16.9C17.5 12.9 17.9 12.5 17.9 11.9C17.9 11.3 17.5 10.9 16.9 10.9Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  {/*end::Svg Icon*/}
                </span>
              </div>
              {/*end::Symbol*/}
              {/*begin::Stats*/}
              <div className="m-0">
                {/*begin::Number*/}
                <span className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                  64,280
                </span>
                {/*end::Number*/}
                {/*begin::Desc*/}
                <span className="text-gray-500 fw-semibold fs-6">
                  Total Revenue
                </span>
                {/*end::Desc*/}
              </div>
              {/*end::Stats*/}
            </div>
            {/*end::Items*/}
          </div>
          {/*end::Col*/}


          <div className="col-12">
            {/*begin::Items*/}
            <div className="bg-gray-100 bg-opacity-70 rounded-2 px-6 py-5">
              {/*begin::Symbol*/}
              <div className="symbol symbol-30px me-5 mb-8">
                <span className="symbol-label">
                  {/*begin::Svg Icon | path: icons/duotune/general/gen020.svg*/}
                  <span className="svg-icon svg-icon-1 svg-icon-primary">
                  <InventoryIcon/>
                  {/* <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 19.725V18.725C20 18.125 19.6 17.725 19 17.725H5C4.4 17.725 4 18.125 4 18.725V19.725H3C2.4 19.725 2 20.125 2 20.725V21.725H22V20.725C22 20.125 21.6 19.725 21 19.725H20Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.3"
                        d="M22 6.725V7.725C22 8.325 21.6 8.725 21 8.725H18C18.6 8.725 19 9.125 19 9.725C19 10.325 18.6 10.725 18 10.725V15.725C18.6 15.725 19 16.125 19 16.725V17.725H15V16.725C15 16.125 15.4 15.725 16 15.725V10.725C15.4 10.725 15 10.325 15 9.725C15 9.125 15.4 8.725 16 8.725H13C13.6 8.725 14 9.125 14 9.725C14 10.325 13.6 10.725 13 10.725V15.725C13.6 15.725 14 16.125 14 16.725V17.725H10V16.725C10 16.125 10.4 15.725 11 15.725V10.725C10.4 10.725 10 10.325 10 9.725C10 9.125 10.4 8.725 11 8.725H8C8.6 8.725 9 9.125 9 9.725C9 10.325 8.6 10.725 8 10.725V15.725C8.6 15.725 9 16.125 9 16.725V17.725H5V16.725C5 16.125 5.4 15.725 6 15.725V10.725C5.4 10.725 5 10.325 5 9.725C5 9.125 5.4 8.725 6 8.725H3C2.4 8.725 2 8.325 2 7.725V6.725L11 2.225C11.6 1.925 12.4 1.925 13.1 2.225L22 6.725ZM12 3.725C11.2 3.725 10.5 4.425 10.5 5.225C10.5 6.025 11.2 6.725 12 6.725C12.8 6.725 13.5 6.025 13.5 5.225C13.5 4.425 12.8 3.725 12 3.725Z"
                        fill="currentColor"
                      />
                    </svg> */}
                  </span>
                  {/*end::Svg Icon*/}
                </span>
              </div>
              {/*end::Symbol*/}
              {/*begin::Stats*/}
              <div className="m-0">
                {/*begin::Number*/}
                <div className="d-flex justify-content-between">
                <div >
                  <span className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                  1500
                </span>
                <span className="text-gray-500 fw-semibold fs-6">Total Orders</span>
                  </div>

                  <div >
                  <span className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                  1450
                </span>
                <span className="text-gray-500 fw-semibold fs-6">Accept</span>
                  </div>

                  <div >
                  <span className="text-gray-700 fw-bolder d-block fs-2qx lh-1 ls-n1 mb-1">
                  50
                </span>
                <span className="text-gray-500 fw-semibold fs-6">Reject</span>
                  </div>
               
                
                
                </div>
                {/*end::Desc*/}
              </div>
              {/*end::Stats*/}
            </div>
            {/*end::Items*/}
          </div>

        </div>
        {/*end::Row*/}
      </div>
      {/*end::Stats*/}
    </div>
    {/*end::Body*/}
  </div>
  )
}

const chartOptions = (
  chartHeight: string,
  chartColor: string,
  strokeColor: string
): ApexOptions => {
  const labelColor = getCSSVariableValue('--kt-gray-500')
  const borderColor = getCSSVariableValue('--kt-gray-200')
  const color = getCSSVariableValue('--kt-' + chartColor)

  return {
    series: [
      {
        name: 'Net Profit',
        data: [30, 45, 32, 70, 40, 40, 40],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: strokeColor,
        opacity: 0.5,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [strokeColor],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 80,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return '$' + val + ' thousands'
        },
      },
      marker: {
        show: false,
      },
    },
    colors: ['transparent'],
    markers: {
      colors: [color],
      strokeColors: [strokeColor],
      strokeWidth: 3,
    },
  }
}

export {MixedWidget2}
