import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CardParent from "components/CardParent";
import ButtonLinkCard from "components/ButtonCardLink";
import table from "layouts/admin/dosen_wali/data/table";
import { Container, Typography } from "@mui/material";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
const index = () => {
  const { data, loading, reload } = table({
    header: [
      {
        Header: "dosen",
        accessor: "dosen",
        name: "dosen",
        width: "40%",
        align: "left",
      },
      { Header: "no_hp", accessor: "no_hp", name: "no_hp", align: "left" },
      { Header: "jurusan", accessor: "jurusan", name: "jurusan", align: "left" },
      // { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    link: "dosen_wali/get_data",
  });
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <CardParent
          Title={"Data dosen wali"}
          ButtonComponent={() => {
            return <ButtonLinkCard Text={"Tambah data"} Link={"/dosen_wali/tambah"} />;
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
    </>
  );
};

export default index;
