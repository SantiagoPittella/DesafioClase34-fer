process.on('message', objeto => {
    let resultado = [];
    const limite = objeto.limite || 1000000
    for (let i = 0; i < limite; i++) {
        let numero = Math.round(Math.random() * 5000)
        const objNum = { numero }
        const hayNum = resultado.some(obj => obj.numero === objNum.numero)
        if(hayNum){
            resultado.map(obj => {
                if(obj.numero === objNum.numero){
                    obj.cantidad++
                }
                return obj
            })
        } else {
            objNum.cantidad = 0
            resultado.push(objNum)
        }
    }
    resultado.sort((a,b) => a.numero - b.numero)
    process.send(resultado)
})