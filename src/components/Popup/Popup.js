import React from 'react';

import "./Popup.css";

export default function Popup(props) {
    // ======= Ref hook =======
    const overlay = React.useRef();



    // POPUP
    // =================================================
    function handleOverlayClick(e) {
        if (e.target === overlay.current) {
            props.onClose();
        }
    }
    // =================================================


    
    return (
        <div
            ref={overlay} 
            onClick={handleOverlayClick}
            className={`popup ${props.isOpen ? "popup_opened" : ""}`}
        >
            {props.children}
        </div>
    )
}