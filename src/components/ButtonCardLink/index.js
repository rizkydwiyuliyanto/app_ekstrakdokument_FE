import { NavLink } from "react-router-dom";
import MDButton from "components/MDButton";

const index = ({ Text, Link }) => {
  return (
    <>
      <NavLink to={Link}>
        <MDButton>{Text}</MDButton>
      </NavLink>
    </>
  );
};

export default index;
