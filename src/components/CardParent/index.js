import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
const index = ({ Title, ButtonComponent, Size = 12, children }) => {
  return (
    <MDBox pt={6} pb={3}>
      <Grid container spacing={6} alignItems={"center"} justifyContent={"center"}>
        <Grid item xs={Size}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              style={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
              }}
            >
              <MDTypography variant="h6" color="white">
                {Title}
              </MDTypography>
              {typeof ButtonComponent !== "undefined" && <ButtonComponent />}
            </MDBox>
            <MDBox py={3} px={3}>
              {children}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default index;
