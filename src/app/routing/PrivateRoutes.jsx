import { FC, Suspense, useContext} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'

import UserContext from '../../Context/UserContext'

import {  Client } from '../pages/ManageB2BUsers/Client'

import {  ClientAdd } from '../pages/ManageB2BUsers/ClientAdd'
import { Team } from '../pages/Vendors/Team'
import { Rates } from '../pages/Rates/Rates'
import { Orders } from '../pages/Orders/Orders'
import {  Inventory } from '../pages/Categories/Inventory'


import { Accounts } from '../pages/Accounts/Accounts'
import { Users } from '../pages/Users/Users'
import {  ViewInventory } from '../pages/Categories/ViewInventory'

import { AddTeam } from '../pages/Vendors/AddTeam'
import { TeamView } from '../pages/Vendors/TeamView'
import { B2BOrders } from '../pages/Orders/B2BOrders'
import { AddB2BOrder } from '../pages/Orders/AddB2BOrder'
import { AddUsers } from '../pages/Users/AddUsers'
import { AddOrder } from '../pages/Orders/AddOrders'

import { ClientView } from '../pages/ManageB2BUsers/ClientView'
import { CreateInvoice } from '../pages/Accounts/CreateInvoiceAcc'
import { Invoices } from '../pages/Accounts/Invoices'
import { AllInvoices } from '../pages/Accounts/AllInvoices'










const PrivateRoutes = () => {
  const {userPermisson}=useContext(UserContext);

  return (
    <Routes>
      <Route element={<MasterLayout />}>
  
        
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
   
        <Route path='dashboard' element={<DashboardWrapper />} />
      
        <Route path='menu-test' element={<MenuTestPage />} />
     
       
        <Route
          path='team/*'
          element={
            <SuspensedView>
              <Team />
            </SuspensedView>
          }
        />

<Route
          path='team/add/*'
          element={
            <SuspensedView>
              <AddTeam />
            </SuspensedView>
          }
        />
        <Route
          path='team/view/:id'
          element={
            <SuspensedView>
              <TeamView />
            </SuspensedView>
          }
        />

{/* <Route
          path='rates/*'
          element={
            <SuspensedView>
              <Rates />
            </SuspensedView>
          }
        /> */}

<Route
          path='orders/*'
          element={
            <SuspensedView>
              <Orders />
            </SuspensedView>
          }
        />
        <Route
          path='orders/add/*'
          element={
            <SuspensedView>
              <AddOrder />
            </SuspensedView>
          }
        />
        <Route
          path='jobs/*'
          element={
            <SuspensedView>
              <B2BOrders />
            </SuspensedView>
          }
        />
        <Route
          path='jobs/add/*'
          element={
            <SuspensedView>
              <AddB2BOrder />
            </SuspensedView>
          }
        />

<Route
          path='inventory/*'
          element={
            <SuspensedView>
              <Inventory />
            </SuspensedView>
          }
        />

<Route
          path='inventory/view-categorie/:id'
          element={
            <SuspensedView>
              <ViewInventory />
            </SuspensedView>
          }
        />

{/* <Route
          path='sales/*'
          element={
            <SuspensedView>
              <Sales />
            </SuspensedView>
          }
        /> */}
        <Route
          path='accounts/create-invoice/*'
          element={
            <SuspensedView>
              <CreateInvoice />
            </SuspensedView>
          }
        />

<Route
          path='accounts/invoice-view/*'
          element={
            <SuspensedView>
              < AllInvoices/>
            </SuspensedView>
          }
        />
        <Route
          path='accounts/invoice-view/view/:id'
          element={
            <SuspensedView>
              <Invoices />
            </SuspensedView>
          }
        />
     
     
      
        {/* <Route
          path='sales/sales-view/*'
          element={
            <SuspensedView>
              <SalesView />
            </SuspensedView>
          }
          /> */}
          {/* <Route
          path='sales/sales-view/view/:id'
          element={
            <SuspensedView>
              <Invoices />
            </SuspensedView>
          }
          /> */}
{/* 
<Route
          path='plans/*'
          element={
            <SuspensedView>
              <Plans />
            </SuspensedView>
          }
        /> */}

<Route
          path='accounts/*'
          element={
            <SuspensedView>
              <Accounts />
            </SuspensedView>
          }
        />

{/* <Route
          path='users/*'
          element={
            <SuspensedView>
              <Users />
            </SuspensedView>
          }
        />

<Route
          path='users/users_add/*'
          element={
            <SuspensedView>
              <AddUsers />
            </SuspensedView>
          }
        /> */}
  

<Route
          path='client/*'
          element={
            <SuspensedView>
              <Client />
            </SuspensedView>
          }
        />
        <Route
          path='client_add/*'
          element={
            <SuspensedView>
              <ClientAdd />
            </SuspensedView>
          }
        />

     <Route
          path='client_view/:id/*'
          element={
            <SuspensedView>
              <ClientView />
            </SuspensedView>
          }
        />






        {/* Page Not Found /error/404 */}

        <Route path='*' element={<Navigate to='/' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
