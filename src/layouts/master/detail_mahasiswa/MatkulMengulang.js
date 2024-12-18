import { Button, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { getData } from "request/request";
// eslint-disable-next-line react/prop-types
const MatkulMengulang = ({ open, handleClose, id }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData({ link: `mahasiswa/matkul_mengulang/${id}` })
      .then((res) => {
        const { data } = res;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [open]);
  const columns = [
    {
      id: "id_mata_kuliah",
      label: "Kode matkul",
      width: "150px",
    },
    {
      id: "mata_kuliah",
      label: "Mata kuliah",
      width: "450px",
    },
    {
      id: "nilai_akhir",
      label: "Nilai akhir",
      width: "100px",
    },
  ];
  return (
    <Dialog
      open={open}
      fullScreen={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Mata kuliah mengulang"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {data.length > 0 ? (
            <>
              <Stack direction={"column"} rowGap={3.25} sx={{ padding: "12px" }}>
                {data.map((x, idx) => {
                  const { matkul, tahun, jml_sks, jml_dcp } = x;
                  return (
                    <Stack key={`${idx}`} direction={"column"} rowGap={1}>
                      <Stack
                        sx={{ borderBottom: "1.25px solid #dddddd", padding: "4px 0" }}
                        direction={"column"}
                        rowGap={0.25}
                      >
                        <Stack direction={"row"} columnGap={2.25} justifyContent={"start"}>
                          <Typography variant={"body2"} sx={{ width: "100px" }}>
                            Tahun ajaran
                          </Typography>
                          <Typography variant={"body2"}>: {tahun}</Typography>
                        </Stack>
                        <Stack direction={"row"} columnGap={2.25} justifyContent={"start"}>
                          <Typography variant={"body2"} sx={{ width: "100px" }}>
                            Jumlah SKS
                          </Typography>
                          <Typography variant={"body2"}>: {jml_sks}</Typography>
                        </Stack>
                        <Stack direction={"row"} columnGap={2.25} justifyContent={"start"}>
                          <Typography variant={"body2"} sx={{ width: "100px" }}>
                            Jumlah DCP
                          </Typography>
                          <Typography variant={"body2"}>: {jml_dcp}</Typography>
                        </Stack>
                      </Stack>
                      <table aria-label="simple table">
                        <thead>
                          <tr>
                            {columns.map((x, idx) => {
                              return (
                                <td style={{ padding: "7px 0" }} key={idx}>
                                  {x?.label}
                                </td>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {matkul.map((item) => {
                            return (
                              <>
                                <tr>
                                  {columns.map((y, idx2) => {
                                    return (
                                      <td
                                        style={{ padding: "7px 0px" }}
                                        width={y?.width}
                                        key={idx2}
                                      >
                                        {item[y?.id]}
                                      </td>
                                    );
                                  })}
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </Stack>
                  );
                })}
              </Stack>
            </>
          ) : (
            ""
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Kembali</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MatkulMengulang;
