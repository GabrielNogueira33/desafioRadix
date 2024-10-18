import { useState } from 'react';
import React from 'react';
import './css/loginCadastro.css';
import { gql, useMutation } from '@apollo/client';

const consultar_usuario = gql`
  mutation encontrarUsuario($email: String!, $senha:String!){
  encontrarUsuario(email: $email, senha:$senha){
    id
    email
    senha
    }
  }
`;

function Login(){

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [encontrarUsuario] = useMutation(consultar_usuario);

    async function validar(e){

      console.log('Dados enviados', {email,senha});
      e.preventDefault();

        try{
          const response = await encontrarUsuario({
            variables: {email, senha},
          });

          console.log('Login realizado:', response.data.login);
          window.alert("Login realizado com sucesso!");

          window.location.href = "/Dashboard";

        } catch (error) {
          console.error("Erro ao fazer login:", error);
          window.alert("Login falhou, Verifique suas credenciais");
        }
    }

  return (
    <div className="flex-container">
      <div className="login-box">
        <h2>Bem vindo de volta!</h2>
        <form>
          <div className="input-box">
            E-mail
            <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail (e.target.value)} required />
          </div>
          <div className="input-box">
            Senha cadastrada
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha (e.target.value)} required />
          </div>
          <button type="submit" className='button-input'onClick={validar}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;