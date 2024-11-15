/* eslint-disable react/prop-types */
import * as React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GridParent from "components/GridParent";
import MDButton from "components/MDButton";
import BtnModal from "components/BtnModal";
import InputCSV from "components/InputCSV";
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
import { useNavigate } from "react-router-dom";
import { readCSV } from "request/request";
import { Content } from "context/user-context";

const CSVData = ({ data, setData }) => {
  const formRef = React.useRef([]);
  const refWait = React.useRef([]);
  const refError = React.useRef([]);
  const refSuccess = React.useRef([]);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const { user } = React.useContext(Content);
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
    formData.forEach((val, key) => {
      if (val) {
        obj = {
          ...obj,
          [key]: val,
        };
      }
    });
    refWait.current[currentIdx].style.display = "block";
    refError.current[currentIdx].style.display = "none";
    refSuccess.current[currentIdx].style.display = "none";
    create({ link: "mata_kuliah/input", data: obj })
      .then((res) => {
        refWait.current[currentIdx].style.display = "none";
        refSuccess.current[currentIdx].style.display = "flex";
        refSuccess.current[currentIdx].lastElementChild.textContent = "Data berhasil ditambah";
        can_continue(450);
      })
      .catch((err) => {
        refWait.current[currentIdx].style.display = "none";
        refError.current[currentIdx].style.display = "flex";
        refError.current[currentIdx].lastElementChild.textContent = err;
        can_continue(450);
        // setMessageError(err);
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
  return (
    <>
      <div style={{ overflowX: "scroll", padding: "1em 0", marginBottom: "12px" }}>
        <Stack gap={3}>
          <div style={{ width: "1200px" }}>
            <Stack direction={"horizontal"} gap={3}>
              <Col sm={"3"}>
                <Typography variant={"h6"}>ID Matakuliah</Typography>
              </Col>
              <Col sm={"3"}>
                <Typography variant={"h6"} align={"center"}>
                  Mata kuliah
                </Typography>
              </Col>
              <Col sm={"3"}>
                <Typography variant={"h6"} align={"center"}>
                  Semester
                </Typography>
              </Col>
              <Col sm={"3"}>
                <Typography variant={"h6"} align={"center"}>
                  SKS
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
                    <Col sm={"3"}>
                      <TextField
                        name={"id_mata_kuliah"}
                        defaultValue={x["id_mata_kuliah"]}
                        fullWidth
                      />
                    </Col>
                    <Col sm={"3"}>
                      <TextField name={"mata_kuliah"} defaultValue={x["mata_kuliah"]} fullWidth />
                    </Col>
                    <Col sm={"3"}>
                      <TextField name={"semester"} defaultValue={x["semester"]} fullWidth />
                    </Col>
                    <Col sm={"3"}>
                      <TextField name={"sks"} defaultValue={x["sks"]} fullWidth />
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
  const formRef = React.useRef("");
  const handleCSV = (e) => {
    const { files, name } = e.target;
    setFiles(files[0]);
  };
  const nextClick = () => {
    const formData = new FormData();
    formData.append("csv", files);
    readCSV({ link: "mata_kuliah/read_csv", formData: formData })
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
        <CardParent Title={"Form tambah matakuliah"}>
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
