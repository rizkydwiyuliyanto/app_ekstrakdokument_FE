const { Col, Row } = require("react-bootstrap");

const index = ({ children }) => {
  return (
    <>
      <Row style={{ rowGap: "22px" }}>{children}</Row>
    </>
  );
};

export default index;
