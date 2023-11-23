import { useState, useEffect, useCallback } from "react";
import useDataToken from "../select-users/script";

export default function useScript() {
  const [search, setSearch] = useState(false)
  const [resultadoPesquisa, setResultadoPesquisa] = useState(null);
  const [listaAmizades, setListaAmizades] = useState([]);
  const [mensagemAviso, setMensagemAviso] = useState(true)
  const [menssageResults, setMenssageResults] = useState(false)

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

        setMensagemAviso(dados.amigos.length === 0);
      } else { }
    } catch {

    }
  }, [token]);


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

    if (inputPesquisa.value === '') {
      console.log('Digite algo.');
    } else {
      try {
        const resposta = await fetch(`https://api-planetscale-fawn.vercel.app/buscar-usuario/${usuario_identifier}`);

        if (resposta.status === 200) {
          const dados = await resposta.json();
          setResultadoPesquisa(dados.usuario);
          setMenssageResults('')
        } else if (resposta.status === 204) {
          setResultadoPesquisa(null);
          setMenssageResults('Nenhum usuario encontrado')
        }
      } catch (error) {
        console.error('Erro ao pesquisar amigo:');
      }
    }
  };

  const handleEnviarSolicitacaoAmizade = async () => {
    // Certifique-se de que há um resultado de pesquisa antes de tentar enviar a solicitação
    if (resultadoPesquisa) {
      const { usuario_identifier } = resultadoPesquisa[0]; // usuário que está sendo enviado a solicitação de amizade
  
      try {
        // Você precisa obter o usuario_identifier do usuário logado, pode ser obtido de onde você armazena no seu estado.
        const remetente_identifier = userData.usuario_identifier; // Substitua isso pelo usuário logado
  
        const resposta = await fetch('https://api-planetscale-fawn.vercel.app/enviar-solicitacao-amizade', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ remetente_identifier, destinatario_identifier: usuario_identifier }),
        });
  
        if (resposta.ok) {
          console.log('Solicitação de amizade enviada com sucesso!');
          // Limpar o resultado da pesquisa após o envio bem-sucedido, se desejar
          setResultadoPesquisa(null);
        } else {
          console.error('Erro ao enviar solicitação de amizade:', resposta.statusText);
        }
      } catch (erro) {
        console.error('Erro de rede ao enviar solicitação de amizade:', erro);
      }
    }
  };
  

  // const handleAdicionarAmigo = async () => {
  //   // Certifique-se de que há um resultado de pesquisa antes de tentar adicionar
  //   if (resultadoPesquisa) {
  //     const { usuario_identifier } = resultadoPesquisa[0]; // usuário que está sendo adicionado como amigo

  //     try {
  //       // Você precisa obter o usuario_identifier do usuário logado, pode ser obtido de onde você armazena no seu estado.
  //       const usuarioLogado = userData.usuario_identifier; // Substitua isso pelo usuário logado

  //       const resposta = await fetch('https://api-planetscale-fawn.vercel.app/adicionar-usuario', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ usuario_identifier: usuarioLogado, amigo_identifier: usuario_identifier }),
  //       });

  //       if (resposta.ok) {
  //         console.log('Amigo adicionado com sucesso!');
  //         // Limpar o resultado da pesquisa após a adição bem-sucedida, se desejar
  //         setResultadoPesquisa(null);
  //       } else {
  //         console.error('Erro ao adicionar amigo:', resposta.statusText);
  //       }
  //     } catch (erro) {
  //       console.error('Erro de rede ao adicionar amigo:', erro);
  //     }
  //   }
  // };

  const handleSearch = () => {
    setSearch(!search)
  }

  return {
    handleSearch,
    search,
    resultadoPesquisa,
    handlePesquisarAmigo,
    handleEnviarSolicitacaoAmizade,
    listaAmizades,
    mensagemAviso,
    menssageResults,
  }
}