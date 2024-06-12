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
import { GET_STRATEGIES, GET_STRATEGIES_BY_PATTERN_TYPE, GET_STRATEGIES_EXTENDED } from '../Query/graphQL';
import Masonry from 'react-masonry-css';
import './Page.css';
import { fetchGdpr, fetchIso, fetchOwasp, fetchPatternShort, fetchPrinciple, fetchWeakness, gdpr, iso, owasp, principle, strategy, weakness } from '../helpers/fetchFormData';
import { breakpointColumnsObj } from '../helpers/breakpoint';
import Logo from '../components/Logo';
import Header from '../components/Header';

const Strategy: React.FC = () => {
  // Fetch Data
  let { loading, error, data } = useQuery(GET_STRATEGIES_EXTENDED);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStrategies, setFilteredStrategies] = useState([]);
  const [principleList, setPrincipleList] = useState<principle[]>([]);
  const [patterns, setPatterns] = useState<any[]>([]);
  const [gdprList, setGdprList] = useState<gdpr[]>([]);
  const [owaspList, setOwaspList] = useState<owasp[]>([]);
  const [weaknessList, setWeaknessList] = useState<weakness[]>([]);
  const [isoList, setIsoList] = useState<iso[]>([]);
  const [typeList] = useState<{ nameType: string }[]>([
    { nameType: 'Data_Oriented' },
    { nameType: 'Process_Oriented' },
  ]);

  const [selectedTypeList, setSelectedTypeList] = useState<{ nameType: string }[]>([]);
  const [selectedPatternList, setSelectedPatternList] = useState<any[]>([]);
  const [selectedIsoList, setSelectedIsoList] = useState<any[]>([]);
  const [selectedGdprList, setSelectedGdprList] = useState<any[]>([]);
  const [selectedOwaspList, setSelectedOwaspList] = useState<any[]>([]);
  const [selectedWeaknessList, setSelectedWeaknessList] = useState<any[]>([]);
  const [selectedPrincipleList, setSelectedPrincipleList] = useState<any[]>([]);

  // Gestione degli effetti, cambiamenti e funzioni
  useEffect(() => {
    if (data) {
      const filtered = data.strategies.data.filter((s) =>
        s.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        s.attributes.type.includes(selectedTypeList) &&
        selectedPatternList.every(id => s.attributes.patterns.data.some(pattern => pattern.id == id)) &&
        selectedIsoList.every(id =>
          s.attributes.patterns.data.some(pattern =>
            pattern.attributes.isos.data.some(iso => iso.id == id)
          )
        ) &&
        selectedGdprList.every(id =>
          s.attributes.patterns.data.some(pattern =>
            pattern.attributes.gdprs.data.some(gdpr => gdpr.id == id)
          )
        ) &&
        selectedOwaspList.every(id =>
          s.attributes.patterns.data.some(pattern =>
            pattern.attributes.owasps.data.some(owasp => owasp.id == id)
          )
        ) &&
        selectedWeaknessList.every(id =>
          s.attributes.patterns.data.some(pattern =>
            pattern.attributes.weaknesses.data.some(weakness => weakness.id == id)
          )
        ) &&
        selectedPrincipleList.every(id =>
          s.attributes.patterns.data.some(pattern =>
            pattern.attributes.principles.data.some(principle => principle.id == id)
          )
        )
      );
      setFilteredStrategies(filtered);
    }
  }, [selectedTypeList, searchTerm, data, selectedPatternList, selectedIsoList, selectedGdprList, selectedOwaspList, selectedWeaknessList, selectedPrincipleList]);



  // Fetch Valori Filtri
  useEffect(() => {
    fetchPrinciple()
      .then(setPrincipleList)
      .catch((error) => { console.error("Error:", error) });
    fetchPatternShort()
      .then(setPatterns)
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

  // Hendler Filtri
  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value);
  };

  const handleType = (event: CustomEvent) => {
    setSelectedTypeList(event.detail.value);
  };

  const handlePattern = (event: CustomEvent) => {
    setSelectedPatternList(event.detail.value);
  };

  const handleIso = (event: CustomEvent) => {
    setSelectedIsoList(event.detail.value);
  };

  const handleGdpr = (event: CustomEvent) => {
    setSelectedGdprList(event.detail.value);
  };

  const handleOwasp = (event: CustomEvent) => {
    setSelectedOwaspList(event.detail.value);
  };

  const handleWeakness = (event: CustomEvent) => {
    setSelectedWeaknessList(event.detail.value);
  };

  const handlePrinciple = (event: CustomEvent) => {
    setSelectedPrincipleList(event.detail.value);
  };

  // Render condizionale prima del return principale
  if (loading) return Array(10).fill().map((_, i) => <PlaceholderCard key={i} />);
  if (error) return <p>Error :(</p>;


  return (
    <IonPage>
      <Header />

      <IonContent fullscreen>
        <Logo nPattern={patterns.length} />

        <div className="container">
          <IonGrid className='custom-grid'>
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
              <IonCol size="12" size-md="6">
                <IonList>
                  <IonItem>
                    <IonLabel>Select GDPR</IonLabel>
                    <IonSelect
                      value={selectedGdprList}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={handleGdpr}
                    >
                      {gdprList.map((gdpr) => (
                        <IonSelectOption key={gdpr.id} value={gdpr.id}>
                          {gdpr.code + ". " + gdpr.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>

              <IonCol size="12" size-md="6">
                <IonList>
                  <IonItem>
                    <IonLabel>Select Oswap</IonLabel>
                    <IonSelect
                      value={selectedOwaspList}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={handleOwasp}
                    >
                      {owaspList.map((owasp) => (
                        <IonSelectOption key={owasp.id} value={owasp.id}>
                          {owasp.code + ": " + owasp.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="6">
                <IonList>
                  <IonItem>
                    <IonLabel>Select Principles</IonLabel>
                    <IonSelect
                      value={selectedPrincipleList}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={handlePrinciple}
                    >
                      {principleList.map((p) => (
                        <IonSelectOption key={p.id} value={p.id}>
                          {p.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>

              <IonCol size="12" size-md="6">
                <IonList>
                  <IonItem>
                    <IonLabel>Select Weakness</IonLabel>
                    <IonSelect
                      value={selectedWeaknessList}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={handleWeakness}
                    >
                      {weaknessList.map((w) => (
                        <IonSelectOption key={w.id} value={w.id}>
                          {w.code + ": " + w.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" size-md="4">
                <IonList>
                  <IonItem>
                    <IonLabel>Select Pattern</IonLabel>
                    <IonSelect
                      value={selectedPatternList}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={handlePattern}
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
                      value={selectedIsoList}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={handleIso}
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
                      value={selectedTypeList}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={handleType}
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

        <div className='CardContainer'>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredStrategies.length >= 0 ? (
              filteredStrategies.map((s) => (
                <div key={s.id}>
                  <StrategyCard
                    name={s.attributes.name}
                    short={s.attributes.short}
                    desc={s.attributes.description}
                    type={s.attributes.type}
                    patterns={s.attributes.patterns.data}
                  />
                </div>
              ))
            ) : (
              data.strategies.data.map((s) => (
                <div key={s.id}>
                  <StrategyCard
                    name={s.attributes.name}
                    short={s.attributes.short}
                    desc={s.attributes.description}
                    type={s.attributes.type}
                    patterns={s.attributes.patterns.data}
                  />
                </div>
              ))
            )}
          </Masonry>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Strategy;
