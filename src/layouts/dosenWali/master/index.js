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
import { useContext, useEffect, useRef, useState } from "react";
import MDButton from "components/MDButton";
import { Box, Container, Typography } from "@mui/material";
import CardParent from "components/CardParent";
import ButtonLinkCard from "components/ButtonCardLink";
import Link from "@mui/material/Link";
import { Content } from "context/user-context";
function Tables() {
  const [id, setId] = useState("");
  const { user, setUser } = useContext(Content);

  const { dataMahasiswa, loading_mhs, reload_mhs } = tableMahasiswa({
    header: [
      {
        Header: "mahasiswa",
        accessor: "mahasiswa",
        name: "mahasiswa",
        width: "20%",
        align: "left",
      },
      { Header: "npm", accessor: "npm", name: "npm", align: "left" },
      { Header: "no_hp", accessor: "no_hp", name: "no_hp", align: "center" },
      // { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    link: "mahasiswa/get_data/" + user?.id_jurusan,
    SetID: setId,
    primaryKey: "npm",
  });
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <>
          <CardParent Title={"Data mahasiswa"}>
            {loading_mhs ? (
              <Container>
                <Typography variant={"caption"}>Loading...</Typography>
              </Container>
            ) : (
              <DataTable
                table={{
                  columns: dataMahasiswa["columns"],
                  rows: dataMahasiswa["rows"],
                  ids: dataMahasiswa["id"],
                }}
                isSorted={false}
                DeleteLink={"mahasiswa/delete_mhs"}
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
