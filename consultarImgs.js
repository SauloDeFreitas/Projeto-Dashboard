let totalArquivos = 0
import fs from 'fs'

export function contarArquivos(caminho){
    try{
        const arquivos = fs.readdirSync(caminho)
        return arquivos
    } catch(erro){
        console.log("Erro na leitura de arquivo: "+ erro)
        return 0
    }
}

