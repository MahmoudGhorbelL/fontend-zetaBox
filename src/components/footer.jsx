import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <section class="footer-section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3">
                            <div class="ft-about">
                                <div class="logo">
                                    <a href="./">
                                        <img src="assets/img/zeta.png" alt="" style={{ width: "190px", height: "50px" }} />
                                    </a>
                                </div>
                                <p style={{ color: "white" }}>Logiciel de gestion d’entreprise <br />

                                    en ligne, spécialement conçu <br />

                                    pour les PME. Une solution <br />

                                    simple, complète et efficace.</p>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="ft-contact">
                                <br />  <br />  <br />
                                <ul>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Fonctionnalités </a></li>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Gestion commerciale </a></li>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Connexion </a></li>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Contactez nous </a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="ft-contact">
                                <br />  <br />  <br />
                                <ul>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Programme Startup et TPE </a></li>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Formation rapide </a></li>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Tarifs </a></li>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Essai gratuit</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="ft-contact">
                                <br />  <br />  <br />
                                <ul>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Blog </a></li>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Politique de confidentialité </a></li>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Conditions d’utilisation </a></li>
                                    <li><a href="" style={{ color: "white", textDecoration: "none" }}>Programme d’affiliation </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="copyright-option">
                    <div class="container">
                        <div class="row">
                            <div className="col-lg-3">
                                <ul>
                                    <li style={{ color: "white" }}>Copyright © 2021</li>
                                </ul>
                            </div>

                            <div class="col-lg-3">
                                <ul>
                                    <img src="assets/img/tel.png" alt="" />
                                    <li style={{ color: "white" }}>+216 36 018 000</li>
                                </ul>
                            </div>
                            <div class="col-lg-3">
                                <ul>
                                    <li><img src="assets/img/mail.png" alt="" /></li>
                                    <li><a href="https://zeta-box.com/"  style={{color: "white"}}>zeta-box.com</a></li>
                                </ul>
                            </div>

                            <div class="col-lg-3">
                                <div class="fa-social" >
                                    <a href="https://www.facebook.com/" style={{ marginRight: "15px", fontSize: "20px" }}><i class="fa fa-facebook"></i></a>
                                    <a href="https://www.twitter.com/" style={{ marginRight: "15px", fontSize: "20px" }}><i class="fa fa-twitter"></i></a>
                                    <a href="https://www.linkedin.com"><i class="fa fa-linkedin" style={{ marginRight: "15px", fontSize: "20px" }}></i></a>
                                    <a href="https://www.instagram.com/" style={{ marginRight: "15px", fontSize: "20px" }}><i class="fa fa-instagram"></i></a>
                                    <a href="https://www.youtube.com/" style={{ marginRight: "15px", fontSize: "20px" }}><i class="fa fa-youtube-play"></i></a>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default Footer;