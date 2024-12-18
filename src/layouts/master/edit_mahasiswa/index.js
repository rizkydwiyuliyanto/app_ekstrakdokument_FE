import * as React from "react";
import Modal from "components/Modal";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import GridParent from "components/GridParent";
import GridItems from "components/GridItems";
import CardParent from "components/CardParent";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BtnModal from "components/BtnModal";
import TextArea from "components/TextArea";
import DateInput from "components/DateInput";
import InputFoto from "components/InputFoto";
import { Col } from "react-bootstrap";
import SelectInput from "components/SelectInput";
import Alert from "@mui/material/Alert";
import { inputFoto } from "request/request";
import { getData } from "request/request";
import { edit } from "request/request";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const index = () => {
  const formRef = React.useRef(null);
  const [messageError, setMessageError] = React.useState("");
  const [selected, setSelected] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let obj = {};
    const dates = ["tanggal_lahir"];
    const file = ["foto"];
    let fileFoto = new FormData();
    formData.forEach((val, key) => {
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
    edit({ link: "mahasiswa/edit", data: obj, key: selected["npm"] })
      .then((res) => {
        inputFoto({ link: `mahasiswa/input_foto/${obj.npm}`, formData: fileFoto })
          .then((res) => {
            setMessageError("");
            navigate("/master/detail_mahasiswa/" + obj.npm);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setMessageError(err);
      });
  };
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
  React.useEffect(() => {
    getSelected();
  }, []);
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <CardParent Title={"Form edit mahasiswa"}>
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
                  <Col md={3} xs={12}>
                    {/* https://stackoverflow.com/questions/30792526/defaultvalue-change-does-not-re-render-input */}
                    <MDInput
                      defaultValue={selected?.nama_depan}
                      // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                      name={"nama_depan"}
                      label="Nama depan *"
                      fullWidth
                    />
                  </Col>
                  <Col md={3} xs={12}>
                    <MDInput
                      defaultValue={selected?.nama_belakang}
                      // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                      name={"nama_belakang"}
                      label="Nama belakang"
                      fullWidth
                    />
                  </Col>
                  <Col md={3} xs={12}>
                    <MDInput
                      defaultValue={selected?.npm}
                      // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                      name={"npm"}
                      label="NPM *"
                    />
                  </Col>
                  <Col md={3} xs={12}>
                    <MDInput
                      defaultValue={selected?.password}
                      // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                      name={"password"}
                      label="Password *"
                    />
                  </Col>
                </GridItems>
                <GridItems>
                  <Col md={4} xs={12}>
                    <DateInput
                      // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                      dateValue={selected?.tanggal_lahir}
                      name={"tanggal_lahir"}
                      id={"tanggal_lahir"}
                      labelText={"Tanggal lahir"}
                    />
                  </Col>
                  <Col md={4} xs={12}>
                    <MDInput
                      defaultValue={selected?.no_hp}
                      // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                      name={"no_hp"}
                      label="Nomor HP *"
                      fullWidth
                    />
                  </Col>
                  <Col md={4} xs={12}>
                    <SelectInput
                      defaultValue={selected?.jenis_kelamin}
                      // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
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
                    <InputFoto
                      // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                      Src={selected?.foto}
                      Name={"foto"}
                      Label={"Foto"}
                    />
                  </Col>
                </GridItems>
                <GridItems>
                  <Col>
                    <TextArea
                      defaultValue={selected?.alamat}
                      // key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
                      Name={"alamat"}
                      Label={"Alamat *"}
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
