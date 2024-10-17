import React from "react";
import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        관리자 이메일:{" "}
        <Link href="mailto:bemodesty306@naver.com" color="inherit">
          bemodesty306@naver.com
        </Link>
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        GitHub:{" "}
        <Link
          href="https://github.com/junho100"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          https://github.com/junho100
        </Link>
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 1 }}
      >
        © CheeGo
      </Typography>
    </Box>
  );
}

export default Footer;
