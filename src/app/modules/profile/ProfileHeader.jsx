/* eslint-disable jsx-a11y/anchor-is-valid */
import {useContext,useState,useEffect} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import {useLocation} from 'react-router-dom'
import UserContext from '../../../Context/UserContext'

const ProfileHeader = () => {
  const location = useLocation();
  const user=JSON.parse(sessionStorage.getItem('User'));
  const {userRole,userData}=useContext(UserContext)
  const role=sessionStorage.getItem('role')
  useEffect(() => {
     console.log("user details in profile header",user);
  }, [])
  
 
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metornic' />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {user && user.name}
                  </a>
                  <a href='#'>
                    <KTSVG
                      path='/media/icons/duotune/general/gen026.svg'
                      className='svg-icon-1 svg-icon-primary'
                    />
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com006.svg'
                      className='svg-icon-4 me-1'
                    />
                    {user && role}
                  </a>
                  
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1'
                    />
                    {user && user.email}
                  </a>
                </div>
              </div>

              {/* <div className='d-flex my-4'>
                <a href='#' className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr012.svg'
                    className='svg-icon-3 d-none'
                  />

                  <span className='indicator-label'>Follow</span>
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                </a>
                <a
                  href='#'
                  className='btn btn-sm btn-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_offer_a_deal'
                >
                  Hire Me
                </a>
                <div className='me-0'>
                  <button
                    className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='top-end'
                  >
                    <i className='bi bi-three-dots fs-3'></i>
                  </button>
                  <Dropdown1 />
                </div>
              </div> */}
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-success me-2'
                      />
                      <div className='fs-2 fw-bolder'>80%</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Contribute</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr065.svg'
                        className='svg-icon-3 svg-icon-danger me-2'
                      />
                      <div className='fs-2 fw-bolder'>75</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Evs</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    {/* <div className='d-flex align-items-center'>
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr066.svg'
                        className='svg-icon-3 svg-icon-success me-2'
                      />
                      {/* <div className='fs-2 fw-bolder'>60%</div> */}
                    {/* </div> */}

                    <div className='fw-bold fs-6 text-gray-400'></div>
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Profile Compleation</span>
                  <span className='fw-bolder fs-6'>50%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{width: '50%'}}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export {ProfileHeader}
