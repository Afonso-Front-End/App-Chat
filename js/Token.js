import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export default function DataToken() {
    const [userLog, setUserLog] = useState([]);
    const [token, setToken] = useState(null);
    const [tempoRestante, setTempoRestante] = useState(null);
    const [tempToken, setTempToken] = useState(null)

    useEffect(() => {
        const decodeToken = (token) => {
            try {
                return typeof token === "string" ? jwtDecode(token) : null;
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                return null;
            }
        };

        const validToken = (exp) => exp - (new Date().getTime() / 1000);

        const processToken = (tokenValue) => {
            const decodedToken = decodeToken(tokenValue);

            if (decodedToken) {
                setUserLog({
                    nome: decodedToken.nome,
                    email: decodedToken.email,
                    identifier: decodedToken.identifier,
                    img: decodedToken.url_imagem,
                });

                setToken(tokenValue);

                let tempoRestanteToken = validToken(decodedToken.exp);
                setTempoRestante(tempoRestanteToken);


                setInterval(() => {
                    const totalSegundos = tempoRestanteToken;
                    const dias = Math.floor(totalSegundos / 86400);
                    const horas = Math.floor((totalSegundos % 86400) / 3600);
                    const minutos = Math.floor(((totalSegundos % 86400) % 3600) / 60);
                    const segundos = Math.floor(((totalSegundos % 86400) % 3600) % 60);

                    // console.log(`${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos.`);
                    setTempToken(`${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos.` )

                    tempoRestanteToken--;
                    if (tempoRestanteToken <= 0) {
                        localStorage.removeItem("token");
                        console.log("Token expirado, removido do localStorage.");
                        // alert()
                        window.location.assign('https://login-users-systen.netlify.app/')
                    }
                }, 1000);

            } else {
                console.log(`Token inválido ou não decodificado corretamente: ${tokenValue}`);
            }
        };

        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromURL = urlParams.get('token');

        if (tokenFromURL) {
            localStorage.setItem("token", tokenFromURL);
            processToken(tokenFromURL);

            // Remova o token da URL após o processamento
            urlParams.delete('token');
            const newUrl = window.location.pathname + "token processado?" + urlParams.toString();
            window.history.replaceState({}, '', newUrl);
        } else {
            const tokenNoLocalStorage = localStorage.getItem("token");
            if (tokenNoLocalStorage) {
                processToken(tokenNoLocalStorage);
            } else {
                alert('Nenhum token');
                window.location.assign('https://login-users-systen.netlify.app/')
            }
        }
    }, []);

    const exite = () => {
        localStorage.removeItem("token");
        window.location.assign('https://login-users-systen.netlify.app/')
    }
    return {
        token,
        userLog,
        tempoRestante,
        exite,
        tempToken,
    };
}
