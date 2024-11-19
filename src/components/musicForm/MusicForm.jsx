import React, { useEffect, useState } from 'react'
import "../form/Form.css"
function MusicForm(props) {
    const [nome, setNome] = useState("");
    const [genero, setGenero] = useState("");
    const [cantor, setCantor] = useState("")
    const [nota, setNota] = useState(0);

    const CadastrarMusica = (event) => {
        event.preventDefault();
        let id = undefined;
        if (props.editingMusic) {
            id = props.editingMusic.id;
        }
        props.createMusic({ nome, genero, cantor, nota, id })
        propsfecharOModal();
    };
    useEffect(() => {
        if (props.editingMusic) {
            setNome(props.editingMusic.nome)
            setGenero(props.editingMusic.genero)
            setCantor(props.editingMusic.cantor)
            setNota(props.editingMusic.nota)
        }
    }, [props.editingMusic]);

    return (
        <div className="formularioMusica">
            <form className="form" onSubmit={CadastrarMusica}>
                <h1>{props.editingMusic? "Editar" : "Cadastrar"} Musica</h1>
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    placeholder="Qual o nome da sua musica"
                    name="nome"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    
                />
                <label htmlFor="genero">Genero</label>
                <input
                    type="text"
                    placeholder="Qual o genero da sua musica?"
                    name="genero"
                    id="genero"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                />
                <label htmlFor="cantor">Cantor</label>
                <input
                    type="text"
                    placeholder="Quem é o cantor da sua musica?"
                    name="cantor"
                    id="cantor"
                    value={cantor}
                    onChange={(e) => setCantor(e.target.value)}
                />
                <label htmlFor="nota">Nota</label>
                <input type="number"
                    placeholder='Qual é a nota desta musica?'
                    name='nota'
                    id='nota'
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                />
                <button type="submit">
                    {props.editingMusic ? "Editar" : "Cadastrar"} musica.
                </button>
            </form>
        </div>
    );
}
export default MusicForm;