import React, { useRef, useState, useEffect } from "react";
import "./Chat.css";

export default function Chat({ socket }) {
    const bottomRef = useRef(null); // rolar automaticamente até o final do chat.
    const messageRef = useRef(null); // Uma referência ao campo de texto onde as mensagens são digitadas.
    const [messageList, setMessageList] = useState([]); // Um estado que armazena a lista de mensagens recebidas e enviadas.
    const [inputValue, setInputValue] = useState(""); // Um estado que armazena o valor atual do input, usado para controlar o texto digitado.


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

    
    // Sempre que a lista de mensagem for atualizada a função scrollDown() é chamada para rolar o chat até o final.
    const scrollDown = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
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

        socket.emit("message", newMessage); // Envia a mensagem pelo socket
        clearInput(); // Limpa o campo de texto
        focusInput(); // Retorna o foco para o campo
    };
    // Função que envia a mensagem, quando o botão de enviar é clicado.


    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="chat-header">Bate Papo</div>
                <div className="chat-messages">
                    {messageList.map((message, index) => (
                        <div
                            className={`chat-message ${message.authorId === socket.id ? "own-message" : "other-message"
                                }`}
                            key={index}
                        >
                            <div>
                                <strong>{message.author}</strong>
                            </div>
                            <div>{message.text}</div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                <div className="chat-input-container">
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