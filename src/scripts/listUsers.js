import { useState } from "react";
import DataToken from "./dataToken";
export default function ListUsers() {
    const { TOKEN } = DataToken()
    const [Active, setActive] = useState(false)

    const handleActive = () => {
        setActive(!Active)
    }

    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [msgSearchResults, setMsgSearchResults] = useState('Pesquise pelo identificador!')

    // const DATA_BASE = "https://api-planetscale-fawn.vercel.app"
    const DATA_BASE = "http://localhost:3001"
    const handleSearch = async () => {
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
                // Verificar se a resposta possui a chave 'user' e se 'user' é um objeto
                if (data.success && typeof data.user === 'object') {
                    // Converta o objeto 'user' em um array para ser manipulado
                    const userArray = [data.user];
                    setSearchResults(userArray);
                    setMsgSearchResults(null)
                } else {
                    setMsgSearchResults('Usuario nao encontrado!')
                    return data;
                }
            } else {
                console.error("Erro ao realizar a pesquisa:", response.statusText);
            }
        } catch (error) {
            console.error("Erro na solicitação de pesquisa:", error);
        }
    }

    return {
        handleActive,
        Active,
        searchQuery,
        setSearchQuery,
        handleSearch,
        searchResults,
        msgSearchResults,
    }
}