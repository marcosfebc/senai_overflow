import { api } from "./api";

const CHAVE_ALUNO = "@aluno";

export const singIn = (aluno) =>{
    localStorage.setItem(CHAVE_ALUNO, JSON.stringify(aluno));

    api.defaults.headers.commom['authorization'] = `Bearer ${aluno.token}`;
};  

export const signOut = () =>{
    localStorage.clear();

    api.defaults.headers.commom['authorization'] = undefined;
};

export const getAluno = () =>{
    const {aluno} = JSON.parse(localStorage.getItem(CHAVE_ALUNO));

    return aluno;
};

export const isSignedIn = () =>{
    const aluno = JSON.parse(localStorage.getItem(CHAVE_ALUNO));

    if(aluno){
        api.defaults.headers.commom['authorization'] = `Bearer ${aluno.token}`;
    }

    //Futuramente, implementar a verificação do toke

    return aluno ? true : false;
};