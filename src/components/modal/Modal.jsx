import React from "react";
import "./Modal.css";
import { AiFillCloseCircle } from "react-icons/ai";
import Form from "../form/Form";

function Modal(props) {
    return (
        <div className="fundo">
            <div className="closeModal" onClick={() => props.fecharOModal()}>
                <AiFillCloseCircle size={40} color="white" />
            </div>
            <div>
                <Form
                    fecharOModal={props.fecharOModal}
                    createProduct={props.createProduct}
                    {...props}
                />
            </div>
        </div>
    );
}

export default Modal;