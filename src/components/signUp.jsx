import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            mdp: '',
            prenom: '',
            nom: '',
            pays: '',
            telephone: '',
        };
    }

    handleChange = (e) => {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({ [nam]: val });
    }

    Addclient = async (e) => {
        e.preventDefault();
        const clientObject = {
            email: this.state.email,
            mdp: this.state.mdp,
            prenom: this.state.prenom,
            nom: this.state.nom,
            pays: this.state.pays,
            telephone: this.state.telephone,
        };

        try {
            const response = await axios.post('http://localhost:3001/api/user/register', clientObject);
            console.log(response.data); // Log the response from the server
            window.location.pathname= '/sign-in';
        } catch (error) {
            console.error('Error adding client:', error);
        }
    };
    validatePassword = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const isValidPassword = passwordRegex.test(this.state.mdp);
        return isValidPassword;
    };

    render() {
        const isValidPassword = this.validatePassword();
        const isPasswordNotEmpty = this.state.mdp.length > 0;
        return (
            <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
                <div className="container py-5 h-20">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">

                                            <div className="text-center">
                                                <img src="assets/img/testimonial-logo.png" className='img'
                                                    style={{ width: " 40px;" }} alt="logo" />
                                                <h4 className="mt-1 mb-5 pb-1">Nous sommes l'équipe TripAdvisor</h4>
                                            </div>

                                            <form method='post' onSubmit={this.Addclient} autocomplete="on">
                                                <p style={{ textAlign: "center" }}>Créer un compte</p>

                                                <div className="col-12 d-flex  gap-3" style={{ paddingTop: "20px" }}>
                                                    <div className="row  g-6">
                                                        <div className="col-6" />
                                                        <input placeholder="Prénom" type="text" autoComplete="off" name="prenom" value={this.state.prenom} className="form-control " onChange={this.handleChange} />
                                                    </div>
                                                    <div className="col-6">
                                                        <input placeholder="Nom" type="text" autoComplete="off" name="nom" value={this.state.nom} className="form-control" onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-12 d-flex gap-3" style={{ paddingTop: "20px" }}>
                                                    <div className="row g-6">
                                                        <div className="col-6" />
                                                        <input placeholder="Pays" type="text" autoComplete="off" name="pays" value={this.state.pays} className="form-control" onChange={this.handleChange} />
                                                    </div>
                                                    <div className="col-6">
                                                        <input placeholder="Téléphone" type="number" autoComplete="off" value={this.state.telephone} name="telephone" className="form-control" onChange={this.handleChange} />
                                                    </div>
                                                </div>


                                                <div className="row" style={{ paddingTop: "20px", paddingRight: "10px" }}>
                                                    <input placeholder="Email" type="text" value={this.state.email} name="email" autoComplete="off" className="form-control form-control" onChange={this.handleChange} />
                                                </div>
                                                <div className="row" style={{ paddingTop: "20px", paddingRight: "10px" }}>
                                                    <input
                                                        placeholder="Mot de passe"
                                                        type="password"
                                                        name="mdp"
                                                        value={this.state.mdp}
                                                        autoComplete="off"
                                                        className={`form-control ${!isValidPassword && isPasswordNotEmpty ? 'is-invalid' : ''}`}
                                                        onChange={this.handleChange}
                                                    />
                                                    {!isValidPassword && isPasswordNotEmpty && (
                                                        <div className="invalid-feedback">
                                                            Utilisez 8 caractères ou plus avec un mélange de lettres, de chiffres et de symboles.
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-12" style={{ paddingTop: "20px" }}>
                                                    <div className="form-check form-switch form-check-custom form-check-solid d-flex ">
                                                        <input className="form-check-input" type="checkbox" value="" />
                                                        <label className="form-check-label  fw-bold" htmlFor="flexSwitchDefault" style={{ color: "#0a53be" }}>Code partenaire</label>
                                                    </div>
                                                </div>
                                                <div className="col-12" style={{ paddingTop: "20px", paddingLeft: "40px" }}>
                                                    <div className="form-check form-check-custom form-check-solid form-check-sm">
                                                        <input className="form-check-input" type="checkbox" name="terms" id="flexRadioLg" />
                                                        <label className="form-check-label text-muted fw-bold" htmlFor="flexRadioLg">J'accepte <a href="https://swiver.io/termes/" className="" style={{ textDecoration: "none", opacity: "1", color: "#0a53be" }}>les conditions d'utilisation</a>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="row" style={{ paddingRight: "10px" }}>
                                                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2" type="submit" style={{ borderColor: "white" }}>
                                                        <span className="indicator-label">Valider</span>
                                                    </button>
                                                </div>
                                                <div className="col-12 text-center" style={{ paddingTop: "20px" }}>
                                                    <span className="text-muted fw-semibold  ">Utilisez-vous déjà Swiver?
                                                        <a href="/sign-in" style={{ textDecoration: "none", opacity: "1", color: "#0a53be" }}>Se connecter</a>
                                                    </span>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h2 className="mb-4">Gérez votre entreprise en un seul endroit!</h2>
                                            <p className="small mb-0">Prenez le contrôle de votre facturation et de vos flux financiers avec une simplicité sans précédent.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >

        )
    }
}
export default Signup;