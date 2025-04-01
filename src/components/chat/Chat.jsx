import React, { useRef, useState, useEffect } from "react";
import "./Chat.css";
import { GiCardBurn } from "react-icons/gi";
import { PokemonCard } from "../pokemon/pokemonCard/PokemonCard";
export default function Chat({ socket }) {
    const bottomRef = useRef(null); // rolar automaticamente até o final do chat.
    const messageRef = useRef(null); // Uma referência ao campo de texto onde as mensagens são digitadas.
    const [messageList, setMessageList] = useState([]); // Um estado que armazena a lista de mensagens recebidas e enviadas.
    const [inputValue, setInputValue] = useState(""); // Um estado que armazena o valor atual do input, usado para controlar o texto digitado.
    const [showModal, setShowModal] = useState(false); // Um estado que controla a visibilidade do modal de env

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((current) => [...current, data]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, [socket]);


    // socket.on("receive_message"): Fica "ouvindo" eventos chamados receive_message vindos do servidor.
    // Quando uma mensagem é recebida, ela é adicionada à lista de mensagens (messageList) usando o estado.
    // Cleanup: Quando o componente é desmontado, o evento receive_message é desativado para evitar comportamentos indesejados (como múltiplas escutas).


    useEffect(() => {
        scrollDown();
    }, [messageList]);

    // função responsavel por mudar o valor da variavel(useState) showModal
    const mudarModal = () => {
        setShowModal(!showModal);
    }


    // Sempre que a lista de mensagem for atualizada a função scrollDown() é chamada para rolar o chat até o final.
    const scrollDown = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    };
    
    // Função que rola o chat até o final, sempre que a lista de mensagens for atualizada.
    const clearInput = () => {
        if (messageRef.current) {
            messageRef.current.value = "";
            setInputValue("");
        }
    };
    // Função que limpa o campo de texto, quando uma mensagem é enviada.

    const focusInput = () => {
        if (messageRef.current) {
            messageRef.current.focus();
        }
    };


    // Função que coloca o foco no campo de texto, quando o componente é montado.

    const getEnterKey = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    // Função que verifica se a tecla Enter foi pressionada, e se sim, manda a mensagem

    const handleSubmit = () => {
        if (!messageRef.current) return; // Se não houver referência ao input, retorna

        const newMessage = messageRef.current.value; // Obtém o valor digitado

        if (!newMessage.trim()) return; // Se a mensagem estiver vazia, não faz nada

        const messageData = { text: newMessage, type: "text" }

        socket.emit("message", messageData); // Envia a mensagem pelo socket
        clearInput(); // Limpa o campo de texto
        focusInput(); // Retorna o foco para o campo
    };

    // 1️⃣ Usuário abre o modal(PokemonCard) no Chat.
    // 2️⃣ Ele vê os Pokémon armazenados(selectedPokemons).
    // 3️⃣ Clica no botão de envio(TbSend2), que chama handleSendPokemon(pokemon).
    // 4️⃣ handleSendPokemon busca detalhes do Pokémon na PokéAPI e, quando recebe a resposta, chama sendPokemonMessage.
    // 5️⃣ sendPokemonMessage do Chat envia os dados do Pokémon via socket para o servidor.
    // 6️⃣ O modal fecha(onClose()).
    // 7️⃣ A mensagem aparece no chat.

    const sendPokemonMessage = (pokemon) => {
        const messageData = {
            text: `Você recebeu um ${pokemon.name}!`,
            type: "pokemon",
            pokemon,
            authorId: socket.id,
        }
        socket.emit("message", messageData);
        console.log(messageData)
        setShowModal(false)
    }

    return (
        <div className="chat-container">
            {showModal === true ? (
                <PokemonCard
                    onClose={() => mudarModal()}
                    sendPokemonMessage={sendPokemonMessage}
                >
                </PokemonCard>
            ) : null}
            <div className="chat-box">
                <div className="chat-header">Bate Papo</div>
                <div className="chat-messages">
                    {messageList.map((message, index) => (
                        <div
                            className={`chat-message ${message.authorId === socket.id ? "own-message" : "other-message"
                                }`}
                            key={index}
                        >
                            {message.type === "text" && (
                                <div>
                                    <strong>{message.author}</strong>
                                    <div>{message.text}</div>
                                </div>
                            )}
                            {message.type === "pokemon" && (
                                <div>
                                    <strong>{message.author}</strong>
                                    <div>
                                        <img src={message.pokemon.image} alt={message.pokemon.name} />
                                        <div> {message.pokemon.name} </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                <div className="chat-input-container">
                    <GiCardBurn color="white" width={32} onClick={() => mudarModal()} />
                    <input
                        ref={messageRef}
                        placeholder="Mensagem"
                        onKeyDown={(e) => getEnterKey(e)}
                        className="chat-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className="chat-button" onClick={() => handleSubmit()}>
                        Enviar Mensagem
                    </button>
                </div>
            </div>
        </div>
    );
}