import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonCol, IonGrid, IonRow, IonButton, IonRouterLink } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import './Page.css';
import Masonry from 'react-masonry-css';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NewsletterComponent from '../components/NewsletterComponent';
import Newsletter from '@strapi-newsletter/react';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Page: React.FC = () => {
  const history = useHistory();

  const [searchText, setSearchText] = useState<string>('');
  const [patterns, setPatterns] = useState<any[]>([]);

  const [gdprList, setGdprList] = useState<{ nameGdpr: string; id: number; }[]>([]);
  const [owaspList, setOwaspList] = useState<{ nameOwasp: string; id: number; }[]>([]);
  const [weaknessList, setWeaknessList] = useState<{ nameWeakness: string; id: number; }[]>([]);
  const [isoList, setIsoList] = useState<{ nameIso: string; id: number; }[]>([]);
  const [strategyList, setStrategyList] = useState<{ nameStrategy: string; id: number; }[]>([]);
  const [principleList, setPrincipleList] = useState<{ namePrinciple: string; id: number; }[]>([]);
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
        setOwaspList(mappedOwasp);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    axios.get('http://localhost:1337/api/weaknesses')
      .then((response) => {
        const mappedWeakness = response.data.data.map((w: any) => ({
          nameWeakness: w.attributes.name,
          id: w.id
        }));
        setWeaknessList(mappedWeakness);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    axios.get('http://localhost:1337/api/strategies')
      .then((response) => {
        const mappedStrayegy = response.data.data.map((w: any) => ({
          nameStrategy: w.attributes.name,
          id: w.id
        }));
        setStrategyList(mappedStrayegy);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    axios.get('http://localhost:1337/api/principles')
      .then((response) => {
        const mappedPrinciples = response.data.data.map((w: any) => ({
          namePrinciple: w.attributes.name,
          id: w.id
        }));
        setPrincipleList(mappedPrinciples);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    axios.get('http://localhost:1337/api/isos')
      .then((response) => {
        const mappedIso = response.data.data.map((w: any) => ({
          nameIso: w.attributes.name,
          id: w.id
        }));
        setIsoList(mappedIso);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const breakpointColumnsObj = {
    default: 2,  // Numero di colonne per default
    900: 1,     // Numero di colonne per schermi più grandi di 900px
    700: 1,      // Numero di colonne per schermi più grandi di 700px
    500: 1       // Numero di colonne per schermi più grandi di 500px
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Pattern Research</IonTitle>
          <IonButtons slot="end">
            <IonRouterLink href='/strategy'>Strategy Research</IonRouterLink>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '15vh',
          padding: '50px'
        }}>
          <img
            src={patterns.length > 0 ? '../../resources/open_logo.png' : '../../resources/closed_logo.png'}
            alt="book"
            style={{
              maxWidth: '250px',
              maxHeight: '250px',
              objectFit: 'contain',
              margin: 'auto',
              borderRadius: '10px'
            }}
          />
        </div>

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
                          {gdpr.nameGdpr}
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
                          {owasp.nameOwasp}
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
                          {weakness.nameWeakness}
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
                          {strategy.nameStrategy}
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
                          {principle.namePrinciple}
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
                          {iso.nameIso}
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