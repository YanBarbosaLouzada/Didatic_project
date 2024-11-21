import React from 'react'
import MusicCard from '../musicCard/MusicCard'

function MusicList({ musicas, setEditMode, deleteMusica }) {
    return (    
        <div id="musicas-list">
            {musicas.map((musica) => (
                <MusicCard
                    anime={musica}
                    key={musica.id}
                    setEditMode={setEditMode}
                    deleteMusica={deleteMusica}
                />
            ))}
        </div>
    )
}

export default MusicList;
