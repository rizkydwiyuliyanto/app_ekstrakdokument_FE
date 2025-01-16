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
import { useNavigate } from "react-router-dom";
import { getData } from "request/request";
import { inputUser } from "request/request";
import { inputDataUser } from "request/request";
// eslint-disable-next-line react/prop-types

// eslint-disable-next-line react/prop-types
const index = () => {
  const formRef = React.useRef(null);
  const [messageError, setMessageError] = React.useState("");
  const [dataDosen, setDataDosen] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let obj = { role: "dosen wali" };
    formData.forEach((val, key) => {
      if (val) {
        obj = {
          ...obj,
          [key]: val,
        };
      }
    });
    setButtonDisabled(true);
    inputUser({ data: obj })
      .then((res) => {
        const { id_users } = res;
        inputDataUser({ link: "dosen_wali/input", data: { ...obj, id_users } })
          .then((res) => {
            alert("Input data berhasil");
            setButtonDisabled(false);
            setTimeout(() => {
              navigate("/dosen_wali");
            });
          })
          .catch((err) => {
            alert(err);
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getJurusan = () => {
    getData({ link: "dosen/get_data/x" })
      .then((res) => {
        const { data } = res;
        setDataDosen(data);
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
      <DashboardLayout>
        <DashboardNavbar />
        <CardParent Title={"Form tambah dosen wali"}>
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
                      Name={"nidn"}
                      Label={"Dosen *"}
                      Items={[
                        ...dataDosen.map((x) => {
                          return {
                            value: x?.nidn,
                            label: x?.nama + x?.jurusan,
                          };
                        }),
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
