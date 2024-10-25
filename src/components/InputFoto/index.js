import imageCompression from "browser-image-compression";
import { TextField } from "@mui/material";
import { useRef, useState } from "react";
const index = ({ Src, Name, Label, ...props }) => {
  const controller = new AbortController();
  const options = {
    maxSizeMB: 5,
    maxWidthOrHeight: 1920,
    alwaysKeepResolution: true,
    useWebWorker: true,
    signal: controller.signal,
  };
  const [image, setImage] = useState(Src);
  const [loading, setLoading] = useState(false);
  const textRef = useRef();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TextField
          {...props}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const { files, name } = e.target;
            const fileUploading = async () => {
              setLoading(true);
              try {
                const compressedFile = await imageCompression(files[0], {
                  ...options,
                  onProgress: (prog) => {
                    textRef.current.innerText = `Loading ${prog}%...`;
                  },
                });
                setLoading(false);
                let uri = URL.createObjectURL(compressedFile);
                setImage(uri);
              } catch (err) {
                console.log(err);
              }
            };
            fileUploading();
          }}
          style={{
            width: "70%",
          }}
          name={Name}
          inputProps={{ accept: "image/*" }}
          type={"file"}
          variant={"outlined"}
          label={Label}
          fullWidth
        />
        <div
          style={{
            width: "25%",
            height: "200px",
            border: "1.7px solid #dddddd",
            borderRadius: "7px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {loading ? (
            <span
              style={{
                marginLeft: "10px",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              ref={textRef}
            ></span>
          ) : (
            <>
              {image && (
                <img
                  alt={`${Label}`}
                  src={image}
                  style={{
                    // marginTop: "15px",
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default index;
