import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { readCSV } from "request/request";
import Typography from "@mui/material/Typography";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import InputCSV from "components/InputCSV";
import { create } from "request/request";
import Loading from "examples/LoadingModal/Loading";
const FileUpload = (props) => {
  // eslint-disable-next-line react/prop-types
  const { SetOpen, Open, Id } = props;
  const countRef = React.useRef("");
  const [matKulLeng, setMatkulLeng] = React.useState(0);
  const [files, setFiles] = React.useState();
  const [openModal, setOpenModal] = React.useState(false);
  const handleClose = () => {
    SetOpen(false);
  };
  const handleCSV = (e) => {
    const { files, name } = e.target;
    setFiles(files[0]);
  };
  function generateRandomId(length) {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length); // Generate a random alphanumeric string
  }
  const handleSubmit = async () => {
    try {
      setOpenModal(true);
      SetOpen(false);
      const formData = new FormData();
      formData.append("pdf", files);
      formData.append("npm", Id);
      // eslint-disable-next-line prettier/prettier
      // const cek = await readCSV({ link: "mahasiswa/cek_dns", formData: formData });
      // if (cek.data.result) {
      //   const { npm } = cek.data.result;
      //   if (npm !== Id) {
      //     setOpenModal(false);
      //     let timeOut;
      //     timeOut = setTimeout(() => {
      //       alert("NPM tidak Cocok");
      //     }, 250);
      //     return;
      //   }
      // }
      const hasil_dns = await readCSV({ link: "mahasiswa/ektrak_dns", formData: formData });
      const { link, result } = hasil_dns.data;
      const id_khs = generateRandomId(11);
      const inputKHS = await create({
        link: "mahasiswa/input_dns",
        data: {
          id_dns: id_khs,
          npm: Id,
          file_dns: link,
          ...hasil_dns.data?.resultDNS,
        },
      });
      const { data } = inputKHS;
      setMatkulLeng(result.length);
      let i = 0;
      const postData = (i) => {
        countRef.current.innerText = `${i + 1}`;
        if (i < result.length) {
          create({
            link: "mahasiswa/input_nilai_dns",
            data: {
              id_mata_kuliah: result[i]["KMK"],
              id_dns: id_khs,
              nilai_akhir: result[i]["Nilai Akhir"],
              st_mk: result[i]["ST MK"],
              keterangan: result[i]["Ket"],
            },
          })
            .then((res) => {
              let timeOut;
              timeOut = setTimeout(() => {
                i += 1;
                postData(i);
              }, 350);
            })
            .catch((err) => {
              setOpenModal(false);
              let timeOut;
              timeOut = setTimeout(() => {
                alert(err.response?.data);
              }, 250);
              console.log(err);
            });
        } else {
          setOpenModal(false);
          let timeOut;
          timeOut = setTimeout(() => {
            window.location.reload();
          }, 280);
        }
      };
      postData(i);
    } catch (err) {
      setOpenModal(false);
      let timeOut;
      timeOut = setTimeout(() => {
        alert(err.response?.data);
      }, 250);
      console.log(err);
    }
  };
  return (
    <>
      <Loading OpenModal={openModal}>
        <div style={{ display: "flex", color: "white", justifyContent: "center" }}>
          <Typography ref={countRef}></Typography>
          <Typography sx={{ margin: "0 7px" }}>/</Typography>
          <Typography>{matKulLeng ? matKulLeng : "..."}</Typography>
        </div>
      </Loading>
      <Dialog onClose={handleClose} open={Open}>
        <DialogTitle>Upload DNS</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We will send updates
          occasionally. */}
          </DialogContentText>
          <InputCSV HandleChange={handleCSV} Files={files} Type={".pdf"} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileUpload;
