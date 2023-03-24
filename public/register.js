const regForm = document.getElementById("formRegister");
regForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = new FormData(regForm)
    const obj = {}
    data.forEach((value, key) => {
        obj[key] = value;
    })
    fetch('/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>console.log(json));
})