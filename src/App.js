import ChatMensage from "./components/chat/Chat.js";
import Menu from "./components/menu/Menu.js";

export default function App() {
    return (
        <div className="container">
            <div className="content">
                <Menu/>
                <ChatMensage/>
            </div>
        </div>
    )
}