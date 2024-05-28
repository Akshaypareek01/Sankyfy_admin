import { useIntl } from "react-intl";
import { SidebarMenuItem } from "./SidebarMenuItem";
import PeopleIcon from "@mui/icons-material/People";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WorkIcon from '@mui/icons-material/Work';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MapIcon from '@mui/icons-material/Map';
const SidebarMenuMain = () => {
  // const {userPermisson}=useContext(UserContext);
  const userPermisson = JSON.parse(sessionStorage.getItem("userPermisson"));
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon={<WidgetsIcon style={{ color: "orange", fontSize: "25px" }} />}
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      />


<SidebarMenuItem
        to="/users"
        icon={
          <PeopleIcon style={{ color: "orange", fontSize: "25px" }} />
        }
        title="Users"
        fontIcon="bi-layers"
      />

<SidebarMenuItem
        to="/shopkeepers"
        icon={
          <AddBusinessIcon style={{ color: "orange", fontSize: "25px" }} />
        }
        title="Shop Owners"
        fontIcon="bi-layers"
      />

<SidebarMenuItem
        to="/shops"
        icon={
          <ShoppingBasketIcon style={{ color: "orange", fontSize: "25px" }} />
        }
        title="Shops"
        fontIcon="bi-layers"
      />

<SidebarMenuItem
        to="/all_shops"
        icon={
          <MapIcon style={{ color: "orange", fontSize: "25px" }} />
        }
        title="Map"
        fontIcon="bi-layers"
      />



  

      <SidebarMenuItem
        to="/accounts"
        icon={
          <ManageAccountsIcon style={{ color: "orange", fontSize: "25px" }} />
        }
        title="Accounts"
        fontIcon="bi-layers"
      />



     
    </>
  );
};

export { SidebarMenuMain };
