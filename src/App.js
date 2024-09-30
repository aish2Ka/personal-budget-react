
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,

} from "react-router-dom";
import Menu from './Menu/Menu';
import LoginPage from './LoginPage/LoginPage';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import Footer from './Footer/Footer';
import Hero from './Hero/Hero';
function App() {
  return (
    <Router>
    <Menu/>
   <Hero/>
   <div className="mainContainer">
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<HomePage />} />  {/* Default route */ }
    
    </Routes>
     
    

   </div>
   
   <Footer/>
   </Router>
    
  );
}


export default App;
