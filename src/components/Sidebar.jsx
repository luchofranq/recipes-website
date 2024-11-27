// src/components/Sidebar.jsx
import { useState } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Divider,  Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, Book, ExitToApp, Menu as MenuIcon } from "@mui/icons-material"; // Íconos para cada opción
import PropTypes from 'prop-types';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);
  
  // Función para cerrar el sidebar después de una navegación o acción
  const handleListItemClick = () => {
    setOpen(false);  // Cierra el sidebar después de hacer clic en una opción
  };

  return (
    <>
      <IconButton color="primary" onClick={toggleSidebar} sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1201 }}>
        <MenuIcon />
      </IconButton>
      
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240, // Ancho del sidebar
            backgroundColor: "#f4f4f4", // Fondo claro
            paddingTop: "20px", // Espaciado superior
            transition: "all 0.3s ease", // Animación de apertura/cierre
          }
        }}
      >
        <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Menú</Typography>
          <Divider />
          <List>
            <ListItem button component={Link} to="/pantry" onClick={handleListItemClick}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Despensa" />
            </ListItem>
            <ListItem button component={Link} to="/recipes" onClick={handleListItemClick}>
              <ListItemIcon>
                <Book />
              </ListItemIcon>
              <ListItemText primary="Recetas" />
            </ListItem>
            <Divider sx={{ marginY: 1 }} />
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

Sidebar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Sidebar;
