import svgAddUser from '../../assets/icons/plus-square-fill.svg'
import svgGrenage from '../../assets/icons/gear-fill.svg'
import svgSearch from '../../assets/icons/search.svg'
import imgGitAnonimus from '../../assets/img/img-git-Anonimo.jpg'
import svgNotification from '../../assets/icons/app-indicator.svg'
import useScript from './script'
import useDataToken from '../select-users/script'

export default function Navigation() {

    const {
        search,
        handleSearch,
        handlePesquisarUsuario,
        resultadoPesquisa,
        handleEnviarSolicitacaoAmizade,
        menssageResults,

    } = useScript()

    const {
        userData,
        oppenListSolicitacoes,
        solicitacoes
    } = useDataToken()

    return (
        <div className='navigation'>
            <div className={`${search ? 'active-container-search' : 'container-search '}`} >
                <div className="container-results">
                    <div className='content-results'>
                        <div className='profile-results'>
                            {resultadoPesquisa && resultadoPesquisa.map(usuario => (
                                <div className='results' key={usuario.id} onClick={handleEnviarSolicitacaoAmizade}>
                                    <div className="results-img-user">
                                        <img src={imgGitAnonimus} alt="img-user" />
                                    </div>
                                    <div className="results-info-user">
                                        <div className="results-name-user ">
                                            <span>USUARIO: {usuario.nome} </span>
                                        </div>
                                        <div className="results-mensage-user">
                                            <p>INDENTIFICADOR: {usuario.usuario_identifier}</p>
                                        </div>
                                        {/* <p>ID: {amigo.id}</p> */}
                                    </div>
                                </div>
                            ))}
                            {menssageResults && (
                                <div className='mensage-results'>
                                    <div className='text-results'>
                                        <p>{menssageResults}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='search-imput'>

                    <div className='div-input'>
                        <input type="text" id='pesquisar-amigo' placeholder='Pesquisar Amigo!' />
                    </div>

                    <div className='img-search' onClick={handlePesquisarUsuario}>
                        <img src={svgSearch} alt="img-search" />
                    </div>
                </div>
            </div>

            <div className={`area-solicitacoes-amizades ${solicitacoes ? 'active-area-solicitacoes-amizades' : ''}`}>
                <div className='text-mensagem'>
                    <span>Sem solicitacoes de amizades!</span>
                </div>
            </div>

            <div className='navigation-profile'>

                <div className="name-profile">
                    <span>Ola</span>
                    {userData && (
                        <p>{userData.nome}</p>
                    )}
                </div>

                <div className='grenage-add-user'>
                    <div className="grenage">
                        <img src={svgGrenage} alt="img-grenage" />
                    </div>
                    <div className='add-user'>
                        {/* <div className='text-new-user'>
                            <p>Novo Amigo</p>
                        </div> */}
                        <div className='img-add-user'>
                            <img src={svgAddUser} alt="img-add-user" onClick={handleSearch} />
                        </div>
                    </div>
                    <div className='img-solicitacoes' onClick={oppenListSolicitacoes}>
                        <img src={svgNotification} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )

}