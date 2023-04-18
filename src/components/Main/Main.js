import './Main.css';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';

export default function Main(props) {
    return(
        <main class="main">
            <Promo />
            <NavTab />
        </main>
    )
}