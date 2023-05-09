import Popup from "../Popup/Popup";

import "./PopupInfoTooltip.css";
import successIcon from "../../images/success-icon.svg";
import failIcon from "../../images/fail-icon.svg";

export default function PopupInfoTooltip(props) {
    return (
        <Popup isOpen={props.isOpen} onClose={props.onClose}>
            <div className={`info-tooltip ${props.isOpen && "info-tooltip_opened" }`}>
                {
                    props.tooltipStatus === "success" ?
                    <>
                        <img className="info-tooltip__icon" src={successIcon} alt="Успешно" />
                        <p className="info-tooltip__text">{props.successMessage}</p>
                    </>
                    :
                    (props.tooltipStatus) === "failed" &&
                    <>
                        <img className="info-tooltip__icon" src={failIcon} alt="Не удалось" />
                        <p className="info-tooltip__text">{props.failMessage}</p>
                    </>
                }
                <button aria-label="Закрыть" type="button" className="info-tooltip__close-btn" 
                    onClick={props.onClose}
                ></button>
            </div>
        </Popup>
    )
}