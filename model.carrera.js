class ModelCarrera {
    constructor(controller) {
        this.dbController = controller;
    }

    /**
     * 
     * @param {*} id entero que representa el id
     * @returns 
     */
    get(id) {
        const sql = `SELECT * FROM carrera WHERE id=?;`;
        this.dbController.open();
        const data = this.dbController.get(sql, [id]);
        this.dbController.close();
        return data;
    }

    /**
     * Devuelve la lista de todas las carreras
     * @returns objeto con la lista de datos
     */
    getAll() {
        const sql = `SELECT * FROM carrera;`;
        this.dbController.open();
        const data = this.dbController.all(sql, []);
        this.dbController.close();
        return data;
    }

    /**
     * Inserta un registro en carrera
     * @param {*} datos arreglo de parámetros [nombre, duracion, facultad]
     * @returns 
     */
    insert(datos) {
        const sql = 'INSERT INTO carrera(nombre, duracion, facultad) VALUES(?, ?, ?)';
        this.dbController.open();
        const data = this.dbController.run(sql, datos);
        this.dbController.close();
        return data;
    }

    // Método para actualizar todos los campos de un registro
    update(id, datos) {
        const sql = 'UPDATE carrera SET nombre=?, duracion=?, facultad=? WHERE id=?';
        this.dbController.open();
        const data = this.dbController.run(sql, [...datos, id]);
        this.dbController.close();
        return data;
    }

    // Método para actualizar un campo específico
    patch(id, campo, valor) {
        const sql = `UPDATE carrera SET ${campo}=? WHERE id=?`;
        this.dbController.open();
        const data = this.dbController.run(sql, [valor, id]);
        this.dbController.close();
        return data;
    }

    // Método para borrar un registro
    delete(id) {
        const sql = 'DELETE FROM carrera WHERE id=?';
        this.dbController.open();
        const data = this.dbController.run(sql, [id]);
        this.dbController.close();
        return data;
    }
}

export default ModelCarrera;
