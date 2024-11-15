import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
const ButtonMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 0),
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

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
            let isDisabled = false;
            if (x?.isDisabled !== undefined) isDisabled = x?.isDisabled;
            if (x?.handleClick === undefined) {
              return (
                <MenuItem disabled={isDisabled} key={idx + 1} value={x.value}>
                  {x.label}
                </MenuItem>
              );
            } else {
              return (
                <ButtonMenuItem onClick={x?.handleClick} key={idx + 1}>
                  {x.label}
                </ButtonMenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default index;
