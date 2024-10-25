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

import { useContext, useRef, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import RadioInput from "components/RadioInput";
import GridParent from "components/GridParent";
import GridItems from "components/GridItems";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import CoverLayout from "../components/CoverLayout";
import { Col, Row } from "react-bootstrap";
import { signIn } from "request/request";
import { Content } from "context/user-context";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import privateRoutes from "private_routes";

const changeRoute = (role) => {
  let { route } = privateRoutes.find((x) => {
    return x.role === role;
  });
  return route;
};

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const { user, setUser } = useContext(Content);
  const formRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleClick = () => {
    const formData = new FormData(formRef.current);
    let obj;
    formData.forEach((val, key) => {
      if (val) {
        obj = {
          ...obj,
          [key]: val,
        };
      }
    });
    signIn({ link: "auth/sign-in", data: obj })
      .then((res) => {
        if (res) {
          setUser(res.data);
          navigate(changeRoute(obj?.role));
        } else {
          console.log("Login Gagal");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (user?.role) {
    return <Navigate to={changeRoute(user?.role)} replace state={{ from: location }} />;
  }
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white">
            Sign in
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" ref={formRef}>
            <GridParent>
              <GridItems>
                <Col md={6} xs={12}>
                  <MDInput type="text" name={"username"} label="Username" fullWidth />
                </Col>
                <Col md={6} xs={12}>
                  <MDInput type="password" name={"password"} label="Password" fullWidth />
                </Col>
              </GridItems>
              <GridItems>
                <Col md={12}>
                  <RadioInput
                    Label={"Role"}
                    Name={"role"}
                    Items={[
                      {
                        value: "prodi",
                        label: "Prodi",
                      },
                      {
                        value: "admin",
                        label: "Admin",
                      },
                    ]}
                  />
                </Col>
              </GridItems>
            </GridParent>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton HandleClick={handleClick} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Basic;
