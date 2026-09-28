const nomeJogo = document.getElementById("nomeJogo")
const capaImg = document.getElementById('capaJogo')
const dirImgsJogos = "./imgJogos/"
let pastaImgs
let quantidadeImgs
let nomeImgs
const url = 'http://localhost:3000'

async function consultaImagem(){
    //Consulta as imagens
    try{
        const busca = await fetch( url + `/contarImagens?pasta=${encodeURIComponent(dirImgsJogos)}`)
        pastaImgs = await busca.json()

        quantidadeImgs = pastaImgs.quantidade
        nomeImgs = pastaImgs.nomes
    }catch(erro){
        console.log("Não foi possível consultar a quantidade de arquivos: ", erro)
    }
}

function reconhecerExtensao(indice){
    const extensao = '.' + nomeImgs[indice].split('.').pop()

    return extensao
}

async function procurarImagem(){
    consultaImagem()

    for(let i = 0; i < quantidadeImgs; i++){
        const valorDigitado = (nomeJogo.value + reconhecerExtensao(i)).replace(/\s/g,"").toLocaleLowerCase()

        //Verificar se o valor digitado é igual a algum nome de arquivo existente
        if(valorDigitado === nomeImgs[i].replace(/\s/g,"").toLocaleLowerCase()){
            capaImg.src = (dirImgsJogos + nomeImgs[i]) 
            return
        }
        else{
            capaImg.src = ''
        }
    }
}


async function mostrarJogos(){
    try{
        const requisicao = await fetch(url + '/jogo/mostrar')
        const jogos = await requisicao.json()
        const quantidadeJogos = jogos.length

        for(let i = 0; i < quantidadeJogos; i++){
            const containerContudo = document.getElementById('containerContudo')

            const conteinerCard = document.createElement('div')
            conteinerCard.className = 'containerCard'
            containerContudo.appendChild(conteinerCard)

            const img = document.createElement('img')
            img.src = dirImgsJogos + jogos[i].nome + jogos[i].extensao


            const a = document.createElement('a')
            const data = document.createElement('h1')
            data.textContent = jogos[i].data
            conteinerCard.appendChild(data)
            conteinerCard.appendChild(img)
            conteinerCard.appendChild(a)
            
        }
    }catch(erro){
        console.log("Não foi possível mostrar os jogos: ", erro)
    }
}


async function cadastrarJogo(){
    const nomeJogo = document.getElementById('nomeJogo')
    const notaJogo = document.querySelector('input[name ="notaJogo"]:checked')
    const dataJogo = document.getElementById('dataJogo')
    const formulario = document.getElementById("formCriarJogo")

    if(formulario.reportValidity()){
        const requisicao = await fetch(url + '/extensao', {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body : JSON.stringify({pasta: dirImgsJogos, nome : nomeJogo.value.replace(/\s/g,"").toLocaleLowerCase()})
        })
        const resultado = await requisicao.json()
        
        const jogo  = {
            nome : nomeJogo.value.replace(/\s/g,"").toLocaleLowerCase(),
            extensao : resultado.extensao,
            nota : notaJogo.value,
            data : dataJogo.value
        }

        try{
            const requisicao = await fetch(url + '/jogo/cadastrar', { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body : JSON.stringify(jogo)
            })
        }catch(erro){
            console.log('Não foi possível cadastrar devido :', erro)
        }
    }
    else{
        alert('Preecha todos os campos!')
    }

}