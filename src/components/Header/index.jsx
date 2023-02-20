import { RiShutDownLine } from 'react-icons/ri'

import { useNavigate } from 'react-router-dom';

import { Container , Profile , Logout} from "./style";

import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';


export function Header(){
    const { signOut, user } = useAuth();

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;
    const navigate = useNavigate();

    function handleSignOut(){
        signOut();

        navigate("/")
    }

    return(
        <Container>
            <Profile to="/profile">
                <img 
                    src={avatarURL} 
                    alt="Foto do usário" 
                />

                <div>
                    <span>Bem-Vindo</span>
                    <strong>Vitor Eduardo</strong>
                </div>
            </Profile>

            <Logout onClick={signOut}>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}