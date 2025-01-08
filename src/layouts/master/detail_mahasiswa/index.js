/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
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
import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/master/detail_mahasiswa/components/Header";
import PlatformSettings from "layouts/master/detail_mahasiswa/components/PlatformSettings";

// Data
import profilesListData from "layouts/master/detail_mahasiswa/data/profilesListData";
// Images
import { styled } from "@mui/material/styles";
import { getData } from "request/request";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MDButton from "components/MDButton";
import FileUpload from "./FileUpload";
import { Stack, Typography, Box } from "@mui/material";
import LogoUSTJ from "assets/images/logo-ustj.png";
import GeneratePDF from "components/GeneratePDF";
import MatkulMengulang from "./MatkulMengulang";
import { Content } from "context/user-context";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 9,
    padding: "0 12px",
    fontWeight: "700"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const addZero = (x) => {
  if (x < 10) return `0${x}`;
  return x;
}

const PilihTanggal = (props) => {
  const { TanggalKHS, SetSelectedDate, SelectedDate } = props;
  const [idx, setIdx] = useState(0);
  const currentDate = TanggalKHS.find(x => {
    return x.id_khs === SelectedDate
  }).tanggal_masuk;
  const handleChange = (x) => {
    setIdx(prev => prev += x)
  };
  const dateTxt = (x) => {
    const dates = new Date(x);
    return `${dates.getDate()}-${dates.getMonth() + 1}-${dates.getFullYear()}, ${addZero(dates.getHours())}:${addZero(dates.getMinutes())}:${addZero(dates.getSeconds())}`
  }
  useEffect(() => {
    SetSelectedDate(TanggalKHS[idx].id_khs);
  }, [idx]);
  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <MDButton color={"info"} size={"small"} disabled={idx === 0 ? true : false} HandleClick={() => handleChange(-1)}>Back</MDButton>
        <div>
          <Typography variant={"body2"}>{dateTxt(currentDate)}</Typography>
        </div>
        <MDButton color={"info"} size={"small"} disabled={idx === TanggalKHS.length - 1 ? true : false} HandleClick={() => handleChange(1)}>Next</MDButton>
      </div>
    </>
  )
}
const DataMahasiswa = ({ user }) => {
  const tanggalLahir = (date) => {
    const a = new Date(date);
    const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    return `${a?.getDate()} ${month[a.getMonth()]}, ${a.getFullYear()}`
  }
  return (
    <>
      <Typography variant={"body2"} align={"center"} sx={{ fontSize: 15, lineHeight: 1.10, marginBottom: "7px" }}>
        Kemajuan studi
      </Typography>
      <Box sx={{ marginBottom: "16.5px", display: "flex", justifyContent: "space-between", width: "70%" }}>
        <Box>
          <Stack direction={"column"} rowGap={0.5} sx={{ width: "100%", marginTop: "12px" }}>
            <Stack sx={{ width: "320px" }} direction={"row"} justifyContent={"space-between"}>
              <Typography variant={"caption"} sx={{ fontWeight: 600 }}>Nama mahasiswa</Typography>
              <Typography variant={"caption"} sx={{ fontWeight: 600, width: "190px" }}>: {user?.nama_depan + " " + user?.nama_belakang}</Typography>
            </Stack>
            <Stack sx={{ width: "320px" }} direction={"row"} justifyContent={"space-between"}>
              <Typography variant={"caption"} sx={{ fontWeight: 600 }}>NPM</Typography>
              <Typography variant={"caption"} sx={{ fontWeight: 600, width: "190px" }}>: {user?.npm}</Typography>
            </Stack>
            <Stack sx={{ width: "320px" }} direction={"row"} justifyContent={"space-between"}>
              <Typography variant={"caption"} sx={{ fontWeight: 600 }}>Tanggal lahir</Typography>
              <Typography variant={"caption"} sx={{ fontWeight: 600, width: "190px" }}>: {tanggalLahir(user?.tanggal_lahir)}</Typography>
            </Stack>
          </Stack>

        </Box>
        {/* <Box>
          <Typography variant={"body2"} sx={{ lineHeight: "2", fontSize:14,color:"black", fontWight:"700" }}>Program studi: Teknik informatika</Typography>
        </Box> */}
      </Box>
    </>
  )
}

