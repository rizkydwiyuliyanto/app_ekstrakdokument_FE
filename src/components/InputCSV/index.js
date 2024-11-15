/* eslint-disable prettier/prettier */
import { Typography } from "@mui/material";
import { useEffect } from "react";

const index = ({ HandleChange, Files, Type }) => {
    return (
        <>
            <div className="file-upload">
                <Typography sx={{ marginBottom: "0px" }} variant={"caption"}>
                    File upload
                </Typography>
                <input
                    type={"file"}
                    accept={Type}
                    onChange={HandleChange}
                    style={{
                        marginBottom: "12px",
                    }}
                    id="upload"
                    hidden
                />
                <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                    <label htmlFor="upload" className="label-file-upload" style={{ marginRight: "9px" }}>
                        Choose file
                    </label>
                    {Files && <Typography variant={"h6"}>{Files?.name}</Typography>}
                </div>
            </div>
        </>
    );
};

export default index;
