class ModelAlumno {
    constructor(controller) {
        this.dbController = controller;
    }
    
    /**
     * 
     * @param {*} id entero que representa el id
     * @returns 
     */
    get(id) {
        const sql = `SELECT * FROM alumno WHERE id=?;`;
        this.dbController.open();
        const data = this.dbController.get(sql, [id]);
        this.dbController.close();
        return data;
    }

    /**
     * Devuelve la lista de todos los alumnos
     * @returns objeto con la lista de datos
     */
    getAll() {
        const sql = `SELECT * FROM alumno;`;
        this.dbController.open();
        const data = this.dbController.all(sql, []);
        this.dbController.close();
        return data;
    }

    /**
     * Inserta un registro en alumno
     * @param {*} datos arreglo de parametros [anio, nombre, apellido]
     * @returns 
     */
    insert(datos) {
        const sql = 'INSERT INTO alumno(anio, nombre, apellido) VALUES(?, ?, ?)';
        this.dbController.open();
        const data = this.dbController.run(sql, datos);
        this.dbController.close();
        return data;
    }

    // Método para actualizar todos los campos de un registro
    update(id, datos) {
        console.log("Datos recibidos para actualizar:", id, datos);  // Agrega este log para depuración
        const sql = 'UPDATE alumno SET anio=?, nombre=?, apellido=? WHERE id=?';
        this.dbController.open();
        const data = this.dbController.run(sql, [...datos, id]);
        this.dbController.close();
        return data;
    }
    
    

    // Método para actualizar un campo específico
    patch(id, campo, valor) {
        const camposPermitidos = ['anio', 'nombre', 'apellido'];  // Asegúrate de que solo se actualicen estos campos
        if (!camposPermitidos.includes(campo)) {
            throw new Error("Campo no permitido para actualización");
        }
    
        const sql = `UPDATE alumno SET ${campo}=? WHERE id=?`;
        this.dbController.open();
        const data = this.dbController.run(sql, [valor, id]);
        this.dbController.close();
        return data;
    }
    

    // Método para borrar un registro
    delete(id) {
        const sql = 'DELETE FROM alumno WHERE id=?';
        this.dbController.open();
        const data = this.dbController.run(sql, [id]);
        this.dbController.close();
        return data;
    }
}

export default ModelAlumno;
