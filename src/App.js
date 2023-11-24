import Chat from "./components/chat/chat";
import Lista from "./components/lista/lista";


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