import { useState } from 'react';

import { api } from '../../services/api';

import { Container, Form } from "./style";

import { ButtonText } from '../../components/ButtonText';
import { TextArea } from "../../components/TextArea"
import { NoteItem } from "../../components/NoteItem"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"

import { useNavigate } from 'react-router-dom';


export function New(){
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate()

    function handleBack(){
        navigate(-1)
    }

    function handleAddLinks(){
        setLinks(prevState => [...prevState, newLink])
        setNewLink("")
    }

    function handleRemoveLinks(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted))
    }

    function handleAddTags(){
        setTags(prevState => [...prevState, newTag])
        setNewTag("")
    }

    function handleRemoveTags(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    async function handleNewNote(){

        if(!title){
            return alert("Titulo é obrigatório");
        }

        if(newLink){
            return alert("Você esqueceu de adicionar o link!");
        }

        if(newTag){
            return alert("Você esqueceu de adicionar a tag!");
        }

        await api.post("/notes" , {
            title,
            description,
            links,
            tags
        })

        alert("Nota criada com sucesso!!")
        navigate(-1)
    }
    
    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        <ButtonText title="voltar" onClick={handleBack}/>
                    </header>

                    <Input 
                        placeholder="Titulo"
                        onChange={e => setTitle(e.target.value)}
                    />

                    <TextArea 
                        placeholder="observações"
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLinks(link)}
                                />
                            ))
                        }
                        <NoteItem 
                            isNew 
                            placeholder="Novo Link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLinks}
                        />
                    </Section>

                    <Section title="marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveTags(tag)}
                                    />
                                ))
                            }
                            <NoteItem 
                                isNew
                                placeholder="Nova Tag"
                                onChange={e => setNewTag(e.target.value)}
                                onClick={handleAddTags}
                                value={newTag}
                            />
                        </div>
                    </Section>
                    
                    <Button 
                        title="salvar" 
                        onClick={handleNewNote}/>
                </Form>
            </main>
        </Container>
    )
}