import { useState } from 'react'
import svgAddUser from '../../assets/icons/plus-square-fill.svg'
import svgGrenage from '../../assets/icons/gear-fill.svg'
import svgSearch from '../../assets/icons/search.svg'
import imgGitAnonimus from '../../assets/img/img-git-Anonimo.jpg'
import useScript from './script'
import useDataToken from '../select-users/script'

export default function Navigation() {
    const {
        search,
        handleSearch,
    } = useScript()

    const {
        userData,
    } = useDataToken()

    // console.log(userData)

    const [resultadoPesquisa, setResultadoPesquisa] = useState(null);

    const handlePesquisarAmigo = async () => {
        const inputPesquisa = document.getElementById('pesquisar-amigo');
        const identifier = inputPesquisa.value;

        try {
            const resposta = await fetch(`https://api-planetscale-fawn.vercel.app/buscar-amigo/${identifier}`);
            const dados = await resposta.json();

            if (resposta.ok) {
                setResultadoPesquisa(dados.amigo);
            } else {
                setResultadoPesquisa(null);
                console.error('Erro ao pesquisar amigo:', dados.erro);
            }
        } catch (erro) {
            console.error('Erro ao pesquisar amigo:', erro);

            if (erro instanceof TypeError && erro.message === 'Failed to fetch') {
                // Erro de rede
                console.error('Erro de rede ao pesquisar amigo:', erro);
            } else {
                // Outro tipo de erro
                console.error('Erro desconhecido ao pesquisar amigo:', erro);
            }
        }

    };


    return (
        <div className='navigation'>
            <div className={`${search ? 'active-container-search' : 'container-search '}`} >
                <div className="container-results">
                    <div className='content-results'>
                        <div className='profile-results'>
                            {resultadoPesquisa && resultadoPesquisa.map(amigo => (
                                <div className='results' key={amigo.id}>
                                    <div className="results-img-user">
                                        <img src={imgGitAnonimus} alt="img-user" />
                                    </div>
                                    <div className="results-info-user">
                                        <div className="results-name-user ">
                                            <span>USUARIO: {amigo.nome} </span>
                                        </div>
                                        <div className="results-mensage-user">
                                            <p>INDENTIFICADOR: {amigo.identifier}</p>
                                        </div>
                                        {/* <p>ID: {amigo.id}</p> */}
                                    </div>
                                </div>

                            ))}

                            {/* <div className='mensage-results'>
                                <p>Nenhum amigo encontrado!</p>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className='search-imput'>
                    {/* input pesquisar */}

                    <input type="text" id='pesquisar-amigo' placeholder='Pesquisar Amigo!' />

                    {/* input pesquisar */}

                    <div className='img-search'>
                        <img src={svgSearch} alt="img-search" onClick={handlePesquisarAmigo} />
                    </div>
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