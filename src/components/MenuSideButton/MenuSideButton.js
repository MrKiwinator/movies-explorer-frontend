import './MenuSideButton.css';
import sideMenu from '../../images/side-menu.svg'

export default function MenuSideButton(props) {

    return(
        <button className="side-menu-button" onClick={props.handleOpenSideMenu}>
            <img className="side-menu-button__img" src={sideMenu} alt="Открыть меню" />
        </button>
    )
}