import React, { useState, useEffect } from 'react';

import imgGitAnonimus from '../../assets/img/img-git-Anonimo.jpg'
import Navigation from '../navigation/Navigation'

export default function Select() {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Recupera o token da URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');

    // Armazena o token no localStorage
    if (tokenFromURL) {
      localStorage.setItem('token', tokenFromURL);
      setToken(tokenFromURL);
    }
  }, []); 

  console.log(token)

  return (
    <div className="area-select-user">
      <ul className="items-users">
        <li className="user">
          <div className="img-user">
            <img src={imgGitAnonimus} alt="img-user" />
          </div>

          <div className="info-user">
            <div className="name-user"><span>Name</span></div>
            <div className="mensage-user"><p>Mensagem</p></div>
          </div>
        </li>
      </ul>
      <Navigation />
    </div>
  )
}
