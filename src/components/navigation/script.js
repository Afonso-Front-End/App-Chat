import { useState } from "react";

export default function useScript() {
    const [search, setSearch] = useState(false)

    const handleSearch = () => {
        setSearch(!search)
    }

    return{
        handleSearch,
        search,
    }
}