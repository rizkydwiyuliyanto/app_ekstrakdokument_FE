import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// eslint-disable-next-line react/prop-types
const TextRow = ({ FirstText, SecondText = "", AvatarImage = "", Align = "left" }) => {
  return (
    <>
      <MDBox
        style={{ padding: "0", margin: "0" }}
        display="flex"
        lineHeight={1}
        alignItems="center"
      >
        {AvatarImage && <MDAvatar src={AvatarImage} name={FirstText} size="sm" />}
        <MDBox textAlign={Align} ml={AvatarImage ? 2 : 0} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {FirstText}
          </MDTypography>
          {SecondText && <MDTypography variant="caption">{SecondText}</MDTypography>}
        </MDBox>
      </MDBox>
    </>
  );
};

export default TextRow;
