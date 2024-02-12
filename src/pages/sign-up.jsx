import React from 'react';
import Footer from '../components/footer.jsx';
import Header from '../components/header';
import Signup from '../components/signUp.jsx';

const SignUp = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Signup />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;
