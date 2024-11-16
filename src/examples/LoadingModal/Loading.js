import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
const Spinner = () => {
  return <div className="loader"></div>;
};
// eslint-disable-next-line react/prop-types
const Loading = ({ OpenModal, children }) => {
  return (
    <>
      <Modal open={OpenModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner />
          {children && <div style={{ marginTop: "12px" }}>{children}</div>}
        </Box>
      </Modal>
    </>
  );
};

export default Loading;
