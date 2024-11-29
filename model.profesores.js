class ModelProfesores {
    constructor(controller) {
        this.dbController = controller;
    }
    
    get(id) {
        const sql = `SELECT * FROM profesores WHERE id=?;`;
        this.dbController.open();
        const data = this.dbController.get(sql, [id]);
        this.dbController.close();
        return data;
    }

    getAll() {
        const sql = `SELECT * FROM profesores;`;
        this.dbController.open();
        const data = this.dbController.all(sql, []);
        this.dbController.close();
        return data;
    }

    insert(datos) {
        const sql = 'INSERT INTO profesores(nombre, apellido, edad) VALUES(?, ?, ?)';
        this.dbController.open();
        const data = this.dbController.run(sql, datos);
        this.dbController.close();
        return data;
    }

    update(id, datos) {
        const sql = 'UPDATE profesores SET nombre=?, apellido=?, edad=? WHERE id=?';
        this.dbController.open();
        const data = this.dbController.run(sql, [...datos, id]);
        this.dbController.close();
        return data;
    }

    patch(id, campo, valor) {
        const sql = `UPDATE profesores SET ${campo}=? WHERE id=?`;
        this.dbController.open();
        const data = this.dbController.run(sql, [valor, id]);
        this.dbController.close();
        return data;
    }

    delete(id) {
        const sql = 'DELETE FROM profesores WHERE id=?';
        this.dbController.open();
        const data = this.dbController.run(sql, [id]);
        this.dbController.close();
        return data;
    }
}

export default ModelProfesores;
