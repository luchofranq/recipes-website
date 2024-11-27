
import { Typography, Box, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import {  FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MainPage = () => {

  const navigate = useNavigate();

  // Capturar la posición del mouse


  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        backgroundImage:
          "url(https://cdn.pixabay.com/photo/2021/02/20/15/38/pantry-6033796_1280.jpg)", // Imagen de fondo
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        filter: "opacity(0.5)", // Transparencia inicial
      transition: "filter 0.5s ease-in-out", // Transición para suavizar cambios
      "&:hover": {
        filter: "opacity(0.8)", // Más visible al pasar el mouse
      },
    }}
    
    >
   

      {/* Barra superior */}
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,  backgroundColor: "rgba(0, 150, 0, 0.6)"}}>
        <Grid container justifyContent="space-between" sx={{ padding: "20px" }}>
          <Grid item>
            <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", }}>
              PlanEat
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white",
                ":hover": { backgroundColor: "green",color: "white",
                    borderColor: "white" },
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
                ":hover": { backgroundColor: "green",color: "white",
                    borderColor: "white" },
              }}
              onClick={() => navigate("/register")}
            >
              Registrarse
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Sección de tarjetas informativas con fade-in */}
      <Box sx={{ position: "absolute", bottom: "80px", width: "100%" }}>
        <Grid container justifyContent="center" spacing={3}>
          {["Sobre Nosotros", "Funcionalidades", "Contacto"].map((title, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }} // Empezar con opacidad 0 y desplazamiento hacia abajo
                animate={{ opacity: 1, y: 0 }} // Aparecer con opacidad 1 y mover a su posición original
                transition={{
                  delay: index * 0.5, // Cada tarjeta tendrá un retraso
                  duration: 1, // Duración de la animación
                  ease: "easeOut", // Suavizar el movimiento
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(0, 255, 0, 0.6)", // Transparencia
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Efecto de scale y sombra
                    "&:hover": {
                      transform: "scale(1.05)", // Efecto de escala al pasar el ratón
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Esta es una breve descripción sobre {title.toLowerCase()}.
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          color: "white",
           backgroundColor: "rgba(0, 150, 0, 0.6)",
          fontSize: "14px",
        }}
      >
        <Typography variant="body2" sx={{ mr: 2 }}>
          © 2024 PlanEat
        </Typography>
        <Box sx={{ display: "flex" }}>
          {[ FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
            <Icon
              key={idx}
              style={{
                marginRight: 10,
                cursor: "pointer",
                transition: "transform 0.3s ease, color 0.3s ease",
                color: "white",
              }}
              onMouseEnter={(e) => (e.target.style.color = "red")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
