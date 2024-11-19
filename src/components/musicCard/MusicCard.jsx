import React from 'react'
import { AiFillDelete, AiTwotoneApi, AiTwotoneEdit } from 'react-icons/ai';
import "./MusicCard.css";
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
function MusicCard({ music, setEditMode, deleteMusic }) {
    const { nome, genero, cantor, nota, id } = music;
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
                    onClick={() => setEditMode(music)}
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