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

    window.addEventListener('keyup', (event)=>{
        const key = event.keyCode
        if(key === 13){
            handleSendMensage()
        }
    })
   
    const handleSendMensage = () => {
        if (inputValue.trim() !== '') {
            setMensagens([...mensagens, inputValue]);
            setInputValue('');
        }
    }
    return{
        handleInputChange,
        inputValue,
        handleSendMensage,
        mensagens,
        imgSend
    }
}