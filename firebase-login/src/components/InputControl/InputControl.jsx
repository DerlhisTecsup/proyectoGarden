import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";

export function InputControl(props) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={props.value}
        onChange={props.onChange}
        id="outlined-basic"
        label={props.label}
        type={props.type || "text"}
        variant="outlined"
        size="small"
      />
    </Box>
  );
}
