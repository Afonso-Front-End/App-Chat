import { useState } from "react";

export default function useScript() {
  const [search, setSearch] = useState(false)
  const [resultadoPesquisa, setResultadoPesquisa] = useState(null);

  const handlePesquisarAmigo = async () => {
    const inputPesquisa = document.getElementById('pesquisar-amigo');
    const usuario_identifier = inputPesquisa.value;
    try {
      const resposta = await fetch(`https://api-planetscale-fawn.vercel.app/buscar-usuario/${usuario_identifier}`);
      const dados = await resposta.json();
  
      if (resposta.ok) {
        setResultadoPesquisa(dados.usuario);
      } else {
        setResultadoPesquisa(null);
        console.error('Erro ao pesquisar amigo:', dados.erro);
      }
    } catch (erro) {
      console.error('Erro ao pesquisar amigo:', erro);
  
      if (erro instanceof TypeError && erro.message === 'Failed to fetch') {

        console.error('Erro de rede ao pesquisar amigo:', erro);
      } else {
        console.error('Erro desconhecido ao pesquisar amigo:', erro);
      }
    }
  }
  const handleAdicionarAmigo = async () => {
    // Certifique-se de que há um resultado de pesquisa antes de tentar adicionar
    if (resultadoPesquisa) {
      const { usuario_identifier } = resultadoPesquisa[0]; // usuário que está sendo adicionado como amigo
  
      try {
        // Você precisa obter o usuario_identifier do usuário logado, pode ser obtido de onde você armazena no seu estado.
        const usuarioLogado = "Afonso@0f0d2268-28e3-4f95-8716-337e0d30c3bf"; // Substitua isso pelo usuário logado
  
        const resposta = await fetch('https://api-planetscale-fawn.vercel.app/adicionar-usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ usuario_identifier: usuarioLogado, amigo_identifier: usuario_identifier }),
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