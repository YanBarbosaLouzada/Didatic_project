import React from "react";
import "./Product.css";

import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { FormatarData } from "../../helpers/FormatDate";

function Product(props) {
    return (
        <div className="product-card">
            <div className="product-header">
                <h1>{props.name}</h1>
                <div id="icons">
                    <AiTwotoneEdit
                        className="icon edit-icon"
                        onClick={() => props.setEditMode(props)}
                    />
                    <AiFillDelete
                        className="icon delete-icon"
                        onClick={() => props.deleteProduct(props._id)}
                    />
                </div>
            </div>
            <div className="product-details">
                <p><strong>Descrição:</strong> {props.description}</p>
                <p><strong>Quantidade disponível:</strong> {props.quantity}</p>
                <p><strong>Data de criação:</strong> {FormatarData(props.createdAt)}</p>
            </div>
        </div>

    );
}

export default Product;