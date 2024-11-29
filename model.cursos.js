class ModelCursos {
    constructor(controller) {
        this.dbController = controller;
    }

    /**
     * Obtiene un curso por su ID
     * @param {*} id entero que representa el id
     * @returns objeto con los datos del curso
     */
    get(id) {
        const sql = `SELECT * FROM cursos WHERE id=?;`;
        this.dbController.open();
        const data = this.dbController.get(sql, [id]);
        this.dbController.close();
        return data;
    }

    /**
     * Devuelve la lista de todos los cursos
     * @returns objeto con la lista de datos
     */
    getAll() {
        const sql = `SELECT * FROM cursos;`;
        this.dbController.open();
        const data = this.dbController.all(sql, []);
        this.dbController.close();
        return data;
    }

    /**
     * Inserta un registro en cursos
     * @param {*} datos arreglo de parámetros [nombre, creditos, semestre]
     * @returns 
     */
    insert(datos) {
        const sql = 'INSERT INTO cursos(nombre, creditos, semestre) VALUES(?, ?, ?)';
        this.dbController.open();
        const data = this.dbController.run(sql, datos);
        this.dbController.close();
        return data;
    }

    /**
     * Método para actualizar todos los campos de un registro
     * @param {*} id entero que representa el id
     * @param {*} datos arreglo de parámetros [nombre, creditos, semestres]
     * @returns 
     */
    update(id, datos) {
        const sql = 'UPDATE cursos SET nombre=?, creditos=?, semestre=? WHERE id=?';
        this.dbController.open();
        const data = this.dbController.run(sql, [...datos, id]);
        this.dbController.close();
        return data;
    }

    /**
     * Método para actualizar un campo específico
     * @param {*} id entero que representa el id
     * @param {*} campo nombre del campo a actualizar
     * @param {*} valor nuevo valor del campo
     * @returns 
     */
    patch(id, campo, valor) {
        const sql = `UPDATE cursos SET ${campo}=? WHERE id=?`;
        this.dbController.open();
        const data = this.dbController.run(sql, [valor, id]);
        this.dbController.close();
        return data;
    }

    /**
     * Método para borrar un registro
     * @param {*} id entero que representa el id
     * @returns 
     */
    delete(id) {
        const sql = 'DELETE FROM cursos WHERE id=?';
        this.dbController.open();
        const data = this.dbController.run(sql, [id]);
        this.dbController.close();
        return data;
    }
}

export default ModelCursos;
