// src/pages/PantryPage.jsx
import { useState, useEffect, useCallback } from "react";
import PantryList from "../components/PantryList";
import ProductForm from "../components/ProductForm";
import { Container, Typography, Snackbar, Alert } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const PantryPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);  // Producto en edición
  const [snackbarOpen, setSnackbarOpen] = useState(false);  // Control de Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");  // Mensaje de Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Nivel de severidad de Snackbar
  const navigate = useNavigate();

  // Cargar productos desde localStorage o usar valores iniciales
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      const initialProducts = [
        { id: 1, name: "Arroz", quantity: "2kg", image: "https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", productType: "arroz" },
        { id: 2, name: "Aceite", quantity: "1L", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", productType: "aceite" },
        { id: 3, name: "Sal", quantity: "500g", image: "https://plus.unsplash.com/premium_photo-1672349888046-361807de476f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", productType: "sal" }
      ];
      setProducts(initialProducts);
      localStorage.setItem("products", JSON.stringify(initialProducts));
    }
  }, []);

  // Función para agregar un nuevo producto
  const addProduct = useCallback((newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setSnackbarMessage("Producto agregado con éxito.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  }, [products]);

  // Función para editar un producto existente
  const editProduct = useCallback((updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setEditingProduct(null);  // Limpiar producto en edición
    setSnackbarMessage("Producto actualizado con éxito.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  }, [products]);

  // Función para eliminar un producto
  const deleteProduct = useCallback((id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setSnackbarMessage("Producto eliminado.");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  }, [products]);

  // Función para establecer el producto a editar
  const handleEditProduct = useCallback((product) => {
    setEditingProduct(product);  // Establecer el producto a editar
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("products");  // Elimina productos del localStorage
    navigate("/");  // Redirige a la página de login
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Sidebar onLogout={handleLogout} />  {/* Agregar Sidebar en la página */}
      
      <Typography variant="h4" gutterBottom>
        Mi Despensa
      </Typography>

      <ProductForm 
        onSubmit={editingProduct ? editProduct : addProduct} 
        initialProduct={editingProduct} 
      />

      {/* Lista de productos */}
      <PantryList
        products={products}
        onEdit={handleEditProduct}
        onDelete={deleteProduct}
      />

      {/* Snackbar para mostrar mensajes de acción */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PantryPage;
