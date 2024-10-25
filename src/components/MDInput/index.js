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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import MDInputRoot from "components/MDInput/MDInputRoot";
import { FormControl, TextField } from "@mui/material";

const MDInput = forwardRef(
  ({ error, success, disabled, Color = "primary", DefaultValue, ...rest }, ref) => (
    <>
      <FormControl fullWidth>
        <TextField {...rest} ref={ref} color={Color} />
      </FormControl>
    </>
  )
);

// Setting default values for the props of MDInput
MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MDInput
MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  Color: PropTypes.string,
  DefaultValue: PropTypes.string,
};

export default MDInput;
