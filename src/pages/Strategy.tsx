import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton,
  IonTitle, IonRouterLink, IonContent, IonSearchbar,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import StrategyCard from '../components/StrategyCard';
import PlaceholderCard from '../components/PlaceholderCard';
import { GET_STRATEGIES } from '../Query/graphQL';
import Masonry from 'react-masonry-css';
import './Page.css';
import { fetchGdpr, fetchIso, fetchOwasp, fetchPrinciple, fetchWeakness, gdpr, iso, owasp, principle, strategy, weakness } from '../helpers/fetchFormData';

const Strategy: React.FC = () => {
  const { loading, error, data } = useQuery(GET_STRATEGIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStrategies, setFilteredStrategies] = useState([]);
  const [principleList, setPrincipleList] = useState<principle[]>([]);
  const [patterns, setPatterns] = useState<any[]>([]);
  const [gdprList, setGdprList] = useState<gdpr[]>([]);
  const [owaspList, setOwaspList] = useState<owasp[]>([]);
  const [weaknessList, setWeaknessList] = useState<weakness[]>([]);
  const [strategyList, setStrategyList] = useState<strategy[]>([]);
  const [isoList, setIsoList] = useState<iso[]>([]);
  const [mvcList] = useState<{ nameMVC: string }[]>([
    { nameMVC: 'Model' },
    { nameMVC: 'View' },
    { nameMVC: 'Controller' },
  ]);
  const [typeList] = useState<{ nameType: string }[]>([
    { nameType: 'Data Oriented' },
    { nameType: 'Process Oriented' },
  ]);

  const [filters, setFilters] = useState({
    patternID: [],
    articleID: [],
    owaspID: [],
    weaknessID: [],
    strategyID: [],
    principleID: [],
    isoID: [],
    mvc: [],
    text: [],
    type: []
  });

  // Gestione degli effetti e delle funzioni
  useEffect(() => {
    if (data) {
      const filtered = data.strategies.data.filter((s) =>
        s.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStrategies(filtered);
    }
  }, [searchTerm, data]);

  useEffect(() => {
    fetchPrinciple()
      .then(setPrincipleList)
      .catch((error) => { console.error("Error:", error) });
    fetchGdpr()
      .then(setGdprList)
      .catch((error) => { console.error("Error:", error) });
    fetchOwasp()
      .then(setOwaspList)
      .catch((error) => { console.error("Error:", error) });
    fetchWeakness()
      .then(setWeaknessList)
      .catch((error) => { console.error("Error:", error) });
    fetchIso()
      .then(setIsoList)
      .catch((error) => { console.error("Error:", error) });
  }, []);

  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value);
  };

  // Render condizionale prima del return principale
  if (loading) return Array(10).fill().map((_, i) => <PlaceholderCard key={i} />);
  if (error) return <p>Error :(</p>;

  const breakpointColumnsObj = {
    default: 2,  // Numero di colonne per default
    900: 1,      // Numero di colonne per schermi più grandi di 900px
    700: 1,      // Numero di colonne per schermi più grandi di 700px
    500: 1       // Numero di colonne per schermi più grandi di 500px
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Strategy Research</IonTitle>
          <IonButtons slot="end">
            <IonRouterLink href='/'>Pattern Research</IonRouterLink>
          </IonButtons>
        </IonToolbar>


        <div className="container">
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-lg="6" offset-lg="3">
                <IonSearchbar
                  value={searchTerm}
                  onIonInput={handleSearch}
                  placeholder="Search by strategy name"
                />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="4">
                <IonList>
                  <IonItem>
                    <IonLabel>Select Pattern</IonLabel>
                    <IonSelect
                      value={filters.patternID}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                    >
                      {patterns.map((pattern) => (
                        <IonSelectOption key={pattern.id} value={pattern.id}>
                          {pattern.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>

              <IonCol size="12" size-md="4">
                <IonList>
                  <IonItem>
                    <IonLabel>Select Iso</IonLabel>
                    <IonSelect
                      value={filters.isoID}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"

                    >
                      {isoList.map((iso) => (
                        <IonSelectOption key={iso.id} value={iso.id}>
                          {iso.code + ": " + iso.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>

              <IonCol size="12" size-md="4">
                <IonList>
                  <IonItem>
                    <IonLabel>Select Type</IonLabel>
                    <IonSelect
                      value={filters.type}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                    >
                      {typeList.map((type) => (
                        <IonSelectOption key={type.nameType} value={type.nameType}>
                          {type.nameType}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredStrategies.length > 0 ? (
            filteredStrategies.map((s) => (
              <StrategyCard
                key={s.id}
                name={s.attributes.name}
                short={s.attributes.short}
                desc={s.attributes.description}
                type={s.attributes.type}
                patterns={s.attributes.patterns.data}
              />
            ))
          ) : (
            data.strategies.data.map((s) => (
              <StrategyCard
                key={s.id}
                name={s.attributes.name}
                short={s.attributes.short}
                desc={s.attributes.description}
                type={s.attributes.type}
                patterns={s.attributes.patterns.data}
              />
            ))
          )}
        </Masonry>
      </IonContent>
    </IonPage>
  );
};

export default Strategy;
