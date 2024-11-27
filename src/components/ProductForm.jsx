// src/components/ProductForm.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";

// Imágenes precargadas de ejemplo para productos
const productImages = {
  arroz: "https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  aceite: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sal: "https://plus.unsplash.com/premium_photo-1672349888046-361807de476f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const ProductForm = ({ onSubmit, initialProduct }) => {
    const [name, setName] = useState(initialProduct ? initialProduct.name : "");
    const [quantity, setQuantity] = useState(initialProduct ? initialProduct.quantity : "");
    const [image, setImage] = useState(initialProduct ? initialProduct.image : "");
    const [productType, setProductType] = useState(initialProduct ? initialProduct.productType : "");
  
    useEffect(() => {
      if (initialProduct) {
        setName(initialProduct.name);
        setQuantity(initialProduct.quantity);
        setImage(initialProduct.image);
        setProductType(initialProduct.productType);
      }
    }, [initialProduct]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newProduct = {
        id: initialProduct ? initialProduct.id : Date.now(),
        name,
        quantity,
        image,
        productType,
      };
      onSubmit(newProduct);
      setName(""); 
      setQuantity("");
      setImage("");
      setProductType("");
    };
  
    const handleProductTypeChange = (e) => {
      const selectedType = e.target.value;
      setProductType(selectedType);
      setImage(productImages[selectedType] || "");
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Nombre del Producto */}
          <Grid item xs={12}>
            <TextField
              label="Nombre del producto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
  
          {/* Cantidad del Producto */}
          <Grid item xs={12}>
            <TextField
              label="Cantidad"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              required
            />
          </Grid>
  
          {/* Selección del Tipo de Producto */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Tipo de Producto</InputLabel>
              <Select
                value={productType}
                onChange={handleProductTypeChange}
                label="Tipo de Producto"
              >
                <MenuItem value="arroz">Arroz</MenuItem>
                <MenuItem value="aceite">Aceite</MenuItem>
                <MenuItem value="sal">Sal</MenuItem>
              </Select>
              <FormHelperText>Selecciona un tipo de producto</FormHelperText>
            </FormControl>
          </Grid>
  
          {/* Muestra de la imagen predefinida basada en el tipo de producto */}
          {image && (
            <Grid item xs={12}>
              <img src={image} alt={productType} style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }} />
            </Grid>
          )}
  
          {/* Botón de Enviar */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {initialProduct ? "Editar Producto" : "Agregar Producto"}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };
  
  ProductForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialProduct: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      quantity: PropTypes.string,
      image: PropTypes.string,
      productType: PropTypes.string,
    }),
  };
  
  export default ProductForm;
