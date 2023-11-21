import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import imgGitAnonimus from '../../assets/img/img-git-Anonimo.jpg'
import Navigation from '../navigation/Navigation'


export default function Select() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Função para decodificar o token
    const decodeToken = (token) => {
      try {
        if (typeof token === "string") {
          const decoded = jwtDecode(token);
          return decoded;
        } else {
          console.error("O token não é uma string válida:", token);
          return null;
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
      }
    };

    // Obtendo o token do localStorage do outro domínio
    const otherDomainToken = window.localStorage.getItem('token');

    // Se houver um token do outro domínio
    if (otherDomainToken) {
      // Decodificando o token para obter as informações do usuário
      const decodedUserInfo = decodeToken(otherDomainToken);

      // Atualizando o estado com as informações do usuário
      setUserInfo(decodedUserInfo);
    } else {
      console.error('Token do outro domínio não encontrado.');
    }

    // Ouvinte para a mensagem enviada pela página de login
    const messageListener = (event) => {
      // Verifique se a origem da mensagem é a esperada
      if (event.origin === 'https://login-users-systen.netlify.app') {
        // Verifique se a mensagem contém um token válido
        if (event.data && event.data.token) {
          const token = event.data.token;
  
          // Faça algo com o token
          console.log('Token recebido:', token);
        } else {
          console.error('Mensagem inválida - Token ausente');
        }
      }
    };

    // Adiciona o ouvinte de mensagem
    window.addEventListener('message', messageListener);

    // Remove o ouvinte de mensagem quando o componente é desmontado
    return () => {
      window.removeEventListener('message', messageListener);
    };
  }, []);

  console.log(userInfo);

  console.log(userInfo)
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