import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import {FiLock, FiMail , FiUser} from 'react-icons/fi'

import { Link } from 'react-router-dom';

import { Container , Form , Background} from "./style";

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';


export function SignUp(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    function handleSignUp(){
        if(!name || !email || !password){
            alert("Preencha os campos corretamente!")
        }

        api.post("/users" , {name , email , password})
        .then(() => {
            alert("Usuário cadastrado com sucesso!")
            navigate("/")
        })
        .catch(error =>{
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Não foi possível efetuar o login")
            }
        })
    }


    return(
        <Container>
            <Background />

            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>

                <h2>Crie sua conta</h2>
                
                <Input 
                    placeholder="Nome do usuário"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input 
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />

                <Button title="Cadastrar" onClick={handleSignUp} />

                <Link to="/">Voltar para o login</Link>
            </Form>
        </Container>

    )
}