// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { Grid, TextField, Button, Typography, Container, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();

  // Limpiar el error al cambiar el valor de los campos
  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Activar carga

    // Validación de campos vacíos
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    // Recuperar los datos del usuario desde localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No hay ningún usuario registrado con ese correo.");
      setLoading(false);
      return;
    }

    // Comprobar si las credenciales coinciden
    if (storedUser.email !== email || storedUser.password !== password) {
      setError("Credenciales incorrectas.");
      setLoading(false);
      return;
    }

    // Si las credenciales son correctas, redirigir a la página de la despensa
    setTimeout(() => {
      navigate("/pantry");
    }, 1000); // Añadir un pequeño retraso para mostrar el feedback

    // Limpiar los campos después de la autenticación exitosa
    setEmail("");
    setPassword("");
  };

  return (
    <Container maxWidth="sm">
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
  <Box
    sx={{
      marginTop: "80px", // Asegúrate de que este margen sea igual o mayor a la altura del encabezado
    }}
  >
      <Typography variant="h4" gutterBottom align="center">
        Iniciar sesión
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
          error={!!error && !email}
          helperText={error && !email ? "Por favor ingresa tu correo electrónico." : ""}
        />

        {/* Campo de contraseña */}
        <TextField
          label="Contraseña"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
          error={!!error && !password}
          helperText={error && !password ? "Por favor ingresa tu contraseña." : ""}
        />

        {/* Mensaje de error */}
        {error && <Typography color="error" variant="body2" align="center" sx={{ marginTop: 2 }}>{error}</Typography>}

        {/* Botón de inicio de sesión */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading} // Deshabilitar el botón mientras está en carga
          sx={{ marginTop: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Iniciar sesión"}
        </Button>
      </form>

      <Box mt={2}>
        {/* Enlace para redirigir a la página de registro */}
        <Button
          onClick={() => navigate("/register")}
          variant="text"
          color="secondary"
          fullWidth
        >
          ¿No tienes cuenta? Regístrate
        </Button>
      </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
