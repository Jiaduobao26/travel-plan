import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import UserProfile from "./UserProfile"; 
import { signInWithGoogle, logout } from "../lib/auth";

export default function Header({ user }) {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Maps + Firebase Demo
        </Typography>
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <UserProfile uid={user.uid} />
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
