const { FormControl, TextField } = require("@mui/material");

const index = ({ Label, Name, ...rest }) => {
  return (
    <>
      <FormControl fullWidth>
        <TextField {...rest} label={Label ? Label : ""} name={Name} multiline rows={4} fullWidth />
      </FormControl>
    </>
  );
};

export default index;
