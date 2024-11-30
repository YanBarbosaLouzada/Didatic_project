import React from "react";
import "../../modal/Modal.css";
import { AiFillCloseCircle } from "react-icons/ai";
import MusicForm from "../musicForm/MusicForm";

function MusicModal(props) {
    return (
        <div className="fundo">
            <div className="closeModal" onClick={props.fecharOModal}>
                <AiFillCloseCircle size={40} color="white" />
            </div>
            <div>
                <MusicForm {...props} />
            </div>
        </div>
    );
}

export default MusicModal;