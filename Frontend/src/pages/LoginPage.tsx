// src/pages/LoginPage.tsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Tabs,
  Tab,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Link,
  Alert,
  Snackbar,
  useTheme,
  BoxProps
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Check as CheckIcon
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

// SciGlassCard Component
const SciGlassCard: React.FC<{ children: React.ReactNode; sx?: BoxProps["sx"] }> = ({ children, sx = {} }) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        background: "rgba(255, 255, 255, 0.88)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: `0 8px 32px ${theme.palette.primary.dark}20`,
        borderRadius: "24px",
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        },
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};

// Validation Schemas
const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string()
    .min(12, "Must be at least 12 characters")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[\W_]/, "Must contain a special character")
    .required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    formikRegister.setFieldValue("password", password);
    
    setPasswordRequirements({
      length: password.length >= 12,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[\W_]/.test(password),
    });
  };

  // Login form
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const res = await api.post("/auth/login", values);
        dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
        navigate("/dashboard");
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Authentication failed");
        } else {
          setError("Authentication failed");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Registration form
  const formikRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const res = await api.post("/auth/register", values);
        dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
        navigate("/dashboard");
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Registration failed");
        } else {
          setError("Registration failed");
        }
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
        background: "linear-gradient(135deg, #1976d2 30%, #2196f3 90%)",
        p: 3,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
          transform: "rotate(25deg)",
          animation: "rotate 20s linear infinite",
          zIndex: 0,
        },
        "@keyframes rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          position: "relative",
          zIndex: 1,
        }}
      >
        <SciGlassCard
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
          }}
        >
          {/* Logo/Title */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "primary.light",
                color: "primary.contrastText",
                mb: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <img 
                src="/sarao-logo.svg" 
                alt="SARAO Logo" 
                style={{ width: 32, height: 32 }} 
              />
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              SARAO Project Portal
            </Typography>
            <Typography color="text.secondary">
              {tabValue === 0 ? "Welcome back! Please log in" : "Create your account"}
            </Typography>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              centered
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                }
              }}
            >
              <Tab icon={<PersonIcon />} label="Login" />
              <Tab icon={<LockIcon />} label="Register" />
            </Tabs>
          </Box>

          {/* Error Message */}
          {error && (
            <Box sx={{ mb: 3 }}>
              <Alert severity="error" onClose={() => setError("")}>
                {error}
              </Alert>
            </Box>
          )}

          {/* Login Form */}
          {tabValue === 0 && (
            <form onSubmit={formikLogin.handleSubmit}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="SARAO Email"
                margin="normal"
                variant="outlined"
                value={formikLogin.values.email}
                onChange={formikLogin.handleChange}
                error={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
                helperText={formikLogin.touched.email && formikLogin.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="password">Access Code</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  label="Access Code"
                  type={showPassword ? "text" : "password"}
                  value={formikLogin.values.password}
                  onChange={formikLogin.handleChange}
                  error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formikLogin.touched.password && formikLogin.errors.password && (
                  <FormHelperText error>
                    {formikLogin.errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3, py: 1.5 }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Authenticate"}
              </Button>
            </form>
          )}

          {/* Registration Form */}
          {tabValue === 1 && (
            <form onSubmit={formikRegister.handleSubmit}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                margin="normal"
                variant="outlined"
                value={formikRegister.values.name}
                onChange={formikRegister.handleChange}
                error={formikRegister.touched.name && Boolean(formikRegister.errors.name)}
                helperText={formikRegister.touched.name && formikRegister.errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                margin="normal"
                variant="outlined"
                value={formikRegister.values.email}
                onChange={formikRegister.handleChange}
                error={formikRegister.touched.email && Boolean(formikRegister.errors.email)}
                helperText={formikRegister.touched.email && formikRegister.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formikRegister.values.password}
                  onChange={handlePasswordChange}
                  error={formikRegister.touched.password && Boolean(formikRegister.errors.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formikRegister.touched.password && formikRegister.errors.password && (
                  <FormHelperText error>
                    {formikRegister.errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  value={formikRegister.values.confirmPassword}
                  onChange={formikRegister.handleChange}
                  error={formikRegister.touched.confirmPassword && Boolean(formikRegister.errors.confirmPassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formikRegister.touched.confirmPassword && formikRegister.errors.confirmPassword && (
                  <FormHelperText error>
                    {formikRegister.errors.confirmPassword}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Password Requirements */}
              <Box sx={{ mt: 1, mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Password must contain:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mt: 0.5 }}>
                  {[
                    { label: "At least 12 characters", met: passwordRequirements.length },
                    { label: "One lowercase letter", met: passwordRequirements.lowercase },
                    { label: "One uppercase letter", met: passwordRequirements.uppercase },
                    { label: "One number", met: passwordRequirements.number },
                    { label: "One special character", met: passwordRequirements.special },
                  ].map((req, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          backgroundColor: req.met ? "success.main" : "transparent",
                          border: req.met ? "none" : "1px solid",
                          borderColor: req.met ? "success.main" : "text.secondary",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {req.met && <CheckIcon fontSize="small" sx={{ color: "white" }} />}
                      </Box>
                      <Typography variant="caption" color={req.met ? "success.main" : "text.secondary"}>
                        {req.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 2, py: 1.5 }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Create Account"}
              </Button>
            </form>
          )}

          {/* Footer */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Link
              href="#"
              variant="body2"
              color="text.secondary"
              onClick={(e) => e.preventDefault()}
              sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              Need help?
            </Link>
          </Box>
        </SciGlassCard>

        {/* Footer Text */}
        <Box sx={{ textAlign: "center", mt: 2, color: "white" }}>
          <Typography variant="body2">
            {tabValue === 0 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <Link
              component="button"
              type="button"
              onClick={() => setTabValue(tabValue === 0 ? 1 : 0)}
              sx={{ 
                color: "inherit", 
                textDecoration: "underline",
                fontWeight: 500,
                ml: 0.5
              }}
            >
              {tabValue === 0 ? "Register here" : "Sign in"}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
