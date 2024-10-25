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
import tableMahasiswa from "layouts/master/data/tableMahasiswa";
import tableDosen from "layouts/master/data/tableDosen";
import { useEffect, useRef, useState } from "react";
import MDButton from "components/MDButton";
import { Container, Typography } from "@mui/material";
import CardParent from "components/CardParent";
import Link from "@mui/material/Link";
import { useLocation, NavLink } from "react-router-dom";
function Tables() {
  const [id, setId] = useState("");
  const { dataMahasiswa, loading_mhs, reload_mhs } = tableMahasiswa({
    header: [
      { Header: "mahasiswa", accessor: "mahasiswa", width: "40%", align: "left" },
      { Header: "npm", accessor: "npm", align: "left" },
      { Header: "no_hp", accessor: "no_hp", align: "center" },
      // { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    link: "mahasiswa/get_data",
    SetID: setId,
  });

  const { dataDosen, loading_dsn, reload_dsn } = tableDosen({
    header: [
      { Header: "dosen", accessor: "dosen", width: "40%", align: "left" },
      { Header: "nidn", accessor: "nidn", align: "left" },
      { Header: "no_hp", accessor: "no_hp", align: "center" },
      // { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    link: "dosen/get_data",
    SetID: setId,
  });

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <>
          <CardParent
            Title={"Data dosen"}
            ButtonComponent={() => {
              return (
                <NavLink to={"/master/tambah_dosen"}>
                  <MDButton>Tambah data</MDButton>
                </NavLink>
                // <Link href={"/master/form"}>
                //   <MDButton>Tambah data</MDButton>
                // </Link>
              );
            }}
          >
            {loading_dsn ? (
              <Container>
                <Typography variant={"caption"}>Loading...</Typography>
              </Container>
            ) : (
              <DataTable
                table={{ columns: dataDosen["columns"], rows: dataDosen["rows"] }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                ReloadData={reload_dsn}
                noEndBorder
              />
            )}
          </CardParent>
          <CardParent
            Title={"Data mahasiswa"}
            ButtonComponent={() => {
              return (
                <NavLink to={"/master/tambah_mahasiswa"}>
                  <MDButton>Tambah data</MDButton>
                </NavLink>
              );
            }}
          >
            {loading_mhs ? (
              <Container>
                <Typography variant={"caption"}>Loading...</Typography>
              </Container>
            ) : (
              <DataTable
                table={{ columns: dataMahasiswa["columns"], rows: dataMahasiswa["rows"] }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                ReloadData={reload_mhs}
                noEndBorder
              />
            )}
          </CardParent>
        </>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Tables;