const TandaTangan = () => {
  const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  const getDate = () => {
    const dates = new Date();
    return `${dates.getDate()} ${month[dates.getMonth()]} ${dates.getFullYear()}`
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "80%", marginTop: "22px" }}>
        <Typography sx={{
          fontSize: "14px"
        }}
          variant={"body2"}
        >
          Jayapura, {getDate()}
        </Typography>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "9px",
        width: "80%",
      }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "120px"
          }}>
            <Box>
              <Typography sx={{ textAlign: 'center', fontSize: "14px", lineHeight: "1" }} variant={"body2"}>
                Mengetahui<br />Program Studi Teknik Informatika-S1<br />Ketua,
              </Typography>
            </Box>
            <Box>
              <Typography variant={"body2"} sx={{ fontSize: "14px", textAlign: 'center', fontWeight: "700", textDecoration: "underline", lineHeight: "1" }}>
                {/* Dosen */}RIZKIAL ACHMAD, S.Kom.,M.T
              </Typography>
              <Typography variant={"body2"} sx={{ fontSize: "14px", textAlign: 'center', fontWeight: "700" }}>
                {/* Lektor */}Lektor
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "120px"
          }}>
            <Box>
              <Typography sx={{ textAlign: 'center', fontSize: "14px", lineHeight: "1" }} variant={"body2"}>
                Menyetujui<br />Dosen wali,
              </Typography>
            </Box>
            <Box>
              <Typography variant={"body2"} sx={{ fontSize: "14px", textAlign: 'center', fontWeight: "700", textDecoration: "underline", lineHeight: "1" }}>
                {/* Dosen */}EVANITA VERONICA MANULLANG. S.T.,M.T
              </Typography>
              <Typography variant={"body2"} sx={{ fontSize: "14px", textAlign: 'center', fontWeight: "700" }}>
                {/* Lektor */}Lektor
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

