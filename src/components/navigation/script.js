import { useState, useEffect , useCallback} from "react";
import useDataToken from "../select-users/script";

export default function useScript() {
  const [search, setSearch] = useState(false)
  const [resultadoPesquisa, setResultadoPesquisa] = useState(null);
  const [listaAmizades, setListaAmizades] = useState([]);
  const [mensagemAviso, setMensagemAviso] = useState(true)

  const { userData, token } = useDataToken()

  const handleListarAmizades = useCallback(async () => {
    try {
      const resposta = await fetch('https://api-planetscale-fawn.vercel.app/lista-de-amizades', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        setListaAmizades(dados.amigos);
      } else {
        console.error('Erro ao listar amizades:', resposta.statusText);
      }
    } catch (erro) {
      console.error('Erro de rede ao listar amizades:', erro);
    }
  }, [token]);
  
  if (listaAmizades.length > 0) {
    setMensagemAviso(false)
  }else{
    setMensagemAviso(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await handleListarAmizades();
      }
    };

    fetchData();
  }, [handleListarAmizades, token]);

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
        const usuarioLogado = userData.usuario_identifier; // Substitua isso pelo usuário logado

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
    handleAdicionarAmigo,
    listaAmizades,
    mensagemAviso
  }
}