import React from 'react'
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import "./MusicCard.css";

function MusicCard({ musica, setEditMode, deleteMusic }) {
    const { nome, genero, cantor, nota, id } = musica;
    return (
        <div id='card' className='music-card'>
            <h1>{nome}</h1>
            <div>{genero} Genero</div>
            <div>{cantor} Cantor</div>
            <div>{nota} Nota</div>
            <div id='icons'>
                <AiTwotoneEdit
                    color='yellow'
                    width={32}
                    onClick={() => setEditMode(musica)}
                />
                <AiFillDelete
                    color='red'
                    width={32}
                    onClick={() => deleteMusic(id)} />
            </div>

        </div>
    )
}

export default MusicCard