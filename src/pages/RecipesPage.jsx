import { useState, useEffect } from "react";
import { Container, Typography, Grid, Button, Chip, TextField, Card, CardContent, CardMedia, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "../components/Sidebar"; // Asegúrate de que la ruta sea correcta

const RecipesPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [filter, setFilter] = useState(""); // Para filtrar recetas por nombre
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecipeToDelete, setSelectedRecipeToDelete] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null); // Estado para controlar la edición

  // Cargar productos desde localStorage
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

    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setSavedRecipes(storedRecipes);
  }, []);

  // Función para agregar un producto a la receta
  const addToRecipe = (product) => {
    if (!selectedProducts.includes(product)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  // Función para eliminar un producto de la receta
  const removeFromRecipe = (productId) => {
    setSelectedProducts(selectedProducts.filter((product) => product.id !== productId));
  };

  // Función para guardar la receta
  const saveRecipe = () => {
    if (recipeName && selectedProducts.length > 0) {
      const newRecipe = {
        name: recipeName,
        products: selectedProducts
      };

      let updatedRecipes;
      if (editingRecipe) {
        // Actualizar receta existente
        updatedRecipes = savedRecipes.map((recipe) =>
          recipe.name === editingRecipe.name ? newRecipe : recipe
        );
      } else {
        // Agregar nueva receta
        updatedRecipes = [...savedRecipes, newRecipe];
      }

      localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
      setSavedRecipes(updatedRecipes);

      // Limpiar formulario y estado de edición
      setRecipeName("");
      setSelectedProducts([]);
      setEditingRecipe(null);
    } else {
      alert("Por favor, ingresa un nombre para la receta y selecciona al menos un producto.");
    }
  };

  // Función para eliminar una receta
  const deleteRecipe = () => {
    const updatedRecipes = savedRecipes.filter((recipe) => recipe !== selectedRecipeToDelete);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setSavedRecipes(updatedRecipes);
    setOpenDialog(false);
  };

  // Función para abrir el diálogo de eliminación
  const handleOpenDialog = (recipe) => {
    setSelectedRecipeToDelete(recipe);
    setOpenDialog(true);
  };

  // Función para cerrar el diálogo de eliminación
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRecipeToDelete(null);
  };

  // Función para filtrar recetas
  const filteredRecipes = savedRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Función para iniciar la edición de una receta
  const editRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setRecipeName(recipe.name);
    setSelectedProducts(recipe.products);
  };

  // Función para manejar el logout
  const handleLogout = () => {
    console.log("Cerrar sesión");
    // Lógica de logout (limpiar sesión, redirigir, etc.)
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onLogout={handleLogout} /> {/* Agregar Sidebar */}
      <Container style={{ marginLeft: 240 }}>
        <Typography variant="h4" gutterBottom>
          {editingRecipe ? "Editar Receta" : "Crear una Receta"}
        </Typography>

        {/* Nombre de la receta */}
        <TextField
          label="Nombre de la receta"
          variant="outlined"
          fullWidth
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          margin="normal"
        />

        <Typography variant="h6" gutterBottom>
          Selecciona los ingredientes:
        </Typography>

        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => addToRecipe(product)}
              >
                {product.name}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" gutterBottom>
          Ingredientes seleccionados:
        </Typography>

        <Grid container spacing={1}>
          {selectedProducts.map((product) => (
            <Grid item key={product.id}>
              <Chip
                label={product.name}
                onDelete={() => removeFromRecipe(product.id)}
              />
            </Grid>
          ))}
        </Grid>

        <Button variant="contained" color="primary" onClick={saveRecipe} fullWidth>
          {editingRecipe ? "Actualizar Receta" : "Guardar Receta"}
        </Button>

        <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
          Filtrar Recetas:
        </Typography>

        <TextField
          label="Buscar receta por nombre"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          margin="normal"
        />

        <Typography variant="h6" gutterBottom style={{ marginTop: 20 }}>
          Recetas guardadas:
        </Typography>

        <Grid container spacing={3}>
          {filteredRecipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Receta"
                  height="140"
                  image="https://via.placeholder.com/150" // Puedes agregar una imagen para cada receta
                />
                <CardContent>
                  <Typography variant="h6">{recipe.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ingredientes:
                  </Typography>
                  {recipe.products.map((product) => (
                    <Chip key={product.id} label={product.name} style={{ margin: 5 }} />
                  ))}
                  <div style={{ marginTop: 10 }}>
                    <IconButton onClick={() => editRecipe(recipe)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDialog(recipe)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Diálogo de confirmación de eliminación */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Eliminar Receta</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              ¿Estás seguro de que deseas eliminar esta receta?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={deleteRecipe} color="secondary">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default RecipesPage;
