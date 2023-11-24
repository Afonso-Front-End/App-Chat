import ChatMensage from "./components/chat/Conversa.jsx";
import Lista from "./components/lista/Lista.js";


export default function App() {
    return (
        <div className="container">
            <div className="content">
                <Lista/>
                <ChatMensage/>
            </div>
        </div>
    )
}