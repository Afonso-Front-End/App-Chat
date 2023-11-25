import { useState, useEffect } from "react";
import useDataToken from "../lista/script";

export default function useScript() {
  const [resultadoPesquisa, setResultadoPesquisa] = useState(null);
  const [WallperMensage, setWallperMensage] = useState(true)
  const [menssageResults, setMenssageResults] = useState('Pequise pelo indetificador!')

  const { userData, token } = useDataToken()

  const handlePesquisarUsuario = async () => {
    const inputPesquisa = document.getElementById('pesquisar-usuario');
    const usuario_identifier = inputPesquisa.value;

    if (inputPesquisa.value === '') {
      setMenssageResults('Digite algo!')
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

  const [listaSolicitacoesPendentes, setListaSolicitacoesPendentes] = useState([]);
  useEffect(() => {
    fetch('https://api-planetscale-fawn.vercel.app/solicitacoes-pendentes', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não autorizado');
        }
        return response.json();
      })
      .then((data) => {
        if (data.solicitacoesPendentes) {
          setListaSolicitacoesPendentes(data.solicitacoesPendentes);
        } else {
          console.log(data.message);
        }
      })
      .catch(() => { });
  }, [token]);

  console.log(listaSolicitacoesPendentes);

  return {
    resultadoPesquisa,
    handlePesquisarUsuario,
    handleEnviarSolicitacaoAmizade,
    WallperMensage,
    menssageResults,
    setWallperMensage
  }
}