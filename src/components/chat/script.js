import { useState } from "react"
export default function useScript(){
    const [inputValue, setInputValue] = useState('')
    const [mensagens, setMensagens] = useState('')
    const [imgSend, setImgSend] = useState(false)

    const handleInputChange = (event) => {
        setInputValue(event.target.value)

        if (event.target.value.length > 0) {
            setImgSend(true)
        }else{
            setImgSend(false)
        }

    }

    window.addEventListener('keyup', (event) => {
        handleKeyPress(event);
    });

    const handleKeyPress = (event) => {
        const key = event.key;
        
        if (key === 'Enter') {
            if (inputValue.trim().length > 0) {
                handleSendMessage();
            }
        }
    };
    
    const handleSendMessage = () => {
        setMensagens([...mensagens, inputValue.trim()]);
        setInputValue('');
        setImgSend(false);
    };
    
   
    

    return{
        handleInputChange,
        inputValue,
        handleSendMessage,
        mensagens,
        imgSend
    }
}