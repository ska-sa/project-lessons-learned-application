// src/pages/LoginPage.tsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const res = await api.post("/auth/login", values);
        dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
        navigate("/dashboard");
      } catch (err: any) {
        setError(err.response?.data?.message || "Authentication failed");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #1976d2, #2196f3)",
        p: 3,
      }}
    >
      <Box
        sx={{
          background: "white",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          SARAO Login
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="SARAO Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Access Code"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ mt: 3 }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Authenticate"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
