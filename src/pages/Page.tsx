import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonCol, IonGrid, IonRow, IonButton, IonRouterLink } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import './Page.css';
import Masonry from 'react-masonry-css';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NewsletterComponent from '../components/NewsletterComponent';
import { fetchGdpr, fetchIso, fetchOwasp, fetchPrinciple, fetchStrategyShort, fetchWeakness, gdpr, iso, owasp, principle, strategy, weakness } from '../helpers/fetchFormData';
import { breakpointColumnsObj } from '../helpers/breakpoint';
import Logo from '../components/Logo';

const Page: React.FC = () => {
  const history = useHistory();

  const [searchText, setSearchText] = useState<string>('');
  const [patterns, setPatterns] = useState<any[]>([]);
  const [gdprList, setGdprList] = useState<gdpr[]>([]);
  const [owaspList, setOwaspList] = useState<owasp[]>([]);
  const [weaknessList, setWeaknessList] = useState<weakness[]>([]);
  const [strategyList, setStrategyList] = useState<strategy[]>([]);
  const [principleList, setPrincipleList] = useState<principle[]>([]);
  const [isoList, setIsoList] = useState<iso[]>([]);
  const [mvcList] = useState<{ nameMVC: string }[]>([
    { nameMVC: 'Model' },
    { nameMVC: 'View' },
    { nameMVC: 'Controller' },
  ]);

  const [filters, setFilters] = useState({
    articleID: [],
    owaspID: [],
    weaknessID: [],
    strategyID: [],
    principleID: [],
    isoID: [],
    mvc: [],
    text: []
  });


  const [loading, setLoading] = useState(true);

  const fetchPatterns = (params: any) => {
    setLoading(true);
    let a = { param: params };
    axios.post('http://localhost:1337/api/patterns/src', a)
      .then((response) => {
        //console.log(response.data);
        const mappedPatterns = response.data.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          contex: p.contex,
          weaknesses: p.weaknesses ? p.weaknesses.map(weakness => ({
            id: weakness.id,
            code: weakness.code,
            name: weakness.name,
          })) : [],
          strategies: p.strategies ? p.strategies.map(strategy => ({
            id: strategy.id,
            name: strategy.name,
          })) : [],
          owasp: p.owasps ? p.owasps.map(owasp => ({
            id: owasp.id,
            code: owasp.code,
            name: owasp.name,
          })) : [],
          gdpr: p.gdprs ? p.gdprs.map(gdpr => ({
            id: gdpr.id,
            code: gdpr.code,
            name: gdpr.name,
          })) : [],
          principles: p.principles ? p.principles.map(principle => ({
            id: principle.id,
            name: principle.name,
          })) : [],
          isos: p.isos ? p.isos.map(iso => ({
            id: iso.id,
            code: iso.code,
            name: iso.name,
          })) : [],
          examples: p.Example ? p.Example.map(ex => ({
            id: ex.id,
            title: ex.title,
            description: ex.description,
          })) : [],
          mvc: p.MCV_Collocation ? p.MCV_Collocation.map(mvc => ({
            name: mvc.name,
          })) : [],
        }));
        //console.log('Mapped', mappedPatterns);
        setPatterns(mappedPatterns);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  function handleFilterChange(e, filterType: string) {
    const selectedValues = e.detail.value;
    let newFilter = filters;
    if (filterType != "text") {
      newFilter[filterType] = selectedValues;
    } else {
      newFilter[filterType] = selectedValues ? [selectedValues] : []
    }
    setFilters(newFilter);
    fetchPatterns(filters);
  };

  useEffect(() => {
    fetchGdpr()
      .then(setGdprList)
      .catch((error) => { console.error("Error:", error) });
    fetchOwasp()
      .then(setOwaspList)
      .catch((error) => { console.error("Error:", error) });
    fetchWeakness()
      .then(setWeaknessList)
      .catch((error) => { console.error("Error:", error) });
    fetchStrategyShort()
      .then(setStrategyList)
      .catch((error) => { console.error("Error:", error) });
    fetchPrinciple()
      .then(setPrincipleList)
      .catch((error) => { console.error("Error:", error) });
    fetchIso()
      .then(setIsoList)
      .catch((error) => { console.error("Error:", error) });
  }, []);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Pattern Research</IonTitle>
          <IonButtons slot="end">
            <IonRouterLink href='/newsletter'>Newsletter</IonRouterLink>
            &nbsp;&nbsp;&nbsp;

            <IonRouterLink href='/strategy'>Strategy Research</IonRouterLink>

          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <Logo nPattern={patterns.length} />

        <div className="container">
          <IonGrid>
            <IonRow>
              <IonCol size="12" size-lg="6" offset-lg="3">
                <IonSearchbar
                  value={searchText}
                  onIonChange={e => {
                    const text = e.detail.value || '';
                    setSearchText(text);
                    handleFilterChange(e, 'text');
                  }}
                  placeholder='Search Your Pattern Here'
                ></IonSearchbar>
              </IonCol>
            </IonRow>


            <IonRow>
              <IonCol size="12" size-md="6">
                <IonList>
                  <IonItem>
                    <IonLabel>Select GDPR</IonLabel>
                    <IonSelect
                      value={filters.articleID}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'articleID')}
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
                      value={filters.owaspID}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'owaspID')}
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
                    <IonLabel>Select Weakness</IonLabel>
                    <IonSelect
                      value={filters.weaknessID}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'weaknessID')}
                    >
                      {weaknessList.map((weakness) => (
                        <IonSelectOption key={weakness.id} value={weakness.id}>
                          {weakness.code + ": " + weakness.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </IonCol>

              <IonCol size="12" size-md="6">
                <IonList>
                  <IonItem>
                    <IonLabel>Select Strategy</IonLabel>
                    <IonSelect
                      value={filters.strategyID}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'strategyID')}
                    >
                      {strategyList.map((strategy) => (
                        <IonSelectOption key={strategy.id} value={strategy.id}>
                          {strategy.name}
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
                    <IonLabel>Select Principle</IonLabel>
                    <IonSelect
                      value={filters.principleID}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'principleID')}
                    >
                      {principleList.map((principle) => (
                        <IonSelectOption key={principle.id} value={principle.id}>
                          {principle.name}
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
                      onIonChange={(e) => handleFilterChange(e, 'isoID')}
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
                    <IonLabel>Select MVC</IonLabel>
                    <IonSelect
                      value={filters.mvc}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'mvc')}
                    >
                      {mvcList.map((mvc) => (
                        <IonSelectOption key={mvc.nameMVC} value={mvc.nameMVC}>
                          {mvc.nameMVC}
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
          {loading ? (
            <p></p>

          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {patterns.map((p) => (
                <div key={p.id}>
                  <Card name={p.name} desc={p.description} contex={p.contex} weaknesses={p.weaknesses} principles={p.principles} mvcCollocation={p.mvc} isos={p.isos} gdprs={p.gdpr} owasps={p.owasp} strategies={p.strategies} examples={p.examples} />
                </div>
              ))}
            </Masonry>
          )}
        </div>
        <NewsletterComponent></NewsletterComponent>
      </IonContent>

    </IonPage >
  );
};

export default Page;