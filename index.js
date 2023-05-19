const http = require("http")
const fs = require("fs")

const server = http.createServer((request, response) => {
    //Lógica da Função Callback.
    switch(request.method){
        case "GET":
            //Lógica do GET.
            break
        case "POST":
            //Lógica do POST.
            break
    }
})

server.listen(3000)