const HeaderKemajuanStudi = () => {
  return (
    <>
      <Box
        sx={{
          marginBottom: "4px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          justifyContent: "center",
          "height": "100px",
          "width": "100%"
        }}>
        <Box sx={{
          position: "absolute",
          left: "0",
          top: "50%",
          transform: "translate(0, -50%)"
        }}>
          <img src={LogoUSTJ} width={"75px"} height={"75px"} alt={"logo"} />
        </Box>
        <Box>
          <Typography sx={{ textAlign: "center", lineHeight: 1.2 }} variant={"h6"}>UNIVERSITAS SAINS DAN TEKNOLOGI JAYAPURA</Typography>
          <Typography sx={{ textAlign: "center", lineHeight: 1.2 }} variant={"h6"}>FAKULTAS ILMU KOMPUTER DAN MANAJEMEN</Typography>
        </Box>
      </Box>
    </>
  )
}
// eslint-disable-next-line react/prop-types
const MataKuliah = ({ Id, SetLinkDownload }) => {
  const [data, setData] = useState([]);
  const { user } = useContext(Content);
  const [nilaiKHS, setNilaiKHS] = useState([]);
  const [dns, setDNS] = useState({})
  const [loading, setLoading] = useState(true);
  const getMataKuliah = () => {
    getData({ link: "mata_kuliah/get_data/" + user?.id_jurusan })
      .then((res) => {
        const { data } = res;
        setData(data);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDNS = () => {
    getData({ link: "dns/mahasiswa/" + Id })
      .then((res) => {
        const { data } = res;
        setDNS(data[0])
        console.log(data)
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const setNilaiKemajuanStudi = async () => {
    try {
      const { data } = await getData({ link: `mahasiswa/nilai_dns?npm=${Id}` });
      console.log(data);
      setNilaiKHS(data);
    } catch (err) {
      console.log(err);
    }
  }

  const showNilai = (id_matkul) => {
    const x = ["A", "B", "C", "D", "E"]
    let result = "-";
    const matKul = nilaiKHS.filter(x => {
      return x.id_mata_kuliah === id_matkul
    });
    // console.log(matKul);
    if (matKul.length > 0) {
      if (x.includes(matKul[0]?.nilai_akhir)) {
        result = matKul[0]?.nilai_akhir;
      }
    }
    return result
  }
  useEffect(() => {
    getMataKuliah();
    setNilaiKemajuanStudi();
    getDNS();
  }, []);
  const semester = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {/* {tanggalKHS.length > 0
          &&
          <Grid item md={12} sx={{ padding: "0em 0.5em" }}>
            <PilihTanggal
              TanggalKHS={tanggalKHS}
              SetSelectedDate={setSelectedDate}
              SelectedDate={selectedDate}
            />
          </Grid>
        } */}
      <Grid container columnSpacing={2} rowSpacing={1}>
        {semester.map((x) => {
          const matKul = data.filter((y) => {
            return y.semester == x;
          });
          return (
            <>
              <Grid item md={6} sx={{ padding: "1em 0em", overflowX: "scroll", overflowY: "hidden" }}>
                <TableContainer sx={{ width: "100%", padding: "0" }} component={Paper}>
                  <Table size={"small"}>
                    <TableBody>
                      <TableRow>
                        <StyledTableCell>Kode mata kuliah</StyledTableCell>
                        <StyledTableCell align="center">Mata kuliah</StyledTableCell>
                        <StyledTableCell align="left">SKS</StyledTableCell>
                        <StyledTableCell align="left">Semester</StyledTableCell>
                        <StyledTableCell align="left">Nilai</StyledTableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      {matKul.map((item) => {
                        return (
                          <>
                            <StyledTableRow>
                              <StyledTableCell>
                                {item?.id_mata_kuliah}
                              </StyledTableCell>
                              <StyledTableCell>{item?.mata_kuliah}</StyledTableCell>
                              <StyledTableCell align={"center"}>{item?.sks}</StyledTableCell>
                              <StyledTableCell align={"center"}>{item?.semester}</StyledTableCell>
                              <StyledTableCell align={"center"}>{nilaiKHS.length > 0 ? showNilai(item?.id_mata_kuliah) : "-"}</StyledTableCell>
                            </StyledTableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </>
          );
        })}
        <Grid item>
          <Stack>
            <Typography variant="body2" style={{ marginBottom: "4px" }}>Komulatif</Typography>
          </Stack>
          <Stack direction={"column"} rowGap={1.5} sx={{ width: "100%" }}>
            <Stack direction={"row"} sx={{ width: "200px" }} justifyContent={"space-between"} columnGap={1.5}>
              <Typography variant={"caption"}>Jumlah DCP</Typography>
              <Typography variant={"caption"} sx={{ width: "60px", fontWeight: "600" }} >: {dns?.jml_dcp_komulatif}</Typography>
            </Stack>
            <Stack direction={"row"} sx={{ width: "200px" }} justifyContent={"space-between"} columnGap={1.5}>
              <Typography variant={"caption"}>Nilai SKS</Typography>
              <Typography variant={"caption"} sx={{ width: "60px", fontWeight: "600" }} >: {dns?.ni_sks_komulatif}</Typography>
            </Stack>
            <Stack direction={"row"} sx={{ width: "200px" }} justifyContent={"space-between"} columnGap={1.5}>
              <Typography variant={"caption"}>Nilai IPK</Typography>
              <Typography variant={"caption"} sx={{ width: "60px", fontWeight: "600" }} >: {dns?.ni_ipk}</Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* <pre>{JSON.stringify(dns, null, 2)}</pre> */}
      </Grid>
    </>
  );
};

function Overview() {
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [linkDownload, setLinkDownload] = useState("");
  const [open, setOpen] = useState(false);
  const [openMatkulMengulang, setOpenMatkulMengulang] = useState(false);
  const { userId } = useParams();
  const matKulRef = useRef("");
  const getSelected = () => {
    getData({ link: `mahasiswa/get_selected_data/${userId}` })
      .then((res) => {
        const { data } = res;
        setSelected(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSelected();
  }, []);
  // `/master/detail_mahasiswa/edit/${selected.npm}`
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header
        Loading={loading}
        SelectedData={selected}
        TabValue={tabValue}
        SetTabValue={setTabValue}
      >
        <MDBox mt={5} mb={3}>
          {/* Form input PDF */}
          <FileUpload Open={open} SetOpen={setOpen} Id={userId} />
          <Grid container spacing={1}>
            {tabValue === 0 && (
              <>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                  <ProfileInfoCard
                    title="profile information"
                    description={""}
                    info={{
                      fullName: `${selected?.nama_depan} ${selected?.nama_belakang}`,
                      mobile: `${selected?.no_hp}`,
                      email: "",
                      location: "Indonesia",
                    }}
                    social={[
                      {
                        link: "https://www.facebook.com/CreativeTim/",
                        icon: <FacebookIcon />,
                        color: "facebook",
                      },
                      {
                        link: "https://twitter.com/creativetim",
                        icon: <TwitterIcon />,
                        color: "twitter",
                      },
                      {
                        link: "https://www.instagram.com/creativetimofficial/",
                        icon: <InstagramIcon />,
                        color: "instagram",
                      },
                    ]}
                    shadow={false}
                  />
                  <Divider orientation="vertical" sx={{ mx: 0 }} />
                </Grid>
              </>
            )}
            {tabValue === 1 && (
              <>
                <Grid item xs={12} xl={6}>
                  <PlatformSettings />
                </Grid>
                <Grid item xs={12} xl={6}>
                  <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
                </Grid>
              </>
            )}
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MatkulMengulang
            open={openMatkulMengulang}
            handleClose={() => { setOpenMatkulMengulang(false) }}
            id={selected?.npm}
          />
          <MDTypography variant="h6" fontWeight="medium">
            Kemajuan Studi
          </MDTypography>
          <MDBox mb={1}>
            <Stack sx={{ marginTop: "10px" }} direction={"row"} spacing={2}>
              <MDBox mb={1}>
                <Stack direction={"row"} spacing={2}>
                  <MDButton
                    variant="gradient"
                    color="primary"
                    HandleClick={() => {
                      console.log("ETE")
                      setOpen(true);
                    }}
                  >
                    Upload DNS
                  </MDButton>
                  <GeneratePDF Ref={matKulRef} />
                  <MDButton
                    variant="gradient"
                    color="primary"
                    HandleClick={() => {
                      setOpenMatkulMengulang(true);
                    }}
                  >
                    Mata kuliah mengulang
                  </MDButton>
                </Stack>
              </MDBox>
            </Stack>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <div ref={matKulRef}>
            <HeaderKemajuanStudi />
            {Object.keys(selected).length > 0 && <DataMahasiswa user={selected} />}
            <MataKuliah Id={userId} SetLinkDownload={setLinkDownload} />
            <TandaTangan />
          </div>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
