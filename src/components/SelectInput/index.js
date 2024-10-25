const { FormControl, InputLabel, Select, MenuItem } = require("@mui/material");

const index = ({ Name, Label, Items, ...props }) => {
  return (
    <>
      <FormControl sx={{ height: "100%" }} fullWidth>
        {Label && <InputLabel>{Label}</InputLabel>}
        <Select
          size={"medium"}
          sx={{ height: "100%" }}
          {...props}
          name={Name}
          label={Label ? Label : ""}
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
