import React from 'react';
import Footer from '../components/footer.jsx';
import Header from '../components/header';
import Main from '../components/main';

const Home = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Main />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
