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
import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
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
import Header from "layouts/mahasiswa/transkrip/components/Header";
import PlatformSettings from "layouts/mahasiswa/transkrip/components/PlatformSettings";

// Data
import profilesListData from "layouts/mahasiswa/transkrip/data/profilesListData";
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
import GeneratePDF from "components/GeneratePDF";
import { Box, Stack, Typography } from "@mui/material";
import { Content } from "context/user-context";
import LogoUSTJ from "assets/images/logo-ustj.png";

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

const DataMahasiswa = () => {
  const { user, setUser } = useContext(Content);
  const tanggalLahir = (date) => {
    const a = new Date(date);
    const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    return `${a?.getDate()} ${month[a.getMonth()]}, ${a.getFullYear()}`
  }
  return (
    <>
      <Box sx={{ marginBottom: "16.5px", display: "flex", justifyContent: "space-between", width: "70%" }}>
        <Box>
          <Typography variant={"h6"} sx={{ fontSize: 12.5, lineHeight: 1.10 }}>
            Kemajuan studi
          </Typography>
          <Stack direction={"column"} rowGap={0.5} sx={{ width: "100%", marginTop: "12px" }}>
            <Stack sx={{ width: "320px" }} direction={"row"} justifyContent={"space-between"}>
              <Typography variant={"caption"} sx={{ fontWeight: 600 }}>Nama mahasiswa</Typography>
              <Typography variant={"caption"} sx={{ fontWeight: 600, width: "190px" }}>: {user?.nama}</Typography>
            </Stack>
            <Stack sx={{ width: "320px" }} direction={"row"} justifyContent={"space-between"}>
              <Typography variant={"caption"} sx={{ fontWeight: 600 }}>NPM</Typography>
              <Typography variant={"caption"} sx={{ fontWeight: 600, width: "190px" }}>: {user?.npm}</Typography>
            </Stack>
            <Stack sx={{ width: "320px" }} direction={"row"} justifyContent={"space-between"}>
              <Typography variant={"caption"} sx={{ fontWeight: 600 }}>Tanggal lahir</Typography>
              <Typography variant={"caption"} sx={{ fontWeight: 600, width: "190px" }}>: {tanggalLahir(user?.tanggal_lahir)}</Typography>
            </Stack>
            <Stack sx={{ width: "320px" }} direction={"row"} justifyContent={"space-between"}>
              <Typography variant={"caption"} sx={{ fontWeight: 600 }}>Asal SMA</Typography>
              <Typography variant={"caption"} sx={{ fontWeight: 600, width: "190px" }}>: {user?.asal_sma}</Typography>
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

const TandaTangan = ({ Selected }) => {
  const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
  const getDate = () => {
    const dates = new Date();
    return `${dates.getDate()} ${month[dates.getMonth()]} ${dates.getFullYear()}`
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "80%", }}>
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
                {/* Dosen */}{Selected?.nama_dosen_wali}
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
  const [tanggalKHS, setTanggalKHS] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [nilaiKHS, setNilaiKHS] = useState([]);
  const [dns, setDNS] = useState({})
  const { user } = useContext(Content);
  const [loading, setLoading] = useState(true);
  const matKulRef = useRef("");
  const getKHS = async ({ id_khs }) => {
    try {
      const nilaiKHS = await getData({ link: `mahasiswa/get_nilai_khs/${id_khs}` });
      setNilaiKHS(nilaiKHS.data);
      // console.log(nilaiKHS)
    } catch (err) {
      console.log(err);
    }
  }
  const getTanggalKHS = () => {
    getData({ link: `mahasiswa/get_khs/${Id}` })
      .then((res) => {
        const { data } = res;
        setTanggalKHS(data);
        if (data.length > 0) {
          setSelectedDate(data[0].id_khs);
          getKHS({ id_khs: data[0].id_khs });
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
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

  const showNilai = (id_matkul) => {
    const x = ["A", "B", "C"]
    let result = "-";
    const matKul = nilaiKHS.find(x => {
      return x.id_mata_kuliah === id_matkul
    });
    // console.log(matKul);
    if (matKul) {
      if (x.includes(matKul?.nilai)) {
        result = matKul?.nilai;
      }
    }
    return result
  }
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
  useEffect(() => {
    getTanggalKHS();
    getMataKuliah();
    getDNS();
  }, []);
  useEffect(() => {
    if (tanggalKHS.length > 0) getKHS({ id_khs: selectedDate });
  }, [selectedDate])
  const semester = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <Grid container columnSpacing={4} rowSpacing={2}>
        {semester.map((x) => {
          const matKul = data.filter((y) => {
            return y.semester == x;
          });
          return (
            <>
              <Grid item md={6} sx={{ padding: "1em 0.5em", overflowX: "scroll", overflowY: "hidden" }}>
                <TableContainer d sx={{ width: "100%" }} component={Paper}>
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
                              <StyledTableCell align={"center"}>{tanggalKHS.length === 0 ? "-" : showNilai(item?.id_mata_kuliah)}</StyledTableCell>
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
      </Grid>
    </>
  );
};

function Overview() {
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(Content);

  const matKulRef = useRef("");

  const getSelected = () => {
    getData({ link: `mahasiswa/get_selected_data/${user.npm}` })
      .then((res) => {
        const { data } = res;
        setSelected(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const profileDesc = () => {
    return `
        Hi, I’m ${selected?.nama_depan} ${selected?.nama_belakang}, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).
      `;
  };
  useEffect(() => {
    getSelected();
  }, []);
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
          <FileUpload Open={open} SetOpen={setOpen} Id={user.npm} />
          <Grid container spacing={1}>
            {tabValue === 0 && (
              <>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                  <ProfileInfoCard
                    title="profile information"
                    description={profileDesc()}
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
                    action={{
                      route: `/master/transkrip/edit/${selected.npm}`,
                      tooltip: "Edit Profile",
                    }}
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
          <MDTypography variant="h6" fontWeight="medium">
            Nilai
          </MDTypography>
          <MDBox mb={1}>
            <Stack sx={{ marginTop: "10px" }} direction={"row"} spacing={2}>
              <MDButton
                variant="gradient"
                color="primary"
                HandleClick={() => {
                  console.log("ETE")
                  setOpen(true);
                }}
              >
                Update Nilai
              </MDButton>
              <GeneratePDF Ref={matKulRef} />
            </Stack>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <div ref={matKulRef}>
            <HeaderKemajuanStudi />
            <DataMahasiswa />
            <MataKuliah Id={user.npm} />
            <TandaTangan Selected={selected}/>
          </div>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
