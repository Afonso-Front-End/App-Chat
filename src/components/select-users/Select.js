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

        // Obtendo o token do armazenamento (por exemplo, localStorage)
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        // Decodificando o token para obter as informações do usuário
        const decodedUserInfo = decodeToken(token);

        // Atualizando o estado com as informações do usuário
        setUserInfo(decodedUserInfo);
    }, []);

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