import { useState } from 'react';
import React from 'react';
import './css/loginCadastro.css';
import {gql, useMutation} from '@apollo/client';

const criar_usuario = gql`
mutation createUser($nome:String!, $email:String!, $senha:String!){
createUser(nome: $nome, email: $email, senha: $senha){
  id  
  nome
  email  
  }
}`;

function Cadastro() {

    const [nome,setNome] = useState('');
    const[email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [repitaSenha, setRepeat] = useState('');
    const letrasMaiusculas = /[A-Z]/;

    const [createUser, {data, loading, error}] = useMutation(criar_usuario);

    async function validar(e){

        e.preventDefault();
        if(nome.length <= 1){
            window.alert("Favor, usar um nome que tenha mais de 1 letra.");
            return;
        } 

        if(email.indexOf("@") == -1 || email.indexOf(".com") == -1){
           window.alert("Digite um e-mail válido.");
          return;
        }

        if(senha.length < 6 || !letrasMaiusculas.test(senha)){
            window.alert("Tenha uma senha com mais de 6 caracteres e pelo menos uma letra maiuscula.");
            return;
        }

        if(repitaSenha != senha){
           window.alert("Use a mesma senha que escreveu antes")
           return;
        }

        try{
         const response = await createUser({
          variables: {nome, email, senha},
        });
        
        console.log("usuário criado:", response.data.createUser);
        window.alert("Seu cadastro foi realizado!");

        window.location.href = "/Dashboard";
      }
      catch(error){
        console.error("ERRO NA CRIAÇÃO DE USUÁRIO: ", error);
        window.alert("O cadastro falhou...");
      }

    }

  return (
    <div className="flex-container">
      <div className="login-box">
        <h2>Olá, bom te ver!</h2>
        <form>
          <div className="input-box">
            Nome 
            <input type="text" placeholder="Usuário" id="input_nome" value={nome} onChange={(e) => setNome (e.target.value)} required />
          </div>
          <div className="input-box">
            E-mail
            <input type="text" placeholder="E-mail" id="input_email" value={email} onChange={(e) => setEmail (e.target.value)} required />
          </div>
          <div className="input-box">
            Senha 
          <input type="password" placeholder="*********" id="input_senha" value={senha} onChange={(e) => setSenha (e.target.value)} required />
          </div>
          <div className="input-box">
            Repita a Senha 
            <input type="password" placeholder="********" value={repitaSenha} onChange={(e) => setRepeat (e.target.value)} required />
          </div>
          <button type="submit" className='button-input'onClick={validar} >Entrar</button>
        </form>
      </div>
    </div>
  );
  
}

export default Cadastro;