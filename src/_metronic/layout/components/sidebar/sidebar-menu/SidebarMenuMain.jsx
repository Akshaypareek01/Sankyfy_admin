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
        to="/team"
        icon={<PeopleIcon style={{ color: "orange", fontSize: "25px" }} />}
        title="Team"
        fontIcon="bi-layers"
      />

<SidebarMenuItem
        to="/client"
        icon={
          <WorkIcon style={{ color: "orange", fontSize: "25px" }} />
        }
        title="Client"
        fontIcon="bi-layers"
      />

   

<SidebarMenuItem
        to="/jobs"
        icon={
          <ShoppingCartIcon style={{ color: "orange", fontSize: "25px" }} />
        }
        title="Jobs"
        fontIcon="bi-layers"
      />

      <SidebarMenuItem
        to="/inventory"
        icon={<CategoryIcon style={{ color: "orange", fontSize: "25px" }} />}
        title="Inventory"
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
