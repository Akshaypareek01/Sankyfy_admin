import { FC, Suspense, useContext} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'

import UserContext from '../../Context/UserContext'

import {  Inventory } from '../pages/Categories/Inventory'

import { Accounts } from '../pages/Accounts/Accounts'



import { CreateInvoice } from '../pages/Accounts/CreateInvoiceAcc'
import { Invoices } from '../pages/Accounts/Invoices'
import { AllInvoices } from '../pages/Accounts/AllInvoices'
import { UsersAdd } from '../pages/Users/UsersAdd'
import { UserView } from '../pages/Users/UserView'
import { Users } from '../pages/Users/Users'
import { ShopKeeper } from '../pages/ShopKeepers/ShopKeeper'
import { ShopKeeperAdd } from '../pages/ShopKeepers/ShopKeeperAdd'
import { ShopKeeperView } from '../pages/ShopKeepers/ShopKeeperView'
import { Shops } from '../pages/Shops/Shops'
import { ShopAdd } from '../pages/Shops/ShopAdd'
import { ShopsView } from '../pages/Shops/ShopsView'
import { AllShops } from '../pages/AllShops/AllShops'
import { Categories } from '../pages/Categories/Categories'










const PrivateRoutes = () => {
  const {userPermisson}=useContext(UserContext);

  return (
    <Routes>
      <Route element={<MasterLayout />}>
  
        
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
   
        <Route path='dashboard' element={<DashboardWrapper />} />
      
        <Route path='menu-test' element={<MenuTestPage />} />








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
     


<Route
          path='accounts/*'
          element={
            <SuspensedView>
              <Accounts />
            </SuspensedView>
          }
        />


  

<Route
          path='users/*'
          element={
            <SuspensedView>
              <Users />
            </SuspensedView>
          }
        />
        <Route
          path='user_add/*'
          element={
            <SuspensedView>
              <UsersAdd />
            </SuspensedView>
          }
        />

     <Route
          path='user_view/:id/*'
          element={
            <SuspensedView>
              <UserView />
            </SuspensedView>
          }
        />

<Route
          path='shopkeepers/*'
          element={
            <SuspensedView>
              <ShopKeeper />
            </SuspensedView>
          }
        />
        <Route
          path='shopkeepers_add/*'
          element={
            <SuspensedView>
              <ShopKeeperAdd />
            </SuspensedView>
          }
        />

     <Route
          path='shopkeepers_view/:id/*'
          element={
            <SuspensedView>
              <ShopKeeperView />
            </SuspensedView>
          }
        />
        <Route
          path='categories/*'
          element={
            <SuspensedView>
              <Categories />
            </SuspensedView>
          }
        />

<Route
          path='shops/*'
          element={
            <SuspensedView>
              <Shops />
            </SuspensedView>
          }
        />
        <Route
          path='all_shops/*'
          element={
            <SuspensedView>
              <AllShops />
            </SuspensedView>
          }
        />
        <Route
          path='shop_add/*'
          element={
            <SuspensedView>
              <ShopAdd />
            </SuspensedView>
          }
        />

     <Route
          path='shop_view/:id/*'
          element={
            <SuspensedView>
              <ShopsView />
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
