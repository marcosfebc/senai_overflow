import React, { useEffect, useState } from 'react';

import {FiGithub, FiLogOut} from "react-icons/fi";
import './styles.css'; 

import fotoPerfil from "../../assets/foto_perfil.png";
import imgPost from "../../assets/post-exemplo.jpg";
import { signOut, getAluno } from '../../services/security';
import { useHistory } from 'react-router-dom';
import {api} from "../../services/api";
import Alerts from "../../components/Alerts";

const CardPost = ({post}) =>{

    const [mostrarComentarios, setMostrarComentarios] = useState(false);
    const [comentarios, setComentarios] = useState([]);
    
    const carregarComentarios = async () =>{
        try{
            if(!mostrarComentarios){
                const retorno = await api.get(`/postagens/${post.id}/comentarios`); 
                setComentarios(retorno.data);
            }
            setMostrarComentarios(!mostrarComentarios); 
        }catch(error){
            console.log(error);
        }         
    };

    return(
        <div className="card-post">
                    <header>
                        <img src={fotoPerfil} alt="Foto de Perfil"/>
                        <strong>{post.Aluno.nome}</strong>
                        <p>{post.created_at}</p>
                        {/* {Renderização condicional - só mostra se o gists for verdadeiro}  */}
                        {post.gists ? (<FiGithub className="icon" size={25} />) : null}
                    </header>
                    <body>
                        <strong>
                            {post.titulo}
                        </strong>
                        <p>
                            {post.descricao}
                        </p>     
                        <img src={imgPost} alt="Imagem do post"/>
                    </body>
                    <footer>
                        <h1 onClick={carregarComentarios}>Comentários</h1>
                        {mostrarComentarios && (
                        <>
                        {comentarios.lenght === 0 && (<p>Seja o primeiro a comentar!</p>)}
                        {comentarios.map((c) => (
                            <section>
                                <header>
                                    <img src={fotoPerfil} alt="Foto de Perfil"/>
                                    <strong>{c.aluno.nome}</strong>
                                    <p>{c.created_at}</p>
                                </header>
                                <p>
                                   {c.descricao}
                                </p>
                            </section>
                        ))}
                        </>
                        )}
                    </footer>
                </div>
    );
};

function Home(){

    const history = useHistory();
    const [mensagem, setMensagem] = useState("");
    const [postagens, setPostagens] = useState([]);

    useEffect(() => {

        const carregarPostagens = async () => {
            try{
                const retorno = await api.get("/postagens"); 

                setPostagens(retorno.data);
            }catch(erro){
                if(erro.response){
                    return setMensagem(erro.response.data.erro);
                }
                setMensagem("Algo de errado não está certo!");
            }
            
        }

        carregarPostagens();    
    }, []);

    const alunoSessao = getAluno;

    return (<div className="container">
        <Alerts mensagem={mensagem} setMensagem={setMensagem} tipo="erro"/>
        <header className="header">
            <div><p>SENAI OVERFLOW</p></div>
            <div>
                <input type="search" placeholder="Pesquisar uma dúvida"/>
            </div>
            <div>
                <button className="btnSair" onClick={() =>{
                    signOut();
                    history.replace("/");
                }}>
                    Sair <FiLogOut/>
                </button>
            </div>
        </header>
        <div className="content">
            <section className="profile">
                <img src={fotoPerfil} alt="Foto de perfil"/>
                <a href="#">Editar Foto</a>
                <strong>{alunoSessao.nome}</strong>
                <p>Nome</p>
                <strong>Ra</strong>
                <p>{alunoSessao.ra}</p>
            </section>
            <section className="feed">
                {postagens.map((post) => (<CardPost post={post}/>))}
            </section>
        </div>
    </div>)
}

export default Home;    
