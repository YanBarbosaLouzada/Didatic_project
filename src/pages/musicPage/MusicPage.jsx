import React, { useEffect, useState } from 'react'
import AddButton from '../../components/ui/addbutton/AddButton';
import MusicList from '../../components/musicList/MusicList';
import MusicModal from '../../components/musicModal/MusicModal'
import { GetMusic } from '../../hooks/MusicCRUD/GetMusic';
import { UpdateMusic } from '../../hooks/MusicCRUD/UpdateMusic';
import { CreateMusic } from '../../hooks/MusicCRUD/CreateMusic';
import { DeleteMusic } from '../../hooks/MusicCRUD/DeleteMusic';

function MusicPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [musica, setMusica] = useState([]);
    const [editingMusic, setEditingMusic] = useState(null);

    const handleOpen = () => {
        setIsOpen((state) => !state);
    }

    useEffect(() => {
        GetMusic().then((response) => setMusica(response.data));
    });

    return (
        <div>
            <AddButton abrirOModal={handleOpen} texto="Adicionar uma música" />

            <MusicList
                music={musica}
                setEditMode={(musica) => {
                    setEditingMusic(musica);
                    handleOpen();
                }}
                deleteMusica={(id) => DeleteMusic(id)}
            />


            {/* Checando se o modal está aberto */}

            {isOpen && (
                <MusicModal
                    
                    CreateMusic={async (musica) => {
                        // A musica tem um id ? se tem vai editar
                        if (musica.id) {
                            const response = await UpdateMusic(musica);

                            //Usa map para criar uma nova lista de músicas onde:
                            // Se o id de uma música na lista for igual ao da música atualizada, 
                            //a substitui pelo response da atualização. 
                            
                            setMusica((prevState) => 
                                prevState.map((oldMusica) =>
                                    oldMusica.id === musica.id ? response : oldMusica))
                        } else {
                            const response = await CreateMusic(musica);
                            setMusica((prevState) => [...prevState, response]);
                        }
                        setEditingMusic(null)
                    }}

                    editingMusic={editingMusic}
                    fecharOModal={() => {
                        handleOpen();
                        setEditingMusic();
                    }}
                />
            )}
        </div>
    )
}

export default MusicPage;
