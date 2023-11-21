import svgAddUser from '../../assets/icons/plus-square-fill.svg'
import svgGrenage from '../../assets/icons/gear-fill.svg'
import svgSearch from '../../assets/icons/search.svg'
import imgGitAnonimus from '../../assets/img/img-git-Anonimo.jpg'
import useScript from './script'

export default function Navigation() {
    const {
        search,
        handleSearch,
    } = useScript()
    return (
        <div className='navigation'>
            <div className={`${search ? 'active-container-search' : 'container-search '}`} >
                <div className="container-results">
                    <div className='content-results'>
                        <div className='profile-results'>
                            <div className='results'>
                                <div className="results-img-user">
                                    <img src={imgGitAnonimus} alt="img-user" />
                                </div>
                                <div className="results-info-user">
                                    <div className="results-name-user "><span>Name</span></div>
                                    <div className="results-mensage-user"><p>Mensagem</p></div>
                                </div>
                            </div>
                            <div className='mensage-results'>
                                <p>Nenhum amigo encontrado!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='search-imput'>
                    <input type="text" id='pesquisar-amigo' placeholder='Pesquisar Amigo!' />
                    <div className='img-search'>
                        <img src={svgSearch} alt="img-search" />
                    </div>
                </div>
            </div>
            <div className='navigation-profile'>
                <div className="name-profile">
                    <span>Ola</span>
                    <p>Name</p>
                </div>
                <div className='grenage-add-user'>
                    <div className="grenage">
                        <img src={svgGrenage} alt="img-grenage" />
                    </div>
                    <div className='add-user'>
                        <div className='text-new-user'>
                            <p>Novo Amigo</p>
                        </div>
                        <div className='img-add-user' onClick={handleSearch}>
                            <img src={svgAddUser} alt="img-add-user" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}