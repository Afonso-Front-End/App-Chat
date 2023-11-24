import Chat from "./components/chat/Chat.jsx";
import Lista from "./components/lista/Lista.jsx";


export default function App() {
    return (
        <div className="container">
            <div className="content">
                <Chat/>
                <Lista/>
            </div>
        </div>
    )
}