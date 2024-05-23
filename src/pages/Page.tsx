import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import './Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [patterns, setPatterns] = useState<{ title: string; desc: string; }[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:1337/api/patterns')
      .then((response) => {
        const mappedPatterns = response.data.data.map(p => ({
          title: p.attributes.name,
          desc: p.attributes.description
        }));
        setPatterns(mappedPatterns);
        setLoading(false); // Modificato da true a false
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // Assicurati di impostare loading su false in caso di errore
      });
  }, []);

  const filteredPatterns = patterns.filter(p =>
    p.title.toLowerCase().includes(searchText.toLowerCase())
  );

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
        <IonSearchbar 
          value={searchText}
          onIonInput={e => setSearchText((e.target as HTMLInputElement).value)}
        ></IonSearchbar>
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredPatterns.map((p, index) => (
            <Card key={index} title={p.title} desc={p.desc} />
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default Page;
