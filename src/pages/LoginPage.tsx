import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
  Paper,
  InputAdornment,
  IconButton,
  Fade,
  styled,
} from "@mui/material";
import {
  Lock,
  Visibility,
  VisibilityOff,
  Science,
  SatelliteAlt,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthProvider";
import { useState } from "react";
import { passwordPolicy, validatePassword } from "../utils/authPolicy";

const SciGlassCard = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.88)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
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
}));

const validationSchema = yup.object({
  email: yup.string().email("Enter valid email").required("Required"),
  password: yup
    .string()
    .test(
      "password-complexity",
      "Password doesn't meet security requirements",
      (value) => validatePassword(value || "").length === 0,
    )
    .required("Required"),
});

export default function LoginPage() {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await login(values.email, values.password);
        navigate("/dashboard");
      } catch (err) {
        setError("Authentication failed - verify your credentials");
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
        background:
          "radial-gradient(circle at center, #0F2027 0%, #203A43 50%, #2C5364 100%)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        "@keyframes gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "url(/sarao-stars-pattern.svg)",
          opacity: 0.15,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in timeout={800}>
          <SciGlassCard elevation={24}>
            <Box
              sx={{
                p: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <SatelliteAlt
                  sx={{
                    fontSize: 42,
                    color: theme.palette.primary.main,
                  }}
                />
                <Science
                  sx={{
                    fontSize: 42,
                    color: theme.palette.secondary.main,
                  }}
                />
              </Box>

              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  mb: 1,
                  color: theme.palette.primary.dark,
                }}
              >
                RETROSPECTIVE TRACKER
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Research team knowledge management portal
              </Typography>

              {error && (
                <Typography
                  color="error"
                  sx={{
                    width: "100%",
                    p: 1.5,
                    mb: 2,
                    bgcolor: "error.light",
                    borderRadius: 1,
                    textAlign: "center",
                    fontWeight: 500,
                  }}
                >
                  {error}
                </Typography>
              )}

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ width: "100%" }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.7)",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  name="password"
                  label="Access Code"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{ mb: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.7)",
                    },
                  }}
                />

                <Box sx={{ mb: 2, mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Password Requirements:
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      pl: 2,
                      mt: 0.5,
                      "& li": {
                        fontSize: "0.75rem",
                        color: formik.touched.password
                          ? theme.palette.text.secondary
                          : theme.palette.grey[500],
                      },
                    }}
                  >
                    <li>Minimum {passwordPolicy.minLength} characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one number</li>
                    <li>
                      One special character ({passwordPolicy.specialChars})
                    </li>
                  </Box>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: `0 4px 12px ${theme.palette.primary.dark}40`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {isSubmitting ? "VERIFYING CREDENTIALS..." : "AUTHENTICATE"}
                </Button>
              </Box>
            </Box>
          </SciGlassCard>
        </Fade>
      </Container>
    </Box>
  );
}
