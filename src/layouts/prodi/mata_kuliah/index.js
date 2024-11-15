/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import CardParent from "components/CardParent";
import ButtonLinkCard from "components/ButtonCardLink";
import Link from "@mui/material/Link";
function Tables() {
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <>
          <CardParent
            Title={"Mata kuliah"}
            ButtonComponent={() => {
              return <ButtonLinkCard Text={"Tambah data"} Link={"/matakuliah/tambah_matakuliah"} />;
            }}
          >
            <p>Hello world</p>
          </CardParent>
        </>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Tables;
