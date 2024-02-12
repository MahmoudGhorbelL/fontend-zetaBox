import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
    handleSignInClick = () => {
        window.location.pathname = '/sign-in';
    };

    handleSignUpClick = () => {
        window.location.pathname = '/sign-up';
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: sessionStorage.getItem('userEmail') !== null,
        };
    }

    render() {
        const { isLoggedIn } = this.state;

        return (
            <div className="menu-item">
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-lg-2">
    <div className="logo">
        <a href="./">
            <img src="assets/img/zeta.png" alt="" style={{width: "190px", height: "50px"}} />
        </a>
    </div>
</div>

                        <div className="col-lg-6">
                            <div className="nav-menu">
                                <nav className='mainmenu'>
                                    <ul>
                                        <li><a href="./">Fonctionnalités</a>
                                            <ul className='dropdown' style={{ paddingRight: "0%" }}>
                                                <li><a href="">Facturation</a></li>
                                                <li><a href="">Achats et dépenses</a></li>
                                                <li><a href="">Gestion de stock</a></li>
                                                <li><a href="">Gestion des ventes</a></li>
                                                <li><a href="">Gestion financière</a></li>
                                                <li><a href="">Tableau de bord</a></li>
                                                <li><a href="">Formation et tutoriels</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="./rooms.html">Tarif</a></li>
                                        <li><a href="./pages.html">Ressources utiles</a>
                                            <ul className='dropdown' style={{ paddingRight: "-80%" }}>
                                                <li><a href="">Le blog de Swiver</a></li>
                                                <li><a href="">Formation et tutoriels</a></li>
                                                <li><a href="">Centre de support</a></li>
                                                <li><a href="">Calculateur IRPP</a></li>
                                                <li><a href="">Générateur fiche de paie</a></li>
                                                <li><a href="">Générateur de facture et devis gratuits</a></li>
                                                <li><a href="">Générateur de certificat de retenue à la source gratuit</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="">Parrainage</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="login-container">
                                {isLoggedIn ? null : (
                                    <div id='login' style={{ display: 'block' }}>
                                        <button className='btn btn-primary btn-block fa-lg gradient-custom-2' type="button" onClick={this.handleSignInClick} style={{ borderColor: "white" }}>Se connecter</button>
                                        <button className='btn btn-primary btn-block fa-lg gradient-custom-3' type="button" onClick={this.handleSignUpClick} style={{ borderColor: "white" }}>Essai gratuit</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
