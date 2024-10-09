import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          이력서 생성기
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          홈
        </Button>
        <Button color="inherit" component={RouterLink} to="/resume">
          이력서
        </Button>
        <Button color="inherit" component={RouterLink} to="/linkedin">
          링크드인 형식
        </Button>
        <Button color="inherit" component={RouterLink} to="/programmers">
          프로그래머스 형식
        </Button>
        <Button color="inherit" component={RouterLink} to="/wanted">
          원티드 형식
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
