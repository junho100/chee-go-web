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
        관리자에게 문의하기:{" "}
        <Link
          href="https://open.kakao.com/o/sxsadJVg"
          target="_blank"
          color="inherit"
        >
          https://open.kakao.com/o/sxsadJVg
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
