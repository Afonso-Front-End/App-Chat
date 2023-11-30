import { useCallback, useEffect, useState } from "react";
import DataToken from "./dataToken";

import { io } from "socket.io-client";
const socket = io('https://api-planetscale-fawn.vercel.app/');

const ListUsers = () => {
    socket.on('connect', () => {
        console.log('Conectado ao servidor Socket.IO');
    });

    const { TOKEN, TOKENDECODIFICADO } = DataToken();
    const [Active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [msgSearchResults, setMsgSearchResults] = useState('Pesquise pelo identificador!');
    const [listUsersPending, setListUsersPending] = useState([]);

    const handleActive = () => {
        setActive(!Active);
    }

    const handleSearch = async () => {
        setLoading(true);
        // const DATA_BASE = "http://localhost:3001";
        const DATA_BASE = "https://app-chat-anonimus.netlify.app";
        try {
            const response = await fetch(`${DATA_BASE}/get-user/${searchQuery}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && typeof data.user === 'object') {
                    const userArray = [data.user];
                    setSearchResults(userArray);
                    setMsgSearchResults(null);
                } else {
                    setMsgSearchResults('Usuario nao encontrado!');
                    return data;
                }
            } else {
                console.error("Erro ao realizar a pesquisa:", response.statusText);
            }
        } catch (error) {
            console.error("Erro na solicitação de pesquisa:", error);
        } finally {
            setLoading(false);
        }
    }

    const sendFriendRequest = async (friendIdentifier) => {
        // const DATA_BASE = "http://localhost:3001";
        const DATA_BASE = "https://app-chat-anonimus.netlify.app";

        try {
            const response = await fetch(`${DATA_BASE}/send-request/${friendIdentifier}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success === true) {
                    setSearchResults([]);
                    setSearchQuery("");
                    setMsgSearchResults('Solicitacao enviada com sucesso!');

                } else {
                    setMsgSearchResults('Ja enviado!');
                }
            } else {
                console.log("Erro ao enviar a solicitação de amizade:", response.statusText);
            }
        } catch (error) {
            console.error("Erro na solicitação de amizade:", error);
        }
    };

    const fetchPendingRequests = useCallback(async () => {
        // const DATA_BASE = "http://localhost:3001";
        const DATA_BASE = "https://api-planetscale-fawn.vercel.app";
        try {
            const response = await fetch(`${DATA_BASE}/friend-requests/${TOKENDECODIFICADO.identifier}/pending`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();

                if (Array.isArray(data.pendingRequests)) {
                    setListUsersPending(data.pendingRequests);
                } else {
                    console.log('Erro: A resposta não contém solicitações pendentes válidas.');
                }
            } else {
                console.log('Erro ao obter as solicitações pendentes:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na solicitação de obter as solicitações pendentes:', error);
        }
    }, [TOKEN, TOKENDECODIFICADO]);

    useEffect(() => {
        fetchPendingRequests();
    }, [fetchPendingRequests]);

    const handleAcceptFriendRequest = async (receiverIdentifier, senderIdentifier) => {
        try {
            // const DATA_BASE = "http://localhost:3001";
            const DATA_BASE = "https://api-planetscale-fawn.vercel.app";

            const response = await fetch(`${DATA_BASE}/friend-requests/accept`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ receiverIdentifier, senderIdentifier }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Resposta da API ao aceitar a solicitação:', data);


                if (data.success) {
                    // Atualize a lista de solicitações pendentes após a aceitação
                    // Exiba uma mensagem de sucesso
                    setListUsersPending((prevList) =>
                        prevList.filter((request) => request.user.identifier !== senderIdentifier)
                    );
                } else {
                    console.log('Erro ao aceitar a solicitação de amizade:', data.message);
                    // Exiba uma mensagem de erro
                }
            } else {
                console.log('Erro ao aceitar a solicitação de amizade:', response.statusText);
                console.log(response);
                // Exiba uma mensagem de erro
            }
        } catch (error) {
            console.error('Erro ao aceitar a solicitação de amizade:', error);
            // console.log('Resposta da API ao aceitar a solicitação:', data);
            console.log('Tipo de data:', typeof data);
            // Exiba uma mensagem de erro
        }
    };


    return {
        handleActive,
        Active,
        searchQuery,
        setSearchQuery,
        handleSearch,
        searchResults,
        msgSearchResults,
        sendFriendRequest,
        loading,
        listUsersPending,
        handleAcceptFriendRequest,
    };
};

export default ListUsers;
