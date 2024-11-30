import React, { useEffect, useState } from 'react';
import AddButton from '../../components/ui/addbutton/AddButton.jsx';
import MusicList from '../../components/music/musicList/MusicList.jsx';
import MusicModal from '../../components/music/musicModal/MusicModal.jsx';

import { GetMusic } from '../../hooks/MusicCRUD/GetMusic';
import { UpdateMusic } from '../../hooks/MusicCRUD/UpdateMusic';
import { CreateMusic } from '../../hooks/MusicCRUD/CreateMusic';
import { DeleteMusic } from '../../hooks/MusicCRUD/DeleteMusic';

import useCheckAuth from '../../hooks/validToken/isTokenValid.jsx';

function MusicPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [musica, setMusica] = useState([]);
    const [editingMusic, setEditingMusic] = useState(null);
    const isAuthorized = useCheckAuth(); // Usa o hook para verificar autenticação e autorização
    
    useEffect(() => {
        if (isAuthorized) {
            fetchMusic(); // Obtém as músicas apenas se o usuário estiver autorizado
        }
    }, [isAuthorized]);
    
    const fetchMusic = async () => {
        try {
            const response = await GetMusic();
            setMusica(response);
        } catch (error) {
            console.error('Erro ao obter músicas:', error);
        }
    };
    const handleOpen = () => {
        setIsOpen(prevState => !prevState);
    };

    const deleteMusica = async (id) => {
        try {
            const res = await DeleteMusic(id);
            if (res) {
                setMusica(prevMusica => prevMusica.filter((musica) => musica.id !== id));
            }
            setEditingMusic(null);
        } catch (error) {
            console.error('Erro ao deletar música:', error);
        }
    };

    return (
        <div>
            <AddButton abrirOModal={handleOpen} texto="Adicionar uma música" />

            <MusicList
                musicas={musica}
                setEditMode={(musica) => {
                    setEditingMusic(musica);
                    handleOpen();
                }}
                deleteMusica={(id) => deleteMusica(id)}
            />

            {isOpen && (
                <MusicModal
                    createMusica={async (musica) => {
                        console.log('Iniciando a edição:', musica);
                        if (musica.id) {
                            const response = await UpdateMusic(musica);
                            console.log('Resposta da API para edição:', response);
                            setMusica(prevState =>
                                prevState.map((oldMusica) =>
                                    oldMusica.id === musica.id ? response : oldMusica
                                )
                            );
                        } else {
                            const response = await CreateMusic(musica);
                            console.log('Resposta da API para criação:', response);
                            setMusica(prevState => [...prevState, response]);
                        }
                        setEditingMusic(null);
                    }}
                    editingMusic={editingMusic}
                    fecharOModal={() => {
                        handleOpen();
                        setEditingMusic(null); // Certificando-se de que `setEditingMusic` é chamado com `null`
                    }}
                />
            )}
        </div>
    );
}

export default MusicPage;
