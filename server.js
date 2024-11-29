import express from "express";
import dotenv from "dotenv";
import path from "path";
import DaoBetterSqlite3 from "./DaoBetterSqlite3.js"; // Ajusta la ruta según tu estructura
import ModelAlumno from "./models/model.alumno.js"; // Ajusta la ruta según tu estructura

dotenv.config();
const PORT = process.env.PORT || 3000;

// Instanciar el controlador de la base de datos y el modelo de alumnos
const dbController = new DaoBetterSqlite3("BasePA.s3db");
const alumnoModel = new ModelAlumno(dbController);

const app = express();

// Middleware para procesar datos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(express.static(path.join(process.cwd(), "public")));

// Rutas HTML
app.get("/", (req, res) => {
  res.send(`
    <h1>Bienvenido al Sistema de Alumnos</h1>
    <h3>Pruebe las rutas siguientes:</h3>
    <ul>
      <li><a href="/getAll">GET /getAll</a>: Lista de alumnos</li>
      <li><a href="/insertForm">Formulario para insertar alumno</a></li>
      <li><a href="/updateForm">Formulario para actualizar alumno</a></li>
      <li><a href="/patchForm">Formulario para actualizar un campo específico de alumno</a></li>
      <li><a href="/deleteForm">Formulario para borrar un alumno</a></li>
    </ul>
  `);
});

// Formularios para pruebas en el navegador

app.get("/insertForm", (req, res) => {
  res.send(`
    <h2>Formulario para insertar alumno</h2>
    <form action="/insert" method="POST">
      <label for="anio">Año:</label>
      <input type="number" name="anio" required>
      <label for="nombre">Nombre:</label>
      <input type="text" name="nombre" required>
      <label for="apellido">Apellido:</label>
      <input type="text" name="apellido" required>
      <button type="submit">Insertar</button>
    </form>
  `);
});

app.get("/updateForm", (req, res) => {
  res.send(`
    <h2>Formulario para actualizar alumno</h2>
    <form action="/put" method="POST">
      <label for="id">ID del Alumno:</label>
      <input type="number" name="id" required>
      <label for="anio">Año:</label>
      <input type="number" name="anio" required>
      <label for="nombre">Nombre:</label>
      <input type="text" name="nombre" required>
      <label for="apellido">Apellido:</label>
      <input type="text" name="apellido" required>
      <button type="submit">Actualizar</button>
    </form>
  `);
});

app.get("/patchForm", (req, res) => {
  res.send(`
    <h2>Formulario para actualizar un campo específico de alumno</h2>
    <form action="/patch" method="POST">
      <label for="id">ID del Alumno:</label>
      <input type="number" name="id" required>
      <label for="campo">Campo:</label>
      <input type="text" name="campo" required>
      <label for="valor">Nuevo valor:</label>
      <input type="text" name="valor" required>
      <button type="submit">Actualizar Campo</button>
    </form>
  `);
});

app.get("/deleteForm", (req, res) => {
  res.send(`
    <h2>Formulario para eliminar alumno</h2>
    <form action="/delete" method="POST">
      <label for="id">ID del Alumno:</label>
      <input type="number" name="id" required>
      <button type="submit">Eliminar</button>
    </form>
  `);
});

// Rutas API

// Obtener todos los alumnos
app.get("/getAll", (req, res) => {
  try {
    const alumnos = alumnoModel.getAll();
    res.json(alumnos);
  } catch (error) {
    console.error("Error al obtener alumnos:", error);
    res.status(500).send({ error: "Error al obtener alumnos" });
  }
});

// Obtener un alumno por ID
app.get("/get/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const alumno = alumnoModel.get(id);
    if (alumno) {
      res.json(alumno);
    } else {
      res.status(404).send({ error: "Alumno no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener alumno:", error);
    res.status(500).send({ error: "Error al obtener alumno" });
  }
});

// Insertar un nuevo alumno
app.post("/insert", (req, res) => {
  try {
    const { anio, nombre, apellido } = req.body;
    const datos = [anio, nombre, apellido];
    const resultado = alumnoModel.insert(datos);
    res.json({ mensaje: "Alumno insertado con éxito", resultado });
  } catch (error) {
    console.error("Error al insertar alumno:", error);
    res.status(500).send({ error: "Error al insertar alumno" });
  }
});

// Actualizar todos los campos de un alumno
app.post("/put", (req, res) => {
  try {
    const { id, anio, nombre, apellido } = req.body;
    const datos = [anio, nombre, apellido];
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = alumnoModel.update(id, datos);
    res.json({ mensaje: "Alumno actualizado con éxito", resultado });
  } catch (error) {
    console.error("Error al actualizar alumno:", error);
    res.status(500).send({ error: "Error al actualizar alumno" });
  }
});

// Actualizar un campo específico de un alumno
app.post("/patch", (req, res) => {
  try {
    const { id, campo, valor } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = alumnoModel.patch(id, campo, valor);
    res.json({ mensaje: "Campo actualizado con éxito", resultado });
  } catch (error) {
    console.error("Error al actualizar campo de alumno:", error);
    res.status(500).send({ error: "Error al actualizar campo" });
  }
});

// Borrar un alumno
app.post("/delete", (req, res) => {
  try {
    const { id } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ error: "ID inválido" });
    }
    const resultado = alumnoModel.delete(id);
    res.json({ mensaje: "Alumno eliminado con éxito", resultado });
  } catch (error) {
    console.error("Error al eliminar alumno:", error);
    res.status(500).send({ error: "Error al eliminar alumno" });
  }
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}/`);
});
