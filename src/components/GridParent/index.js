import { Container } from "react-bootstrap";

const index = ({ children }) => {
  return (
    <>
      <Container
        style={{
          display: "flex",
          rowGap: "22px",
          flexDirection: "column",
          alignItems: "",
          padding: "0",
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default index;
