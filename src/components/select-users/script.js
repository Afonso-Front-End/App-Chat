import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function useDataToken() {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null)


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');

    if (tokenFromURL) {
      localStorage.setItem('token', tokenFromURL);
      setToken(tokenFromURL);

      // Decodificar o token JWT
      const decodedToken = jwtDecode(tokenFromURL);
      setUserData(decodedToken)
    }
  }, [token]);
  
  const [solicitacoes, setSolicitacoes] = useState(false)

 
  const oppenListSolicitacoes = () => {
    setSolicitacoes(!solicitacoes);

  }

  return {
    userData,
    token,
    oppenListSolicitacoes,
    solicitacoes
  }
}