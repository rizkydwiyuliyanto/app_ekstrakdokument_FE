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

import ButtonLinkCard from "components/ButtonCardLink";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import tableProdi from "layouts/admin/prodi/data/tableProdi";
import { Container, Typography } from "@mui/material";
import CardParent from "components/CardParent";

function Tables() {
  const { data, loading, reload } = tableProdi({
    header: [
      { Header: "jurusan", accessor: "jurusan", name: "jurusan.jurusan", align: "left" },
      {
        Header: "username",
        accessor: "username",
        name: "prodi.username",
        width: "40%",
        align: "center",
      },
      { Header: "password", accessor: "password", name: "prodi.password", align: "left" },
      // { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    link: "prodi/get_data",
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CardParent
        Title={"Data prodi"}
        ButtonComponent={() => {
          return (
            <ButtonLinkCard Text={"Tambah data"} Link={"/prodi/tambah"} />
            // <Link href={"/master/form"}>
            //   <MDButton>Tambah data</MDButton>
            // </Link>
          );
        }}
      >
        {loading ? (
          <Container>
            <Typography variant={"caption"}>Loading...</Typography>
          </Container>
        ) : (
          <DataTable
            table={{ columns: data["columns"], rows: data["rows"] }}
            ReloadData={reload}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
        )}
      </CardParent>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
