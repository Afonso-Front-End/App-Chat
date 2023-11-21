import Conversa from "./components/area-conversa/Conversa";
import Select from "./components/select-users/Select";

export default function App() {
    return (
        <div className="container">
            <div className="content">
                <Select/>
                <Conversa/>
            </div>
        </div>
    )
}