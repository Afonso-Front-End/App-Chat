import { useCallback, useEffect, useState } from "react";
import DataToken from "./dataToken";
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const ListUsers = () => {
    const { TOKEN, TOKENDECODIFICADO } = DataToken();
    const [Active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [msgSearchResults, setMsgSearchResults] = useState('Pesquise pelo identificador!');
    const [listUsersPending, setListListUsersPending] = useState([]);

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
                    socket.emit('friendRequestSent', { friendIdentifier });
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
        const DATA_BASE = "https://app-chat-anonimus.netlify.app";
        try {
            console.log('Iniciando requisição para obter solicitações pendentes...');
            const response = await fetch(`${DATA_BASE}/friend-requests/${TOKENDECODIFICADO.identifier}/pending`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json",
                },
            });

            socket.on('connect', () => {
                const userId = TOKENDECODIFICADO.identifier; // Substitua pelo identificador real do usuário
                socket.emit('registerUserId', userId);
            });

            console.log(response)
            if (response.ok) {
                const data = await response.json();
                if (data.success === true) {
                    const pendingRequests = data.pendingRequests;
                    setListListUsersPending(pendingRequests);
                    console.log(pendingRequests)
                } else {
                    console.log('Erro ao obter as solicitações pendentes:', data.message);
                }
            } else {
                console.log('Erro ao obter as solicitações pendentes:', response.statusText);
                console.log(response);
            }
        } catch (error) {
            console.error('Erro na solicitação de obter as solicitações pendentes:', error);
        }
    }, [TOKEN, TOKENDECODIFICADO]);

    useEffect(() => {
        const handleFriendRequestSent = () => {
            fetchPendingRequests(); // ou qualquer outra lógica que você queira realizar
        };

        try {
            if (socket.connected) {
                socket.on('friendRequestSent', handleFriendRequestSent);
            }
        } catch (error) {
            console.error('Erro ao ouvir eventos do Socket.io:', error);
        }

        return () => {
            socket.off('friendRequestSent', handleFriendRequestSent);
        };
    }, [fetchPendingRequests]);

    useEffect(() => {
        fetchPendingRequests();
    }, [fetchPendingRequests]);

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
        listUsersPending
    };
};

export default ListUsers;
