import {useState, useEffect } from 'react';

import { FiPlus , FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { Container , Brand , Menu , Search , Content , NewNote} from './style'

import { ButtonText } from '../../components/ButtonText';
import { Section } from '../../components/Section'
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Note } from '../../components/Note';

export function Home(){
    const [tags, setTags] = useState();
    const [tagsSelected, setTagsSelected] = useState([]);
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate()

    function handleSelectTags(tagName){
        if(tagName === 'all'){
            return setTagsSelected([]);
        }

        const alredySelected = tagsSelected.includes(tagName);

        if(alredySelected){
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags)
        } else {
            setTagsSelected(prevState => [...prevState, tagName]);
        }
    }

    function handleDetails(id){
        navigate(`/details/${id}`)
    }
    
    useEffect(() => {
        async function fetchTags(){
            const response = await api.get("/tags");
            setTags(response.data);
        }

        fetchTags();
    }, []);

    
    useEffect(() => {
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data);
        }

        fetchNotes();
    }, [tagsSelected, search]);

    return(
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText 
                        title="todos" 
                        isActive={tagsSelected.length === 0}
                        onClick={() => handleSelectTags("all")}
                    /> 
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={tag.id}>
                            <ButtonText 
                                title={tag.name}
                                onClick={() => handleSelectTags(tag.name)}
                                isActive={tagsSelected.includes(tag.name)}
                            /> 
                        </li>
                    ))

                }
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título"
                    icon={FiSearch}
                    onChange={e => setSearch(e.target.value)}
                />
            </Search> 

            <Content>
                <Section title="minhas notas">
                    {
                        notes.map(note => (
                            <Note 
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar Nota
            </NewNote>
        </Container>
    );
}