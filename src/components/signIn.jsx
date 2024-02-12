import React from 'react'
import axios from 'axios';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            mdp: '',
            errorMessage: '',
            token: null,
        };
    }

    handleChange = (e) => {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({ [nam]: val });
    };

    loginUser = async (e) => {
        e.preventDefault();

        const { email, mdp } = this.state; // Get values from the state

        try {
            const response = await axios.post('http://localhost:3001/api/user/login', { email, mdp });

            if (response.data.success) {
                const userEmail = response.data.user.email;
                sessionStorage.setItem('userEmail', userEmail);
                window.location.pathname = '/home';
            } else {
                // Login failed
                this.setState({ errorMessage: 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error during login:', error);

            if (error.response) {
                // Server responded with an error
                console.error('Error response from server:', error.response.data);
                this.setState({ errorMessage: error.response.data.message });
            } else {
                // Network error or other issues
                this.setState({ errorMessage: 'Internal Server Error' });
            }
        }
    };





    render() {
        return (
            <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
                <div className="container py-5 h-20">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div class="col-lg-6">
                                        <div class="card-body p-md-5 mx-md-4">

                                            <div className="text-center">
                                                <img src="assets/img/testimonial-logo.png" className='img'
                                                    style={{ width: " 40px;" }} alt="logo" />
                                                <h4 className="mt-1 mb-5 pb-1">Nous sommes l'équipe TripAdvisor</h4>
                                            </div>

                                            <form action='post'>
                                                <p>Veuillez vous connecter à votre compte</p>

                                                <div class="form-outline mb-4">
                                                    <input type="email" id="form2Example11" class="form-control"
                                                        placeholder="Numéro de téléphone ou adresse e-mail" value={this.state.email} onChange={this.handleChange} name='email' />
                                                </div>

                                                <div class="form-outline mb-4">
                                                    <input type="password" id="form2Example22" class="form-control" value={this.state.mdp} onChange={this.handleChange} name='mdp' placeholder='Mot de passe' />
                                                </div>

                                                <div class="text-center pt-1 mb-5 pb-1">
                                                    <button onClick={this.loginUser} class="btn btn-primary btn-block fa-lg gradient-custom-2" style={{ borderColor: "white" }}>Login</button>
                                                    {/* {this.state.fetchedUser && (
                                                        <div>
                                                            <h2>Fetched User</h2>
                                                            <p>Email: {this.state.fetchedUser.email}</p>
                                                        </div>
                                                    )} */}
                                                    <a className='' style={{ textDecoration: "none", opacity: "1", color: "#0a53be" }} href="#!">Mot de passe oublié ?</a>
                                                </div>

                                                <div class="d-flex align-items-center justify-content-center pb-4">
                                                    <p class="mb-0 me-2">Vous n'avez pas de compte ?</p>
                                                    <button type="button" class="btn btn-primary btn-block fa-lg gradient-custom-2" style={{ borderColor: "white" }}>Créer un compte</button>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                    <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h2 class="mb-4">Gérez votre entreprise en un seul endroit !</h2>
                                            <p class="small mb-0">Prenez le contrôle de votre facturation et de vos flux financiers avec une simplicité sans précédent.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default Signin;