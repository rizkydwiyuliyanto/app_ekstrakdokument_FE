import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { readCSV } from "request/request";
import Typography from "@mui/material/Typography";
import { DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";
import InputCSV from "components/InputCSV";
import { create } from "request/request";
import { getData } from "request/request";

const FileUpload = (props) => {
  // eslint-disable-next-line react/prop-types
  const { SetOpen, Open, Id } = props;
  const [files, setFiles] = React.useState();

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
      const formData = new FormData();
      formData.append("pdf", files);
      formData.append("npm", Id);
      // eslint-disable-next-line prettier/prettier
      const cek = await readCSV({ link: "mahasiswa/cek_transkrip", formData: formData });
      if (cek.data.result) {
        const { npm } = cek.data.result;
        if (npm !== Id) {
          SetOpen(false);
          let timeOut;
          timeOut = setTimeout(() => {
            alert("NPM tidak Cocok");
          }, 250);
          return;
        }
      }
      const nilai_matkul = await readCSV({ link: "mahasiswa/ektrak", formData: formData });
      const { link, result } = nilai_matkul.data;
      const id_khs = generateRandomId(11);
      const inputKHS = await create({
        link: "mahasiswa/input_khs",
        data: {
          id_khs: id_khs,
          npm: Id,
          file_csv: link,
        },
      });
      const { data } = inputKHS;
      let i = 0;
      const postData = (i) => {
        if (i < result.length) {
          create({
            link: "mahasiswa/input_nilai_khs",
            data: {
              id_mata_kuliah: result[i]["Kode matkul"],
              id_khs: id_khs,
              nilai: result[i]["Nilai akhir"],
            },
          })
            .then((res) => {
              let timeOut;
              timeOut = setTimeout(() => {
                console.log(i);
                i += 1;
                postData(i);
              }, 350);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          SetOpen(false);
        }
      };
      postData(i);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog onClose={handleClose} open={Open}>
      <DialogTitle>Upload Transkrip nilai</DialogTitle>
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
  );
};

export default FileUpload;
