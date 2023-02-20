import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

import { api } from "../../services/api"

import { Container, Links, Content} from "./style"

import { ButtonText } from "../../components/ButtonText"
import { Section } from "../../components/Section"
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { Tag } from "../../components/Tag"

export function Details(){
  
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  function handleBack(){
    navigate(-1)
  }

  async function handleRemove(){
    const confirm = window.confirm()

    if(confirm){
      await api.delete(`/notes/${params.id}`)
      navigate(-1) 
    }
  }

  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data);
    }

    fetchNote();
  },[])
  return(
    <Container> 
      <Header />

    { data &&
      <main>
        <Content>
          <ButtonText title="Excluir nota" onClick={handleRemove}/>

          <h1>{data.title}</h1>

          <p>{data.description}</p>
          {
            data.links &&
            <Section title="Links úteis">
              <Links>
                {
                  data.links.map(link => (
                    <li key={link.id} >
                        <a
                          href={link.url} target="_blank">
                          {link.url}
                        </a>
                    </li>
                  ))
                }
              </Links>
            </Section>
          }

          { data.tags &&
            <Section title="Marcadores">
              {
                data.tags.map(tag => (
                  <Tag 
                    title={tag.name}
                    key={tag.id}
                    />
                ))
              }
            </Section>
          }

          <Button title="voltar" onClick={handleBack}/>
        </Content>
      </main>
    }
    </Container>
  )
}