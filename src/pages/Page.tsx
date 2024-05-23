import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonList, IonItem, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import './Page.css';

const Page: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [patterns, setPatterns] = useState<any[]>([]);
  const [gdprList, setGdprList] = useState<{ nameGdpr: string; id: number; }[]>([]);
  const [owaspList, setOwaspList] = useState<{ nameOwasp: string; id: number; }[]>([]);
  const [selectedGdpr, setSelectedGdpr] = useState<number[]>([]);
  const [selectedOwasp, setSelectedOwasp] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:1337/api/patterns?populate=*')
      .then((response) => {
        console.log('Patterns:', response.data.data);
        const mappedPatterns = response.data.data.map((p: any) => ({
          id: p.id,
          name: p.attributes.name,
          desc: p.attributes.description,
          contex: p.attributes.contex,
          gdprIds: p.attributes.gdprs.data.map((gdpr: any) => gdpr.id), // Accedi correttamente agli ID di ogni GDPR
          owaspIds: p.attributes.owasps.data.map((owasp: any) => owasp.id)
        }));
        console.log('MappedPattern:', mappedPatterns);
        setPatterns(mappedPatterns);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });

    axios.get('http://localhost:1337/api/gdprs')
      .then((response) => {
        const mappedGdpr = response.data.data.map((g: any) => ({
          nameGdpr: g.attributes.name,
          id: g.id
        }));
        setGdprList(mappedGdpr);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    axios.get('http://localhost:1337/api/owasps')
      .then((response) => {
        const mappedOwasp = response.data.data.map((o: any) => ({
          nameOwasp: o.attributes.name,
          id: o.id
        }));
        console.log('oswaps:', mappedOwasp);
        setOwaspList(mappedOwasp);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }, []);

  const filteredPatterns = patterns.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase()) &&
    selectedGdpr.every(selectedId => p.gdprIds.includes(selectedId)) &&
    selectedOwasp.every(selectedId => p.owaspIds.includes(selectedId))
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
          onIonInput={e => setSearchText(e.detail.value || '')}
        ></IonSearchbar>

        <IonList>
          <IonItem>
            <IonLabel>Seleziona GDPR</IonLabel>
            <IonSelect
              value={selectedGdpr}
              multiple={true}
              cancelText="Annulla"
              okText="Conferma"
              onIonChange={(e) => setSelectedGdpr(e.detail.value)}
            >
              {gdprList.map((gdpr) => (
                <IonSelectOption key={gdpr.id} value={gdpr.id}>
                  {gdpr.nameGdpr}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>

        <IonList>
          <IonItem>
            <IonLabel>Seleziona Oswap</IonLabel>
            <IonSelect
              value={selectedOwasp}
              multiple={true}
              cancelText="Annulla"
              okText="Conferma"
              onIonChange={(e) => setSelectedOwasp(e.detail.value)}
            >
              {owaspList.map((owasp) => (
                <IonSelectOption key={owasp.id} value={owasp.id}>
                  {owasp.nameOwasp}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>

        <IonList>
          <IonItem>
            <IonLabel>Seleziona GDPR</IonLabel>
            <IonSelect
              value={selectedGdpr}
              multiple={true}
              cancelText="Annulla"
              okText="Conferma"
              onIonChange={(e) => setSelectedGdpr(e.detail.value)}
            >
              {gdprList.map((gdpr) => (
                <IonSelectOption key={gdpr.id} value={gdpr.id}>
                  {gdpr.nameGdpr}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>

        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredPatterns.map((p) => (
            <Card key={p.id} name={p.name} desc={p.desc} contex={p.contex} />
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default Page;
