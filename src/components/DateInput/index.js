import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { PropTypes } from "prop-types";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect } from "react";
const dateInputProps = {
  name: PropTypes.string,
  id: PropTypes.string,
  labelText: PropTypes.string,
};

const index = (props) => {
  const { name, id, labelText, dateValue, ...rest } = props;
  const style = {
    width: "100%",
    padding: "1px 0",
    overFlow: "hidden",
  };
  const slotProps = {
    id: id,
    name: name,
    label: labelText ? labelText : "",
  };
  const convertDate = (date) => {
    let originalDate = new Date(date);
    return `${originalDate.getFullYear()}-${originalDate.getMonth() + 1}-${originalDate.getDate()}`;
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...rest}
          sx={style}
          slotProps={{
            textField: {
              ...slotProps,
              defaultValue: dayjs(convertDate(dateValue)),
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

index.propTypes = { ...dateInputProps };

export default index;
