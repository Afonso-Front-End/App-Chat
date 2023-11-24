import React from 'react';
import imgGitAnonimus from '../../assets/img/img-git-Anonimo.jpg'
import Navigation from '../menu/menu'
import useScript from '../menu/script'; /* script navigation/script */

export default function Select() {
  const { WallperMensage } = useScript()

  return (
    <div className="container-lista-amizades">
      <ul className="content-lista-amizades">

        <li className="usuario-lista-amizades">

          <div className='data-info-usuario'>
            <div className="data-info-img-usuario">
              <img src={imgGitAnonimus} alt="" />
            </div>

            <div className="data-info-info">
              <div className="data-info-name"><span>Nome</span></div>
              <div className="data-info-mensage"><span>Mensagem</span></div>
            </div>
          </div>

        </li>

        {WallperMensage && (
          <div className='container-wallper-mensage'>
            <div className="content-wallper-mensage">
              <div className='background-walper-img'>
                <div className="wallper-mensage-text">
                  <span>Nenhuma amizade encontrada!</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </ul>

      <Navigation />

    </div>
  )
}
