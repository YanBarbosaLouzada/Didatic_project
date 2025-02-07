import React from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import "./MusicCard.css";

function MusicCard({ musica, setEditMode, deleteMusica }) {
    const { nome, genero, cantor, nota, id } = musica;

    return (
        <div className="music-card">
            <div className="music-header">
                <h2 data-testid={`music-nome-${id}`}>{nome}</h2>
                <div className="icons">
                    <AiTwotoneEdit
                        className="icon edit-icon"
                        onClick={() => setEditMode(musica)}
                        aria-label="edit"
                        data-testid={`edit-icon-${id}`}
                    />
                    <AiFillDelete
                        className="icon delete-icon"
                        onClick={() => deleteMusica(id)}
                        aria-label="delete"
                        data-testid={`delete-icon-${id}`}
                    />
                </div>
            </div>
            <div className="music-details">
                <p data-testid={`music-genero-${id}`}><strong>Gênero:</strong> {genero}</p>
                <p data-testid={`music-cantor-${id}`}><strong>Cantor:</strong> {cantor}</p>
                <p data-testid={`music-nota-${id}`}><strong>Nota:</strong> {nota}</p>
            </div>
        </div>
    );
}

export default MusicCard;
