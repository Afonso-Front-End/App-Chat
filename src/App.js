import Chat from "./components/chat/Chat";
import Lista from "./components/lista/Lista";


export default function App() {
    return (
        <div className="container">
            <div className="content">
                <Lista/>
                <Chat/>
            </div>
        </div>
    )
}