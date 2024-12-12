import React from 'react';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <header className="home-header">
                <h1>Bem-vindo à Nossa Aplicação</h1>
                <p>Descubra conteúdos incríveis e gerencie suas músicas favoritas!</p>
            </header>
            <main className="home-content">
                <div className="card">
                    <h2>Gerenciar Músicas</h2>
                    <p>Adicione, edite e exclua músicas de forma simples.</p>
                    <button>Ver Músicas</button>
                </div>
                <div className="card">
                    <h2>Sobre Nós</h2>
                    <p>Saiba mais sobre o nosso propósito e nossa equipe.</p>
                    <button>Saiba Mais</button>
                </div>
                <div className="card">
                    <h2>Contato</h2>
                    <p>Entre em contato com a gente para tirar suas dúvidas.</p>
                    <button>Fale Conosco</button>
                </div>
            </main>
        </div>

    );
}

export default HomePage;
