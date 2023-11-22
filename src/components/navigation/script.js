import { useState } from "react";

export default function useScript() {
    const [search, setSearch] = useState(false)

    const [resultadoPesquisa, setResultadoPesquisa] = useState(null);

    const handlePesquisarAmigo = async () => {
        const inputPesquisa = document.getElementById('pesquisar-amigo');
        const identifier = inputPesquisa.value;

        try {
            const resposta = await fetch(`https://api-planetscale-fawn.vercel.app/buscar-amigo/${identifier}`);
            const dados = await resposta.json();

            if (resposta.ok) {
                setResultadoPesquisa(dados.amigo);
            } else {
                setResultadoPesquisa(null);
                console.error('Erro ao pesquisar amigo:', dados.erro);
            }
        } catch (erro) {
            console.error('Erro ao pesquisar amigo:', erro);

            if (erro instanceof TypeError && erro.message === 'Failed to fetch') {
                // Erro de rede
                console.error('Erro de rede ao pesquisar amigo:', erro);
            } else {
                // Outro tipo de erro
                console.error('Erro desconhecido ao pesquisar amigo:', erro);
            }
        }

    }

    const handleSearch = () => {
        setSearch(!search)
    }

    return {
        handleSearch,
        search,
        resultadoPesquisa, 
        handlePesquisarAmigo
    }
}