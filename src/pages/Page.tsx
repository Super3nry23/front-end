import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Card from '../components/Card';
//API bzz
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import './Page.css';


const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:1337/api/patterns')
      .then((response) => {
        
        const mappedPatterns = response.data.data.map(p => ({
          title: p.attributes.name,
          desc: p.attributes.description
        }));
        setPatterns(mappedPatterns);
        //setPatterns(response.data.data);
        setLoading(true);
        console.log(patterns);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
        {patterns.map((p) => (
            <Card title={p.title} desc={p.desc} ></Card>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default Page;
