import React from 'react';
import imgGitAnonimus from '../../assets/img/img-git-Anonimo.jpg'
import Navigation from '../navigation/Navigation'
import useScript from '../navigation/script';
export default function Select() {
  const { listaAmizades }= useScript()

  return (
    <div className="area-select-user">
      <ul className="items-users">
        {listaAmizades && listaAmizades.map((amizade, index)=> (
          <li className="user" key={index} >
            <div className="img-user">
              <img src={imgGitAnonimus} alt="img-user" />
            </div>

            <div className="info-user">
              <div className="name-user"><span>{amizade.amigo_nome}</span></div>
              <div className="mensage-user"><p>Mensagem</p></div>
            </div>
          </li>
        ))}
          <div className='mensagem-aviso'>
                <div className="img-mensagem-aviso">
                  <img src={imgGitAnonimus} alt="" />
                  <span></span>
                </div>
                <div className="mensage-aviso"><p>Nenhuma amizade encontrada.</p></div>
          </div>
        
      </ul>
      <Navigation />
    </div>
  )
}
