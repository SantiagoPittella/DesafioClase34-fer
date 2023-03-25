import fs from "fs";
class ProductosF {
    
    async save(objeto) {
        try {
            const info = await this.getAll()?? [];
            objeto.id = ( info.length === 0 ) ? 1 : info[info.length - 1].id + 1;
            info.push(objeto)
            const infoJson = JSON.stringify(info, null, 2)
            await fs.promises.writeFile(`./archivos/productos.json`, infoJson)
            return objeto.id
        } catch (error) {
            console.log(error);
        }
    }
    async getById(numero) {
        try {
            const numId = Number(numero);
            const info = await this.getAll()?? [];
            const hayItem = info.some((item) => numId === item.id);
            if(hayItem){
                const resultado = info.find((item) => numId === item.id);
                return resultado;
            }else{
                console.log("No existe un objeto con ese id");
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getAll() {
        try {
            //revisa si el archivo existe en la carpeta
            const carpeta = await fs.promises.readdir('./archivos', 'utf-8')
            if (carpeta.includes(`productos.json`)) {
                //lee y verifica si el archivo contiene informacion
                const hayInfo = await fs.promises.readFile(`./archivos/productos.json`, 'utf-8')
                if (hayInfo) {
                    const infoParseada = JSON.parse(hayInfo)
                    return infoParseada
                } else {
                    return null
                }
            } else {
                return null
            }
        } catch (error) {
           console.log(error); 
        }
    }
    async deleteById(numero) {
        try {
            const numId = Number(numero);
            const info = await this.getAll()?? [];
            //verifica si existe un item con un id igual al numero pasado por parametro
            const hayItem = info.some((item) => numId === item.id)
            if(hayItem){
                //obtengo el id del item y lo elimino del array
                const resultado = info.find((item) => numId === item.id)
                const indice = info.indexOf(resultado)
                info.splice(indice, 1)
                const infoJson = JSON.stringify(info, null, 2)
                await fs.promises.writeFile(`./archivos/productos.json`, infoJson)
                return true
            } else {
                console.log("no existe un objeto con ese numero de id");
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./archivos/productos.json`, "")
        } catch (error) {
            console.log(error);
        }
    }
    async update(obj) {
        const todos = await this.getAll()?? [];
        todos.map((item) => {
            if(item.id == obj.id){
                item.title = obj.title,
                item.price = obj.price,
                item.thumbnail = obj.thumbnail
            }
        })
        const todosActualizado = JSON.stringify(todos, null, 2)
        await fs.promises.writeFile(`./archivos/productos.json`, todosActualizado)
    }
    conn() {
        console.log("base conectada");
    }
    disconn() {
        console.log("base desconectada");
    }
}

export default ProductosF;