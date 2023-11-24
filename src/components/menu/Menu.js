import svgGrenage from '../../assets/icons/gear-fill.svg'
import svgSearch from '../../assets/icons/search.svg'
import imgGitAnonimus from '../../assets/img/img-git-Anonimo.jpg'
import svgNotification from '../../assets/icons/app-indicator.svg'
import useScript from './script'
import useDataToken from '../lista/script' /** script /select-users/script **/

export default function Navigation() {

    const {
        handlePesquisarUsuario,
        resultadoPesquisa,
        handleEnviarSolicitacaoAmizade,
        menssageResults,

    } = useScript()

    const {
        userData,
        listaPendentes,
        solicitacoes,
        activeNavBTNimg,
    } = useDataToken()

    return (
        <menu className='container-menu'>
            <div className={`container-lista-usuarios-pendentes ${solicitacoes ? 'active-lista-usuarios-pendentes' : ''}`}>
                <div className='content-lista-usuarios-pendentes'>
                    <span>Solicitacoe de amizades pendentes!</span>
                    <div className='lista-usuarios-pendentes'>
                        <div className='usuario-lita'>
                            <div className="img-usuario-lista">
                                <img src={imgGitAnonimus} alt="img-user" />
                            </div>
                            <div className="info-usuario-lista">
                                <span>USUARIO: </span>
                                <p>INDENTIFICADOR: </p>
                            </div>
                        </div>
                        <div className='btn-aceitar-recusar'>
                            <button>Aceitar</button>
                            <button>Recusar</button>
                        </div>
                    </div>
                    <div className='mensage-lista-usuario-pedente'>
                        <span>Sem solicitacoes de amizades!</span>
                    </div>
                </div>
            </div>

            <div className='content-menu'>
                <div className='container-pequisar-usuario'>
                    <div className='content-pequisar-usuario'>

                        <div className='content-resultados-da-pesquisa'>
                            {resultadoPesquisa && resultadoPesquisa.map(resultado => (
                                <div className='resultado-perfil' key={resultado.id} onClick={handleEnviarSolicitacaoAmizade}>
                                    <div className="resultado-perfil-img">
                                        <img src={imgGitAnonimus} alt="img-user" />
                                    </div>

                                    <div className="resultado-info-perfil">
                                        <span>USUARIO: {resultado.nome}</span>
                                        <p>INDENTIFICADOR: {resultado.usuario_indetifier}</p>
                                        <p>ID: {resultado.id}</p>
                                    </div>
                                </div>
                            ))}

                            {menssageResults && (
                                <div className='resultado-pesquisa'>
                                    <p>{menssageResults}</p>
                                </div>
                            )}

                        </div>

                        <div className='container-imput-pesquisar'>

                            <div className='content-imput-pesquisar'>
                                <input type="text" id='pesquisar-usuario' placeholder='Pesquisar Amigo!' />
                            </div>

                            <div className='content-img-pesquisar' onClick={handlePesquisarUsuario}>
                                <img src={svgSearch} alt="img-search" />
                            </div>

                        </div>
                    </div>
                </div>

                <div className='nav-menu'>

                    <div className="container-data-usuario-logado">
                        <div className='content-data-usuario-logado'>
                            <div className='data-info-usuario-logado'>
                                <div className='data-img-usuario-logado'>
                                    <img src={imgGitAnonimus} alt="Usuario logado" />
                                </div>
                                <div className='data-info-info-usuario-logado'>
                                    nome
                                    {userData && (
                                        <p>{userData.nome}</p>
                                    )}
                                </div>
                            </div>

                            <nav className='container-nav'>
                                <div className='content-nav'>
                                    <div className='nav-btns'>
                                        <div className="nav-btn-img">
                                            <img src={svgGrenage} alt="img-grenage" />
                                        </div>
                                       
                                        <div className={`nav-btn-img ${activeNavBTNimg ? 'active-nav-btn-img' : ''}`} onClick={listaPendentes}>
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
    )

}