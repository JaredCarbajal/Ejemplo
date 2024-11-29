class ModelFacultad {
    constructor(controller) {
        this.dbController = controller;
    }
    
    get(id) {
        const sql = `SELECT * FROM facultad WHERE id=?;`;
        this.dbController.open();
        const data = this.dbController.get(sql, [id]);
        this.dbController.close();
        return data;
    }

    getAll() {
        const sql = `SELECT * FROM facultad;`;
        this.dbController.open();
        const data = this.dbController.all(sql, []);
        this.dbController.close();
        return data;
    }

    insert(datos) {
        const sql = 'INSERT INTO facultad(nombre, duracion, ubicacion) VALUES(?, ?, ?)';
        this.dbController.open();
        const data = this.dbController.run(sql, datos);
        this.dbController.close();
        return data;
    }

    update(id, datos) {
        const sql = 'UPDATE facultad SET nombre=?, duracion=?, ubicacion=? WHERE id=?';
        this.dbController.open();
        const data = this.dbController.run(sql, [...datos, id]);
        this.dbController.close();
        return data;
    }

    patch(id, campo, valor) {
        const sql = `UPDATE facultad SET ${campo}=? WHERE id=?`;
        this.dbController.open();
        const data = this.dbController.run(sql, [valor, id]);
        this.dbController.close();
        return data;
    }

    delete(id) {
        const sql = 'DELETE FROM facultad WHERE id=?';
        this.dbController.open();
        const data = this.dbController.run(sql, [id]);
        this.dbController.close();
        return data;
    }
}

export default ModelFacultad;
