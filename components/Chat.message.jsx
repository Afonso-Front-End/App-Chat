import { useEffect, useRef, useState } from "react";
import imgSearch from '../assets/icons/search.svg'
import iconGithub from '../assets/icons/github.svg'
import iconPerson from '../assets/icons/person.svg'
import iconExite from '../assets/icons/exite.svg'
import iconBack from '../assets/icons/three-dots.svg'
import UseEvents from "../js/Events";
import DataToken from "../js/Token";


export default function Chat() {

    const messagesRef = useRef();

    const { userLog, exite, tempToken } = DataToken()

    const
        {
            chat, handleAdicioanar, handleMensagem, handleSearch, handleSelectUser,
            lista, listaUsuarios, mensagem, mensagemNotification, mensagemText,
            notification, results, resultsSearch, setMensagemText,
            setValue, userSelected, value, chatHistory, messageWelcome,
            activeProfile, profileConfig, status, handleOpenMenu, openMenu
        } = UseEvents()

        console.log(listaUsuarios)

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div className='content'>

            <div className="back" onClick={handleOpenMenu}>
                <button><img src={iconBack} alt="img-back" /></button>
            </div>

            <div className={`left  ${openMenu ? 'left-active' : ''}`}>
                <div className="profile">
                    <div className="profile-user-login">

                        <img className="profile-user-login-img" src={userLog.img} alt="profile-user-login-img" onClick={activeProfile} />

                        <div className="profile-user-login-data">
                            <div className="profile-user-login-data-info">
                                <p id="nome">{userLog.nome} <span id="status">{status}</span></p>
                                <p id="email">{userLog.email}</p>
                            </div>
                        </div>
                    </div>

                    {profileConfig && (
                        <div className="profile-config">

                            <div className="profile-config-profile">
                                <button className="profile-config-profile-button" onClick={activeProfile} > <img src={iconPerson} alt="icon-profile" /> Perfil<span></span></button>

                                <div className="profile-config-data-info">

                                    <img className="profile-config-img" src={userLog.img} alt="Imagem" />

                                    <div className="profile-config-info">
                                        <p id="nome"><span>Nome </span>{userLog.nome}</p>
                                        <p id="email"><span>E-mail </span>{userLog.email}</p>
                                        <p id="identifier">{userLog.identifier}</p>
                                    </div>
                                </div>
                            </div>

                            <button className="exite" onClick={exite}>Sair<span></span><img src={iconExite} alt="icon-sair" /></button>
                        </div>
                    )}
                </div>

                <div className="ToAdd">

                    <div className="search">
                        <input type="text" placeholder="Pesquisar" value={value} onChange={(e) => setValue(e.target.value)} />
                        <button onClick={handleSearch}><img src={imgSearch} alt="img_search" /></button>
                    </div>

                    {results && (
                        <div className="results" onClick={() => handleAdicioanar(resultsSearch)}>
                            <div>

                                <div className="results_img">
                                    <img src={resultsSearch.img} alt="Imagem" />
                                </div>
                                <div className="results_data">
                                    <p>{resultsSearch.nome}</p>
                                    <p>{resultsSearch.identifier}</p>
                                </div>
                            </div>

                        </div>

                    )}
                    {mensagem && (
                        <div className='notice'>
                            <p>{mensagem}</p>
                        </div>
                    )}

                </div>

                <div className="list-users">
                    {lista && (
                        <ul className="list">
                            {listaUsuarios && listaUsuarios.map((usuario, index) => (
                                <li key={index} className={`list-user-item ${userSelected.identifier === usuario.identifier ? 'list-user-item-active' : ''}`} onClick={() => handleSelectUser(usuario)}>

                                    <div className="list-user-img">
                                        <img src={usuario.url_imagem} alt="list-user-img" />
                                    </div>

                                    <div className="list-user-data">
                                        <div className="list-user-info">
                                            <p id="nome">{usuario.nome}</p>
                                            <p id="email">{usuario.email}</p>
                                        </div>
                                        <p id="status" style={{ color: usuario.status === 'online' ? '#0CF25D' : '#FF7F60' }}>{usuario.status}</p>
                                    </div>
                                    <span></span>
                                </li>

                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className='rigth'>
                <div className={`notification ${notification ? 'active-notification' : 'notification'}`}>
                    {notification && (
                        <div className="mensagem-notification">
                            <div className="tags_msg">
                                <p>{mensagemNotification.mensagem.nome} Adicionou vocé!</p>
                            </div>
                            <div className="profile_notification">
                                <div className="profile_notification_img">
                                    <img src={mensagemNotification.mensagem.img} alt="Imagem" />
                                </div>
                                <div className="profile_notification_data">
                                    <p>{mensagemNotification.mensagem.nome}</p>
                                    <p>{mensagemNotification.mensagem.identifier}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="container-chat">
                    {chat && (
                        <div className="content-chat">
                            <div className='profile-user-selected'>
                                <div className="profile-user-selected-img">
                                    <img src={userSelected.url_imagem} alt="profile-user-selected-img" />
                                </div>

                                <div className="profile-user-data">
                                    <div className="profile-user-info">
                                        <p id="nome">{userSelected.nome}</p>
                                        <p id="email">{userSelected.email}</p>
                                    </div>
                                </div>
                            </div>

                            <ul ref={messagesRef} className="content-messages">
                                {chatHistory && chatHistory.map((message, index) => (
                                    <li key={index} className="profile-message"

                                        style={{
                                            alignSelf: message.destinatario === `${userLog.identifier}` ? 'flex-start' : 'flex-end',
                                            flexDirection: message.destinatario !== `${userLog.identifier}` ? 'row-reverse' : 'row'
                                        }} >

                                        <div className="profile-message-img">
                                            <img src={message.img} alt="profile-message-img" />
                                        </div>

                                        <div className="profile-data-info" >
                                            <div className="profile-data"
                                                style={{ flexDirection: message.destinatario !== `${userLog.identifier}` ? 'row-reverse' : 'row' }}>

                                                <div className="new-date" style={{ flexDirection: message.destinatario !== `${userLog.identifier}` ? 'row-reverse' : 'row' }}>
                                                    <p> {new Date(message.hora).toLocaleString()} </p>
                                                </div>

                                                <div className="profile-info" style={{ flexDirection: message.destinatario !== `${userLog.identifier}` ? 'row-reverse' : 'row' }}>
                                                    {message.destinatario === `${userLog.identifier}` ? 'De ' : 'Eu '}
                                                    {message.nome}
                                                </div>

                                            </div>

                                            <div className="content-message-text" style={{ color: message.destinatario === `${userLog.identifier}` ? '#A69581' : '#A4B3BF', flexDirection: message.destinatario !== `${userLog.identifier}` ? 'row-reverse' : 'row', textAlign: 'end' }}>
                                                <p id="message">{message.message}</p>
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <form id="form" onSubmit={(e) => { e.preventDefault(); }}>
                                <input id="input" autoComplete='off' value={mensagemText} onChange={(e) => setMensagemText(e.target.value)} />
                                <button onClick={handleMensagem}>Send</button>
                            </form>
                        </div>
                    )}
                </div>

                {messageWelcome && (
                    <div className="boas_vindas">
                        <div className="coll">
                            <div className="coll-boas_vindas">
                                <span></span>
                                <h1>Welcome</h1>
                                <p>my friend</p>
                            </div>
                        </div>
                        <button id="btn-link-github"><img src={iconGithub} alt="" /><a href="https://github.com/Afonso-Front-End" target="_blank">Desenvolver</a></button>
                    </div>
                )}
            </div>
        </div>
    )
}