// src/components/PantryList.jsx
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, IconButton, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"; // Se elimina el import de FilterIcon, ya que no se usa.
import { useState } from "react";

const PantryList = ({ products, onEdit, onDelete }) => {
  const [filter, setFilter] = useState(""); // Estado para el filtro
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Estado para abrir/close el diálogo de confirmación de eliminación
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para eliminar

  // Manejar el cambio del filtro
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filtrar los productos por tipo (si hay un filtro seleccionado)
  const filteredProducts = filter
    ? products.filter((product) => product.productType === filter)
    : products;

  // Abrir el diálogo de eliminación
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  // Confirmar eliminación
  const handleConfirmDelete = () => {
    if (selectedProduct) {
      onDelete(selectedProduct.id); // Llamar la función de eliminar
      setSelectedProduct(null);
      setOpenDeleteDialog(false);
    }
  };

  // Cerrar el diálogo de eliminación sin eliminar
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      {/* Filtro de productos */}
      <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <InputLabel>Filtrar por tipo</InputLabel>
        <Select
          value={filter}
          onChange={handleFilterChange}
          label="Filtrar por tipo"
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="arroz">Arroz</MenuItem>
          <MenuItem value="aceite">Aceite</MenuItem>
          <MenuItem value="sal">Sal</MenuItem>
          {/* Agregar más tipos según sea necesario */}
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        {filteredProducts.length === 0 ? (
          <Typography variant="h6" color="textSecondary" sx={{ width: "100%", textAlign: "center" }}>
            No hay productos para mostrar.
          </Typography>
        ) : (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="140"
                  image={product.image}
                  sx={{
                    objectFit: "contain",
                    maxWidth: "100%",
                    maxHeight: "140px",
                    marginBottom: 2,
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.quantity} | {product.productType}
                  </Typography>
                </CardContent>
                <div style={{ padding: "10px", display: "flex", justifyContent: "space-between" }}>
                  <IconButton onClick={() => onEdit(product)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(product)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Eliminar Producto</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el producto &quot;{selectedProduct?.name}&quot;?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PantryList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      productType: PropTypes.string.isRequired, // Añadido productType
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PantryList;
