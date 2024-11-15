import * as React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GridParent from "components/GridParent";
import CardParent from "components/CardParent";
import GridItems from "components/GridItems";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BtnModal from "components/BtnModal";
import { Col } from "react-bootstrap";
import SelectInput from "components/SelectInput";
import Alert from "@mui/material/Alert";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "request/request";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Typography } from "@mui/material";
import { convertFieldResponseIntoMuiTextFieldProps } from "@mui/x-date-pickers/internals";
import { checkInput } from "request/request";
import { create } from "request/request";
// eslint-disable-next-line react/prop-types
const FormAddJurusan = ({ SetJurusan, HandleClose, Open }) => {
  const [messageError, setMessageError] = React.useState("");
  return (
    <>
      <Dialog
        open={Open}
        onClose={HandleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            let obj = {};
            const formData = new FormData(event.target);
            console.log(formData);
            // const isEmpty = formData.
            let count = 0;
            let inputName = "";
            formData.forEach((val, key) => {
              obj = {
                ...obj,
                [key]: val,
              };
            });
            checkInput({ link: "jurusan/check_input", data: obj })
              .then((res) => {
                SetJurusan((prev) => [
                  ...prev,
                  {
                    ...obj,
                  },
                ]);
                console.log(res);
                HandleClose();
              })
              .catch((err) => {
                setMessageError(err);
                // console.log(err);
              });
          },
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <div style={{ padding: "1em 0" }}>
            {messageError && (
              <Typography variant="body2" sx={{ marginBottom: "28px" }}>
                {messageError}
              </Typography>
            )}
            <GridParent>
              <GridItems>
                <Col md={6} xs={12}>
                  <MDInput name={"id_jurusan"} label="ID Jurusan *" fullWidth />
                </Col>
                <Col md={6} xs={12}>
                  <MDInput name={"jurusan"} label="Nama jurusan *" fullWidth />
                </Col>
              </GridItems>
            </GridParent>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const index = () => {
  const formRef = React.useRef(null);
  const [messageError, setMessageError] = React.useState("");
  const [dataJurusan, setDataJurusan] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let obj = {};
    let column = ["id_jurusan"];
    formData.forEach((val, key) => {
      if (!column.includes(key)) {
        if (val) {
          obj = {
            ...obj,
            [key]: val,
          };
        }
      }
    });
    if (formData.get("id_jurusan")) {
      obj = {
        ...obj,
        id_jurusan: formData.get("id_jurusan").split("-")[0],
        jurusan: formData.get("id_jurusan").split("-")[1],
      };
    }
    console.log(obj);
    create({ link: "prodi/input_jurusan", data: obj })
      .then((res) => {
        create({ link: "prodi/input_prodi", data: obj })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getJurusan = () => {
    getData({ link: "jurusan/get_data" })
      .then((res) => {
        const { data } = res;
        setDataJurusan(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getJurusan();
  }, []);
  return (
    <>
      <FormAddJurusan
        Open={openModal}
        HandleClose={() => {
          setOpenModal(false);
        }}
        Jurusan={dataJurusan}
        SetJurusan={setDataJurusan}
      />
      <DashboardLayout>
        <DashboardNavbar />
        <CardParent Title={"Form edit dosen"}>
          {messageError && (
            <Alert
              severity="error"
              sx={{ marginBottom: "17px" }}
              onClose={() => {
                setMessageError("");
              }}
            >
              {messageError}
            </Alert>
          )}
          {!loading && (
            <form ref={formRef}>
              <GridParent>
                <GridItems>
                  <Col md={4} xs={12}>
                    <MDInput name={"username"} label="Username *" fullWidth />
                  </Col>
                  <Col md={4} xs={12}>
                    <MDInput name={"password"} label="Password" fullWidth />
                  </Col>
                  <Col md={4} xs={12}>
                    <SelectInput
                      Name={"id_jurusan"}
                      Label={"Jurusan *"}
                      Items={[
                        ...dataJurusan.map((x, idx) => {
                          let isDisabled = false;
                          if (x.isExist === "1") isDisabled = true;
                          return {
                            value: x.id_jurusan + "-" + x.jurusan,
                            label: x.jurusan,
                            isDisabled: isDisabled,
                          };
                        }),
                        {
                          label: "Tambah jurusan baru +",
                          handleClick: () => {
                            setOpenModal(true);
                          },
                        },
                      ]}
                    />
                  </Col>
                </GridItems>
                <BtnModal>
                  <MDButton
                    HandleClick={() => {
                      navigate(-1);
                    }}
                    variant="gradient"
                    color="error"
                  >
                    Kembali
                  </MDButton>
                  <MDButton
                    HandleClick={handleSubmit}
                    variant="gradient"
                    color="info"
                    sx={{ marginLeft: "20px" }}
                  >
                    Submit
                  </MDButton>
                </BtnModal>
              </GridParent>
            </form>
          )}
        </CardParent>
        <Footer />
      </DashboardLayout>
    </>
  );
};

export default index;
