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
              setResultadoPesquisa(dados.amigo);  // Ajuste aqui para dados.amigo.amigo
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

    const handleAdicionarAmigo = async () => {
        // Certifique-se de que há um resultado de pesquisa antes de tentar adicionar
        if (resultadoPesquisa) {
          const { usuario_identifier, amigo_identifier } = resultadoPesquisa;
          try {
            const resposta = await fetch('https://api-planetscale-fawn.vercel.app/adicionar-amigo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ usuario_identifier, amigo_identifier }),
            });
    
            if (resposta.ok) {
              console.log('Amigo adicionado com sucesso!');
              // Limpar o resultado da pesquisa após a adição bem-sucedida, se desejar
              setResultadoPesquisa(null);
            } else {
              console.error('Erro ao adicionar amigo:', resposta.statusText);
            }
          } catch (erro) {
            console.error('Erro de rede ao adicionar amigo:', erro);
          }
        }
    };


    const handleSearch = () => {
        setSearch(!search)
    }

    return {
        handleSearch,
        search,
        resultadoPesquisa, 
        handlePesquisarAmigo,
        handleAdicionarAmigo
    }
}