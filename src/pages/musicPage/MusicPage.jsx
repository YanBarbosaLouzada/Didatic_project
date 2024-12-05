// Bibliotecas que utilizamos na MusicPage

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

    // variaveis do nosso codigo
    const [isOpen, setIsOpen] = useState(false);
    const [musica, setMusica] = useState([]);
    const [editingMusic, setEditingMusic] = useState(null);

    const isAuthorized = useCheckAuth(); // Usa o hook para verificar autenticação e autorização
    
    // useEffect - > Carregar o conteudo continuamente

    useEffect(() => {
        if (isAuthorized) {
            fetchMusic(); // Obtém as músicas apenas se o usuário estiver autorizado
        }
    }, [isAuthorized]);
    
    const fetchMusic = async () => {
        // Aqui estamos tentando pegar as musicas disponiveis no banco de dados utilizando a Função
        // GetMusic que está no arquivo MusicCRUD.js
        try {
            const response = await GetMusic();
            setMusica(response);
        } catch (error) {
            console.error('Erro ao obter músicas:', error);
        }
    };

    // Função para abrir o modal de músic e fechar
    // faz a troca de estado da variavel isOpen

    const handleOpen = () => {
        setIsOpen(prevState => !prevState);
    };

    // Função para deletar musicas e atualizar a lista de musicas de forma async

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

            {/* Criando o botão de criar musicas */}
            <AddButton abrirOModal={handleOpen} texto="Adicionar uma música" />

            {/* nome:yan idade:10 */}


            {/* Chamando componente musiclist que serve para organizar
            todas as musicas dentro de cards */}

            <MusicList
                musicas={musica}
                setEditMode={(musica) => {
                    setEditingMusic(musica);
                    handleOpen();
                }}
                deleteMusica={(id) => deleteMusica(id)}
            />

            {/* Estamos verificando se o modal esta aberto  */}

            {isOpen && (
                // Chamamos o componente MusicModal
                <MusicModal
                    // passamos as propriedades que o componente precisa
                    // createMusica
                    // editingMusic
                    // fecharOModal

                    createMusica={async (musica) => {
                        // verificamos se existe uma musica com o id
                        // se existir vamos executar a função de edit
                        if (musica.id) {
                            const response = await UpdateMusic(musica);
                            setMusica(prevState =>
                                prevState.map((oldMusica) =>
                                    oldMusica.id === musica.id ? response : oldMusica
                                )
                            );
                            // se nao executamos a funçao de create
                        } else {
                            const response = await CreateMusic(musica);
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
