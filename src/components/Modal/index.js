import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";

// eslint-disable-next-line react/prop-types
const index = ({ OpenModal, HandleClose, Title, children }) => {
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ zIndex: "1200" }}
        show={OpenModal}
        onHide={HandleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={HandleClose}>Close</Button>
        </Modal.Footer> */}
      </Modal>
      {/* <React.Fragment>
        <Dialog
          open={OpenModal}
          fullScreen
          TransitionComponent={Transition}
          keepMounted
          onClose={HandleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            sx={{
              color: "#798289",
            }}
          >
            {Title}
          </DialogTitle>
          <DialogContent
            sx={{
              color: "#798289",
            }}
          >
            {children}
          </DialogContent>
        </Dialog>
      </React.Fragment> */}
    </>
  );
};

export default index;
