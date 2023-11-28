import React from 'react';
import imgGitAnonimus from '../../assets/img/img-git-Anonimo.jpg'
import svgGrenage from '../../assets/icons/gear-fill.svg'
import svgSearch from '../../assets/icons/search.svg'
import svgNotification from '../../assets/icons/app-indicator.svg'
import DataToken from '../../scripts/dataToken';
import ListUsers from '../../scripts/listUsers';

export default function Menu() {
    const { TOKENDECODIFICADO } = DataToken()
    const { handleActive, Active } = ListUsers()
  
    return (
        <div className="container-lista-amizades">
            <ul className="content-lista-amizades">

                <li className="usuario-lista-amizades">

                    <div className='data-info-usuario'>
                        <div className="data-info-img-usuario">
                            <img src={imgGitAnonimus} alt="" />
                        </div>

                        <div className="data-info-info">
                            <div className="data-info-name"><span>nome</span></div>
                            <div className="data-info-mensage"><span>Mensagem</span></div>
                        </div>
                    </div>

                </li>

                <div className='container-wallper-mensage'>
                    <div className="content-wallper-mensage">

                        <div className='background-walper-img'>
                            <div className="wallper-mensage-text">
                                <div>
                                    <span>Nenhuma amizade encontrada!</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={`container-lista-usuarios-pendentes ${Active ? 'activeListaUsuarios' : ''}`}>
                    <div className='content-lista-usuarios-pendentes'>
                        <span>Solicitacoe de amizades pendentes!</span>
                        <div className='lista-usuarios-pendentes usuario-pendente' >
                            <div className='usuario-lita usuario-lista'>
                                <div className="img-usuario-lista">
                                    <img src={imgGitAnonimus} alt="img-user" />
                                </div>
                                <div className="info-usuario-lista">
                                    <span>USUARIO: nome</span>
                                    <p>mensage</p>
                                </div>
                            </div>
                            <div className='btn-aceitar-recusar'>
                                <button >Aceitar</button>
                                <button>Recusar</button>
                            </div>
                        </div>

                        <div className='mensage-lista-usuario-pedente'>
                            <span>Sem solicitacoes de amizades!</span>
                        </div>

                    </div>

                    <div className='container-pequisar-usuario'>
                        <div className='content-pequisar-usuario'>

                            <div className='content-resultados-da-pesquisa'>

                                <div className='resultado-perfil'>
                                    <div className="resultado-perfil-img">
                                        <img src={imgGitAnonimus} alt="img-user" />
                                    </div>

                                    <div className="resultado-info-perfil">
                                        <span>USUARIO: </span>
                                        <p>INDENTIFICADOR: </p>
                                        <p>ID: </p>
                                    </div>
                                </div>

                                <div className='resultado-pesquisa'>
                                    <p></p>
                                </div>


                            </div>

                            <div className='container-imput-pesquisar'>

                                <div className='content-imput-pesquisar'>
                                    <input type="text" id='pesquisar-usuario' placeholder='Pesquisar Amigo!' />
                                </div>

                                <div className='content-img-pesquisar' >
                                    <img src={svgSearch} alt="img-search" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </ul>

            <menu className='container-menu'>
                <div className='content-menu'>


                    <div className='nav-menu'>

                        <div className="container-data-usuario-logado">
                            <div className='content-data-usuario-logado'>

                                {/* { Informacoes do usuario Logado} */}
                                <div className='data-info-usuario-logado'>
                                    <div className='data-img-usuario-logado'>
                                        <img src={imgGitAnonimus} alt="Usuario logado" />
                                    </div>
                                    <div className='data-info-info-usuario-logado'>
                                        <p>{TOKENDECODIFICADO.nome}</p>
                                        <p>{TOKENDECODIFICADO.email}</p>
                                    </div>
                                </div>

                                <nav className='container-nav'>
                                    <div className='content-nav'>
                                        <div className='nav-btns'>
                                            <div className="nav-btn-img">
                                                <img src={svgGrenage} alt="img-grenage" />
                                            </div>

                                            <div className={`nav-btn-img ${Active ? 'nav-btn-img activeNavBtnImg' : ''}`} onClick={handleActive}>
                                                <img src={svgNotification} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </nav>

                            </div>
                        </div>

                    </div>
                </div>
            </menu>

        </div>
    )
}
