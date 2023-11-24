import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function useDataToken() {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null)
  const [activeNavBTNimg, setNavBTNimg] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');

    if (tokenFromURL) {
      localStorage.setItem('token', tokenFromURL);
      setToken(tokenFromURL);

      const decodedToken = jwtDecode(tokenFromURL);
      setUserData(decodedToken)
    }
  }, [token]);
  
  const [solicitacoes, setSolicitacoes] = useState(false)
  const listaPendentes = () => {
    setSolicitacoes(!solicitacoes);
    setNavBTNimg(!activeNavBTNimg)
  }

  return {
    userData,
    token,
    listaPendentes,
    solicitacoes,
    activeNavBTNimg
  }
}