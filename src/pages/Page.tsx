import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import './Page.css';

const Page: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:1337/api/patterns')
      .then((response) => {
        console.log(response.data);

        const mappedPatterns = response.data.data.map((p: { id: number; attributes: { name: string; description: string; contex: string; }; }) => ({
          id: p.id,
          name: p.attributes.name,
          desc: p.attributes.description,
          contex: p.attributes.contex
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
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Cani Sudati</IonTitle>
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
            <Card key={index} name={p.name} desc={p.desc} contex={p.contex} />
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default Page;
