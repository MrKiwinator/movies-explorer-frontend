import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import AboutProject from '../AboutProject/AboutProject';

import './Main.css';

export default function Main(props) {
    return(
        <>
            <Header 
                loggedIn={props.loggedIn}
            />
            <main className="main">
                <Promo />
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio /> 
            </main>
            <Footer />
        </>
    )
}