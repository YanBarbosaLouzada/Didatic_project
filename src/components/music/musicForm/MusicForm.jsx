import React, { useEffect, useState } from "react";
import "../../form/Form.css";

function MusicForm(props) {
    const [nome, setNome] = useState("");
    const [genero, setGenero] = useState("");
    const [cantor, setCantor] = useState("");
    const [nota, setNota] = useState(0);

    const CadastrarMusica = (event) => {
        event.preventDefault();

        const musicaData = {
            nome,
            genero,
            cantor,
            nota,
            id: props.editingMusic?.id || null,
        };

        props.createMusica(musicaData);
        props.fecharOModal();
    };

    useEffect(() => {
        if (props.editingMusic) {
            setNome(props.editingMusic.nome);
            setGenero(props.editingMusic.genero);
            setCantor(props.editingMusic.cantor);
            setNota(props.editingMusic.nota);
        }
    }, [props.editingMusic]);

    return (
        <div className="formularioMusica">
            <form className="form" onSubmit={CadastrarMusica}>
                <h1> {props.editingMusic ? "Editar" : "Cadastrar"} Música</h1>
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    placeholder="Qual o nome da sua música?"
                    name="nome"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <label htmlFor="genero">Gênero</label>
                <input
                    type="text"
                    placeholder="Qual o gênero da sua música?"
                    name="genero"
                    id="genero"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    required
                />
                <label htmlFor="cantor">Cantor</label>
                <input
                    type="text"
                    placeholder="Quem é o cantor da sua música?"
                    name="cantor"
                    id="cantor"
                    value={cantor}
                    onChange={(e) => setCantor(e.target.value)}
                    required
                />
                <label htmlFor="nota">Nota</label>
                <input
                    type="number"
                    placeholder="Qual é a nota desta música?"
                    name="nota"
                    id="nota"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    required
                />
                <button type="submit">
                    {props.editingMusic ? "Editar" : "Cadastrar"} música
                </button>
            </form>
        </div>
    );
}

export default MusicForm;
