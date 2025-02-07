import React from 'react';
import MusicCard from '../musicCard/MusicCard';
import './MusicList.css';

function MusicList({ musicas, setEditMode, deleteMusica }) {
    return (
        <div data-testid="music-list" id="musicas-list">
            {musicas.map((musica) => (
                <MusicCard
                    musica={musica}
                    key={musica.id}
                    setEditMode={setEditMode}
                    deleteMusica={deleteMusica}
                />
            ))}
        </div>
    )
}

export default MusicList;


