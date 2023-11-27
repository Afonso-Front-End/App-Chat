import imgGitAnonimus from '../../assets/img/img-git-Anonimo.jpg'
import svgSend from '../../assets/icons/send-fill.svg'


export default function Conversa() {
    
    return (
        <div className="container-chat">
            <div className='content-chat'>

                <div className='topo-chat'>
                    <div className='topo-chat-usuario' >
                        <div className="topo-img-chat-usuario">
                            <img src={imgGitAnonimus} alt="img-user" />
                        </div>

                        <div className="topo-info-chat-usuario">
                            <div className="profile-conversa-name-user"><span>Name</span></div>
                            <div className="chat-status">
                                <p>Status<span id='chat-status-online'></span><span id='chat-status-offline'></span></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='chat'>
                    <div className='chat-mensage'>
                        <div className="message received">
                            <p>Esta é uma mensagem recebida</p>
                        </div>

                        <div className="message sent" >
                            <p>Esta é uma mensagem enviada</p>
                        </div>

                    </div>
                </div>

                <div className='container-input-mensage-chat'>
                    <div className='content-input-mensage-chat'>
                        <div className='input-mensage-chat'>
                            <input type="text" id='text-mensagem' placeholder='Mensagem' />

                            <div className='img-send'>
                                <img src={svgSend} alt="img-enviar" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}