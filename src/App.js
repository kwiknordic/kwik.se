import Header from './components/Header';
import AboutMe from './components/AboutMe'
import MyExpertise from './components/MyExpertise'
import Portfolio from './components/Portfolio'
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <>
      <header id="header" className='skewed-container'>
        <Header />
        <HeroSection />
      </header>

      <main>
        <MyExpertise />
        <Portfolio />
        <AboutMe />
      </main>

      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
