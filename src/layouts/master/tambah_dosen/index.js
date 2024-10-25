import * as React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GridParent from "components/GridParent";
import GridItems from "components/GridItems";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BtnModal from "components/BtnModal";
import TextArea from "components/TextArea";
import { Col } from "react-bootstrap";
import InputFoto from "components/InputFoto";
import SelectInput from "components/SelectInput";
import DateInput from "components/DateInput";
import { Alert } from "@mui/material";
import { create } from "request/request";
import { inputFoto } from "request/request";
import CardParent from "components/CardParent";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const index = ({ ReloadData, HandleClose }) => {
  const formRef = React.useRef(null);
  const [messageError, setMessageError] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let obj = {};
    const dates = ["tanggal_lahir"];
    const file = ["foto"];
    let fileFoto = new FormData();
    formData.forEach((val, key) => {
      console.log(val);
      if (val) {
        if (file.includes(key)) {
          fileFoto.append(key, val);
        } else {
          obj = {
            ...obj,
            [key]: dates.includes(key) ? new Date(val) : val,
          };
        }
      }
    });
    create({ link: "dosen/input", data: obj })
      .then((res) => {
        inputFoto({ link: `dosen/input_foto/${obj.nidn}`, formData: fileFoto })
          .then((res) => {
            setMessageError("");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setMessageError(err);
      });
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <CardParent Title={"Form tambah dosen"}>
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
          <form ref={formRef}>
            <GridParent>
              <GridItems>
                <Col md={4} xs={12}>
                  {/* https://stackoverflow.com/questions/30792526/defaultvalue-change-does-not-re-render-input */}
                  <MDInput name={"nama_depan"} label="Nama depan *" fullWidth />
                </Col>
                <Col md={4} xs={12}>
                  <MDInput name={"nama_belakang"} label="Nama belakang" fullWidth />
                </Col>
                <Col md={4} xs={12}>
                  <MDInput name={"nidn"} label="NIDN *" />
                </Col>
              </GridItems>
              <GridItems>
                <Col md={4} xs={12}>
                  <DateInput
                    dateValue={new Date()}
                    name={"tanggal_lahir"}
                    id={"tanggal_lahir"}
                    labelText={"Tanggal lahir"}
                  />
                </Col>
                <Col md={4} xs={12}>
                  <MDInput name={"no_hp"} label="Nomor HP *" fullWidth />
                </Col>
                <Col md={4} xs={12}>
                  <SelectInput
                    Name={"jenis_kelamin"}
                    Label={"Jenis kelamin *"}
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
              </GridItems>
              <GridItems>
                <Col>
                  <InputFoto Src={""} Name={"foto"} Label={"Foto"} />
                </Col>
              </GridItems>
              <GridItems>
                <Col>
                  <TextArea Name={"alamat"} Label={"Alamat *"} />
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
        </CardParent>
        <Footer />
      </DashboardLayout>
    </>
  );
};

export default index;
