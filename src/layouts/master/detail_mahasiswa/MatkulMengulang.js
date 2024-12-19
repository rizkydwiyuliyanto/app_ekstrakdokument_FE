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
    getData({ link: `mahasiswa/matkul_mengulang2/${id}` })
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
      id: "periode",
      label: "Periode",
      width: "450px",
    },
    {
      id: "nilai_akhir",
      label: "Nilai akhir",
      width: "100px",
    },
  ];
  function compare(a, b) {
    if (a.periode < b.periode) {
      return -1;
    }
    if (a.periode > b.periode) {
      return 1;
    }
    return 0;
  }

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
                  return (
                    <Stack key={`${idx}`} direction={"column"} rowGap={1}>
                      <table aria-label="simple table">
                        <thead>
                          <tr>
                            {columns.map((itemColumn, idx) => {
                              return (
                                <td style={{ padding: "7px 0" }} key={idx}>
                                  {itemColumn?.label}
                                </td>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {x?.sort(compare)?.map((item) => {
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
