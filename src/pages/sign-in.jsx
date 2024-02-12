import React from 'react';
import Footer from '../components/footer.jsx';
import Header from '../components/header';
import Signin from '../components/signIn.jsx';

const SignIn = () => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <Signin />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default SignIn;
