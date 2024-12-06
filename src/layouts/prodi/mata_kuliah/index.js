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

import { useState } from "react";
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
import table from "layouts/prodi/mata_kuliah/data/table";
import CardParent from "components/CardParent";
import ButtonLinkCard from "components/ButtonCardLink";
import Link from "@mui/material/Link";
import { Container, Typography } from "@mui/material";
function Tables() {
  const [id, setId] = useState("");
  const { data, loading, reload } = table({
    header: [
      {
        Header: "Kode matkul",
        accessor: "id_mata_kuliah",
        name: "id_mata_kuliah",
        width: "20%",
        align: "left",
      },
      { Header: "Mata kuliah", accessor: "mata_kuliah", name: "mata_kuliah", align: "left" },
      { Header: "Semester", width: "20%", accessor: "semester", name: "semester", align: "center" },
      { Header: "SKS", width: "20%", accessor: "sks", name: "sks", align: "center" },
      // { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    link: "mata_kuliah/get_data",
    SetID: setId,
    primaryKey: "id_mata_kuliah",
  });
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
            {loading ? (
              <Container>
                <Typography variant={"caption"}>Loading...</Typography>
              </Container>
            ) : (
              <DataTable
                table={{ columns: data["columns"], rows: data["rows"], ids: data["id"] }}
                DeleteLink={"mata_kuliah/delete_matkul"}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                ReloadData={reload}
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
