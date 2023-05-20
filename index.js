const http = require("http")
const fs = require("fs")

// Função responsável por ler os dados de um arquivo JSON
const dadosJSON = (caminhoArquivoJSON) => {
    // Tratamento de possível erro
    try{
        const conteudoAquivo = fs.readFileSync(caminhoArquivoJSON, "utf8")
        // Converte o arquivo JSON em um objeto JS
        const dados = JSON.parse(conteudoArquivo)
        return dados
    }catch(erro){
        console.error("Erro ao ler arquivo JSON: ", erro)
        return null
    }
} 

// Função responsável por receber os dados enviados em uma solicitação POST
const dadosEnviadosNoPOST = (request, Callback) =>{
    // String vazia será usada para acumular os dados recebidos da solicitação POST
    let dados = ""
    // "request.on" -> registra um callback no evento "data"
    request.on("data", (chunk) => {
        dados += chunk
    })
    request.on("end", () => {
        try{
            const dadosObjeto = JSON.parse(dados)
            callback(dadosObjeto)
        }catch(erro){
            console.error("Erro ao analisar os dados do POST: ", erro)
            callback(null)
        }
    })
}

const salvarDadosJSON = (dados, caminhoArquivoJSON, callback) => {
    try{
        const dadosJSON = JSON.stringify(dados)
        fs.writeFile(caminhoArquivoJSON, dadosJSON, "utf8", (erro) => {
            if(erro){
                console.error("Erro ao salvar os dados no arquivo JSON: ", erro)
                callback(false)
            }else{
                callback(true)
            }
        })
    }catch(erro){
        console.error("Erro ao converter os dados para JSON: ", erro)
    }
}


// Criando o servido HTTP
const server = http.createServer((request, response) => {
    //Lógica da Função Callback.
    switch(request.method){
        case "GET":
            //Lógica do GET.
            if(request.url === "/dados"){
                const caminhoArquivoJSON = "./dados.json"
                const dados = dadosJSON(caminhoArquivoJSON)

                if(dados){
                    response.writeHead(200,{"Content-Type":"application/json"})
                    response.end(JSON.stringify(dados))
                }else{
                    response.writeHead(500,{"Content-Type":"text/plain"})
                    response.end("Erro ao ler o dados.")
                }
            }else{
                response.writeHead(404,{"Content-Type": "text/plain"})
                response.end("Rota não encontrada")
            }
            break
        
            case "POST":
            //Lógica do POST.
            break
    }
})

server.listen(3000)