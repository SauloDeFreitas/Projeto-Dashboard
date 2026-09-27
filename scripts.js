const nomeJogo = document.getElementById("nomeJogo")
const capaImg = document.getElementById('capaJogo')
const dirImgsJogos = "./imgJogos/"
let pastaImgs
let quantidadeImgs
let nomeImgs

async function procurarImagem(){
    //Consulta as imagens
    try{
        const busca = await fetch(`http://localhost:3000/contarImagens?pasta=${encodeURIComponent(dirImgsJogos)}`)
        pastaImgs = await busca.json()

        quantidadeImgs = pastaImgs.quantidade
        nomeImgs = pastaImgs.nomes
    }catch(erro){
        console.log("Não foi possível consultar a quantidade de arquivos: ", erro)
    }

    for(let i = 0; i < quantidadeImgs; i++){
        //Reconhece a extensão
        const extensao = '.' + nomeImgs[i].split('.').pop()
        const valorDigitado = nomeJogo.value

        //Verificar se o valor digitado é igual a algum nome de arquivo existente
        if((valorDigitado+extensao) === nomeImgs[i]){
            capaImg.src = (dirImgsJogos + nomeImgs[i]) 
            return
        }
        else{
            capaImg.src = ''
        }
    }
}

nomeJogo.addEventListener('input', procurarImagem)