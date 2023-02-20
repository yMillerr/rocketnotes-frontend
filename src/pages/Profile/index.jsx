import { useState } from "react";

import { FiArrowLeft , FiUser , FiMail , FiLock, FiCamera} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


import avatarPlaceHolder from '../../assets/avatar_placeholder.svg';
import { useAuth } from "../../hooks/auth";
import { api } from '../../services/api';

import { Container , Form, Avatar} from "./style";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function Profile(){
    const { user , updateProfile } = useAuth();

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");

    const [avatar, setAvatar] = useState(avatarURL);
    const [avatarFile, setAvatarFile] = useState(null);

    const navigate = useNavigate();

    function handleBack(){
        navigate(-1)
    }


    async function handleUpdate(){
        const update = {
            name, 
            email,
            password: passwordNew,
            old_password: passwordOld,
        }

        const userUpdated = Object.assign(user, update)

        console.log(userUpdated)

        await updateProfile({user: userUpdated , avatarFile})

        console.log(passwordNew)
    }

    function handleChangeAvatar(event){
        const file = event.target.files[0]
        setAvatarFile(file)

        const avatarImgPreview = URL.createObjectURL(file)
        setAvatar(avatarImgPreview)
    }

    return(
        <Container>
            <header>
                <button type="button" onClick={handleBack}>
                    <FiArrowLeft />
                </button>
            </header>

            <Form>
                <Avatar>
                    <img 
                        src={avatar} 
                        alt="Foto do usuário" 
                    />

                    <label htmlFor="avatar">
                        <FiCamera />

                        <input 
                            type="file" 
                            id="avatar"
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </Avatar>

                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input 
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                />

                <Input 
                    placeholder="Nova Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate}/>
            </Form>
        </Container>
    )
}