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
import ButtonLinkCard from "components/ButtonCardLink";
import Link from "@mui/material/Link";
function Tables() {
  const [id, setId] = useState("");
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
    link: "mahasiswa/get_data",
    SetID: setId,
    primaryKey: "npm",
  });

  const { dataDosen, loading_dsn, reload_dsn } = tableDosen({
    header: [
      { Header: "dosen", accessor: "dosen", name: "dosen", width: "40%", align: "left" },
      { Header: "nidn", accessor: "nidn", name: "nidn", align: "left" },
      { Header: "no_hp", accessor: "no_hp", name: "no_hp", align: "center" },
      // { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    link: "dosen/get_data",
    SetID: setId,
    primaryKey: "nidn",
  });

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <>
          <CardParent
            Title={"Data dosen"}
            ButtonComponent={() => {
              return <ButtonLinkCard Text={"Tambah data"} Link={"/master/tambah_dosen"} />;
            }}
          >
            {loading_dsn ? (
              <Container>
                <Typography variant={"caption"}>Loading...</Typography>
              </Container>
            ) : (
              <DataTable
                table={{
                  columns: dataDosen["columns"],
                  rows: dataDosen["rows"],
                  ids: dataDosen["id"],
                }}
                isSorted={false}
                DeleteLink={"dosen/delete_dsn"}
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
              return <ButtonLinkCard Text={"Tambah data"} Link={"/master/tambah_mahasiswa"} />;
            }}
          >
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
