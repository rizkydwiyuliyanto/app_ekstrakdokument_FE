import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const index = ({ Label, Items, Name }) => {
  return (
    <>
      <FormControl sx={{ height: "40px" }} fullWidth>
        <InputLabel sx={{ height: "100%" }} id="demo-simple-select-label">
          {Label}
        </InputLabel>
        <Select
          name={Name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={Label}
          sx={{ height: "100%" }}
        >
          {Items.map((x, idx) => {
            return (
              <MenuItem key={idx + 1} value={x.value}>
                {x.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default index;
