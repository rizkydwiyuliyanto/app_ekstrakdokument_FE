/* eslint-disable react/prop-types */
import * as React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GridParent from "components/GridParent";
import MDButton from "components/MDButton";
import TextArea from "components/TextArea";
import BtnModal from "components/BtnModal";
import SelectInput from "components/SelectInput";
import InputCSV from "components/InputCSV";
import DateInput from "components/DateInput";
import { Col, Stack } from "react-bootstrap";
import {
  HourglassFullRounded,
  ErrorRounded,
  CheckCircleRounded,
  RemoveCircleRounded,
} from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { create } from "request/request";
import { inputFoto } from "request/request";
import CardParent from "components/CardParent";
import { useNavigate, useParams } from "react-router-dom";
import { readCSV } from "request/request";
import { Content } from "context/user-context";
import { inputUser } from "request/request";
import { inputDataUser } from "request/request";
const CSVData = ({ data, setData }) => {
  const formRef = React.useRef([]);
  const refWait = React.useRef([]);
  const refError = React.useRef([]);
  const refSuccess = React.useRef([]);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const { user } = React.useContext(Content);
  const { id_dosen_wali } = useParams();
  const postData = (idx) => {
    let currentIdx = idx;
    const can_continue = (time) => {
      if (currentIdx < formRef.current.length - 1) {
        let timeOut;
        timeOut = setTimeout(() => {
          currentIdx += 1;
          postData(currentIdx);
        }, time);
      } else {
        setBtnDisabled(false);
      }
    };
    if (formRef.current[currentIdx].style.display === "none") {
      can_continue(0);
      return;
    }
    const formData = new FormData(formRef.current[currentIdx]);
    let obj = {
      id_jurusan: user.id_jurusan,
    };
    const dates = ["tanggal_lahir"];
    formData.forEach((val, key) => {
      if (val) {
        obj = {
          ...obj,
          [key]: dates.includes(key) ? new Date(val) : val,
        };
      }
    });
    refWait.current[currentIdx].style.display = "block";
    refError.current[currentIdx].style.display = "none";
    refSuccess.current[currentIdx].style.display = "none";
    const success = () => {
      refWait.current[currentIdx].style.display = "none";
      refSuccess.current[currentIdx].style.display = "flex";
      refSuccess.current[currentIdx].lastElementChild.textContent = "Data berhasil ditambah";
    };
    const failed = (err) => {
      refWait.current[currentIdx].style.display = "none";
      refError.current[currentIdx].style.display = "flex";
      refError.current[currentIdx].lastElementChild.textContent = err;
    };
    inputUser({ data: { ...obj, role: "mahasiswa" } })
      .then((res) => {
        const { id_users } = res;
        inputDataUser({ link: "mahasiswa/input", data: { ...obj, id_users, id_dosen_wali } })
          .then((res) => {
            success();
            can_continue(450);
          })
          .catch((err) => {
            failed(err);
            can_continue(450);
          });
      })
      .catch((err) => {
        failed();
        can_continue(450);
      });
  };
  const deleteData = (idx) => {
    // const index = data.indexOf(idx);
    formRef.current[idx].style.display = "none";
  };
  const handleClick = () => {
    setBtnDisabled(true);
    let idx = 0;
    postData(idx);
  };
  console.log("TEST");
  console.log(user);
  return (
    <>
      <div style={{ overflowX: "scroll", padding: "1em 0", marginBottom: "12px" }}>
        <Stack gap={3}>
          <div style={{ width: "1200px" }}>
            <Stack direction={"horizontal"} gap={3}>
              <Col sm={"1"}>
                <Typography variant={"h6"}>NPM</Typography>
              </Col>
              <Col sm={"2"}>
                <Typography variant={"h6"} align={"center"}>
                  Nama
                </Typography>
              </Col>
              <Col sm={"2"}>
                <Typography variant={"h6"} align={"center"}>
                  Asal SMA
                </Typography>
              </Col>
              <Col sm={"2"}>
                <Typography variant={"h6"} align={"center"}>
                  No.HP
                </Typography>
              </Col>
              <Col sm={"2"}>
                <Typography variant={"h6"}>Tanggal lahir</Typography>
              </Col>
              <Col sm={"2"}>
                <Typography variant={"h6"}>JK</Typography>
              </Col>
              <Col sm={"3"}>
                <Typography variant={"h6"}>Alamat</Typography>
              </Col>
              <Col sm={"2"}>
                <Typography variant={"h6"} align={"center"}>
                  Username
                </Typography>
              </Col>
              <Col sm={"2"}>
                <Typography variant={"h6"} align={"center"}>
                  Password
                </Typography>
              </Col>
            </Stack>
          </div>
          {data.map((x, idx) => {
            return (
              <>
                <form style={{ width: "1200px" }} ref={(el) => (formRef.current[idx] = el)}>
                  <Stack direction={"vertical"} gap={2}>
                    <div
                      onClick={() => {
                        deleteData(idx);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "fit-content",
                        marginRight: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <RemoveCircleRounded color={"error"} />
                      <Typography variant={"caption"} sx={{ marginLeft: "7px" }}>
                        Hapus
                      </Typography>
                    </div>
                    <div>
                      <div
                        style={{ display: "none", alignItems: "center" }}
                        ref={(el) => (refWait.current[idx] = el)}
                      >
                        <HourglassFullRounded />
                      </div>
                      <div
                        style={{ display: "none", alignItems: "center" }}
                        ref={(el) => (refError.current[idx] = el)}
                      >
                        <ErrorRounded />
                        <Typography variant={"caption"} sx={{ marginLeft: "7px" }}></Typography>
                      </div>
                      <div
                        style={{ display: "none", alignItems: "center" }}
                        ref={(el) => (refSuccess.current[idx] = el)}
                      >
                        <CheckCircleRounded />
                        <Typography variant={"caption"} sx={{ marginLeft: "7px" }}></Typography>
                      </div>
                    </div>
                  </Stack>
                  <Stack
                    style={{ alignItems: "flex-start", marginTop: "7px" }}
                    direction={"horizontal"}
                    gap={3}
                  >
                    <Col sm={"1"}>
                      <TextField name={"npm"} defaultValue={x["npm"]} fullWidth />
                    </Col>
                    <Col sm={"2"}>
                      <TextField name={"nama"} defaultValue={x["nama"]} fullWidth />
                    </Col>
                    <Col sm={"2"}>
                      <TextField name={"asal_sma"} defaultValue={x["asal_sma"]} fullWidth />
                    </Col>
                    <Col sm={"2"}>
                      <TextField name={"no_hp"} defaultValue={x["no_hp"]} fullWidth />
                    </Col>
                    <Col sm={"2"}>
                      <DateInput
                        // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                        dateValue={x["tanggal_lahir"]}
                        name={"tanggal_lahir"}
                        id={"tanggal_lahir"}
                      />
                    </Col>
                    <Col sm={"2"}>
                      <SelectInput
                        defaultValue={x["jenis_kelamin"]}
                        style={{ height: "45px", padding: "1em 0" }}
                        // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                        Name={"jenis_kelamin"}
                        Items={[
                          {
                            value: "Laki-laki",
                            label: "Laki-laki",
                          },
                          {
                            value: "Perempuan",
                            label: "Perempuan",
                          },
                        ]}
                      />
                    </Col>
                    <Col sm={"3"}>
                      <TextArea
                        size={"small"}
                        defaultValue={x["alamat"]}
                        Name={"alamat"}
                        fullWidth
                      />
                      {/* <TextField size={"small"} defaultValue={x["alamat"]} fullWidth /> */}
                    </Col>
                    <Col sm={"2"}>
                      <TextField name={"username"} defaultValue={x["npm"] || "123"} fullWidth />
                    </Col>
                    <Col sm={"2"}>
                      <TextField
                        name={"password"}
                        defaultValue={x["password"] || "123"}
                        fullWidth
                      />
                    </Col>
                  </Stack>
                </form>
              </>
            );
          })}
        </Stack>
      </div>
      <GridParent>
        <BtnModal>
          <MDButton
            HandleClick={() => {
              handleClick();
            }}
            disabled={btnDisabled}
            variant="gradient"
            color="info"
            style={{ marginRight: "10px" }}
          >
            Submit
          </MDButton>
          <MDButton
            HandleClick={() => {
              setData([]);
            }}
            variant="gradient"
            color="error"
          >
            Kembali
          </MDButton>
        </BtnModal>
      </GridParent>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const index = ({ ReloadData, HandleClose }) => {
  const messageRef = React.useRef([]);
  const navigate = useNavigate();
  const [csvData, setCSVData] = React.useState([]);
  const [files, setFiles] = React.useState();
  const handleCSV = (e) => {
    const { files, name } = e.target;
    setFiles(files[0]);
  };
  const nextClick = () => {
    const formData = new FormData();
    formData.append("csv", files);
    readCSV({ link: "mahasiswa/read_csv", formData: formData })
      .then((res) => {
        const { data } = res;
        console.log(data);
        setCSVData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <CardParent Title={"Form tambah mahasiswa"}>
          {csvData.length > 0 ? (
            <CSVData data={csvData} setData={setCSVData} />
          ) : (
            <>
              <InputCSV HandleChange={handleCSV} Files={files} Type={".csv"} />
              <GridParent>
                <BtnModal>
                  <MDButton
                    HandleClick={() => {
                      if (files) nextClick();
                    }}
                    variant="gradient"
                    color="info"
                    style={{ marginRight: "10px" }}
                  >
                    Next
                  </MDButton>
                  <MDButton
                    HandleClick={() => {
                      navigate(-1);
                    }}
                    variant="gradient"
                    color="error"
                  >
                    Kembali
                  </MDButton>
                </BtnModal>
              </GridParent>
            </>
          )}
        </CardParent>
        <Footer />
      </DashboardLayout>
    </>
  );
};

export default index;
