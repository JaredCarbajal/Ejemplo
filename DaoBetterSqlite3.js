import Database from "better-sqlite3";

class AppDaoBetterSQLite{
    constructor(dbFilePath){
        this.dbName=dbFilePath
        this.db=null
        this.dbOpen=false
    }
    open(){        
        this.db = new Database(this.dbName)
        this.dbOpen=true
    }
    run(sql, params = []) {
        const insertData = this.db.prepare(sql)
        const r=insertData.run(params)
        return r
    }
    get(sql, params = []) {
        //si la consulta fue satisfactoria pero no hay datos  devuelve undefined 
        const res = this.db.prepare(sql).get(params)
        return res
    }

    all(sql, params = []) {
        const res = this.db.prepare(sql).all()
        return res
    }
    close(){
        console.log("base de datos cerrada")
        if(this.dbOpen) this.db.close()
    }
}


export default AppDaoBetterSQLite