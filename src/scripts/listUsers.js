import { useState } from "react";

export default function ListUsers(){
    const [Active, setActive] = useState(false)

    const handleActive = () => {
        setActive(!Active)
    }

    return{
        handleActive,
        Active
    }
}