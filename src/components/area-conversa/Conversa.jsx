import imgGitAnonimus from '../../assets/img/img-git-Anonimo.jpg'
import svgSend from '../../assets/icons/send-fill.svg'

import useScript from './script'
export default function Conversa() {
    const {
        handleInputChange,
        inputValue,
        handleSendMensage,
        mensagens,
        imgSend

    } = useScript()
    return (
        <div className="container-conversa">
            <div className='content-conversa'>
                <div className='area-conversa'>
                    <div className='texto-conversa'>
                        <div className='profile-conversa'>
                            <div className='profile-conversa-user' >
                                <div className="profile-conversa-img-user">
                                    <img src={imgGitAnonimus} alt="img-user" />
                                </div>

                                <div className="profile-conversa-info-user">
                                    <div className="profile-conversa-name-user"><span>Name</span></div>
                                    <div className="status"><p>Status<span id='status-online'></span><span id='status-offline'></span> </p></div>
                                </div>
                            </div>
                        </div>
                        <div className="message received">
                            <p>Esta é uma mensagem recebida</p>
                        </div>

                        {mensagens && mensagens.map((mensagem, index) => (
                            <div className="message sent" key={index}>
                                <p>{mensagem}</p>
                            </div>
                        ))}

                    </div>
                    <div className='digit-text'>
                        <div className='input-text'>
                            <div className='input'>
                                <input type="text" id='text-mensagem' placeholder='Mensagem' value={inputValue} onChange={handleInputChange} />
                                <div className='img-send'>
                                    {imgSend && (
                                        <img src={svgSend} alt="img-enviar" onClick={handleSendMensage} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}