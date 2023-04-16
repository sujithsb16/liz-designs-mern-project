import { Alert } from "@mui/material";
import React from "react";

const ErrorMessage = ({ severity = "error", children }) => {
  return (
    <div>
      <Alert variant="outlined" severity={severity}>
        {children}
      </Alert>
    </div>
  );
};

export default ErrorMessage;
