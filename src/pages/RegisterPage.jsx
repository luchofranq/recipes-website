// src/pages/RegisterPage.jsx
import { useState, useEffect } from "react";
import { Grid,TextField, Button, Typography, Container, Box, CircularProgress, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Para redirigir al login tras el registro
import { validateEmail, validatePassword, validateConfirmPassword, getPasswordStrength } from "../utils/validation"; // Funciones de validación

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga para el botón
  const [showPassword, setShowPassword] = useState(false); // Para mostrar/ocultar la contraseña
  const [passwordStrength, setPasswordStrength] = useState(0); // Fortaleza de la contraseña
  const navigate = useNavigate(); // Para redirigir al Login después del registro

  // Limpiar error al cambiar el valor de los campos
  useEffect(() => {
    setError(""); 
  }, [email, password, confirmPassword]);

  // Actualizar la fortaleza de la contraseña cuando se cambia
  useEffect(() => {
    setPasswordStrength(getPasswordStrength(password));
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Activar el estado de carga

    // Validación de campos
    if (!email || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    // Validar email
    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      setLoading(false);
      return;
    }

    // Validar contraseña
    if (!validatePassword(password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.");
      setLoading(false);
      return;
    }

    // Validar confirmación de contraseña
    if (!validateConfirmPassword(password, confirmPassword)) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    // Verificar si el correo ya está registrado
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      setError("Este correo electrónico ya está registrado.");
      setLoading(false);
      return;
    }

    // Simulación del registro (guardar en localStorage)
    localStorage.setItem("user", JSON.stringify({ email, password }));

    // Redirigir al Login después del registro
    setTimeout(() => {
      navigate("/");
    }, 1000); // Añadir retraso para mostrar el feedback de éxito

    // Limpiar los campos
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLoading(false); // Desactivar el estado de carga
  };

  return (
    
    


    <Container maxWidth="sm">
  {/* Encabezado fijo */}
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: "rgba(0, 0, 255, 0.3)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
  >
    <Grid container justifyContent="space-between" sx={{ padding: "20px" }}>
      <Grid item>
        <Typography onClick={() => navigate("/")}
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          PlanEat
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            ":hover": {
              backgroundColor: "cyan",
              color: "white",
              borderColor: "white",
            },
          }}
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            ml: 1,
            ":hover": {
              backgroundColor: "cyan",
              color: "white",
              borderColor: "white",
            },
          }}
          onClick={() => navigate("/register")}
        >
          Registrarse
        </Button>
      </Grid>
    </Grid>
  </Box>

  {/* Contenido principal */}
  <Box
    sx={{
      marginTop: "80px", // Asegúrate de que este margen sea igual o mayor a la altura del encabezado
    }}
  >
    <Typography variant="h4" gutterBottom align="center">
      Registro
    </Typography>
    <form onSubmit={handleSubmit}>
      {/* Campo de correo electrónico */}
      <TextField
        label="Correo electrónico"
        variant="outlined"
        fullWidth
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        error={!!error && !validateEmail(email)}
        helperText={
          error && !validateEmail(email)
            ? "Por favor, ingresa un correo electrónico válido."
            : ""
        }
      />

      {/* Campo de contraseña */}
      <TextField
        label="Contraseña"
        variant="outlined"
        fullWidth
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
        error={!!error && !validatePassword(password)}
        helperText={
          error && !validatePassword(password)
            ? "Debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
            : ""
        }
        InputProps={{
          endAdornment: (
            <Button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </Button>
          ),
        }}
      />

      {/* Barra de progreso de seguridad de la contraseña */}
      <Box mt={2}>
        <LinearProgress variant="determinate" value={passwordStrength} />
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          sx={{ marginTop: 1 }}
        >
          {passwordStrength < 40
            ? "Contraseña débil"
            : passwordStrength < 70
            ? "Contraseña media"
            : "Contraseña fuerte"}
        </Typography>
      </Box>

      {/* Campo de confirmación de contraseña */}
      <TextField
        label="Confirmar Contraseña"
        variant="outlined"
        fullWidth
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
        required
        error={!!error && !validateConfirmPassword(password, confirmPassword)}
        helperText={
          error && !validateConfirmPassword(password, confirmPassword)
            ? "Las contraseñas no coinciden."
            : ""
        }
      />

      {/* Mensaje de error general */}
      {error && (
        <Typography
          color="error"
          variant="body2"
          align="center"
          sx={{ marginTop: 2 }}
        >
          {error}
        </Typography>
      )}

      {/* Botón de registro */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Registrarse"}
      </Button>
    </form>

    <Box mt={2}>
      {/* Enlace para redirigir al login */}
      <Button
        onClick={() => navigate("/login")}
        variant="text"
        color="secondary"
        fullWidth
      >
        ¿Ya tienes cuenta? Inicia sesión
      </Button>
    </Box>
  </Box>
</Container>

  );
};

export default RegisterPage;
