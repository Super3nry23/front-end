import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonCol, IonGrid, IonRow, IonButton, IonRouterLink } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import './Page.css';
import Masonry from 'react-masonry-css';
import { useHistory } from 'react-router-dom';

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
  const [mvcList, setMVCList] = useState<{ nameMVC: string }[]>([
    { nameMVC: 'Model' },
    { nameMVC: 'View' },
    { nameMVC: 'Controller' },
  ]);

  const [filters, setFilters] = useState({
    selectedGdpr: [],
    selectedOwasp: [],
    selectedWeakness: [],
    selectedStrategy: [],
    selectedPrinciple: [],
    selectedIso: [],
    selectedMVC: []
  });


  const [loading, setLoading] = useState(true);

  const fetchPatterns = (params: any) => {
    setLoading(true);
    let a = { param: params };
    axios.post('http://localhost:1337/api/patterns/src', a)
      .then((response) => {
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
          mvc: p.MCV_Collocation ? p.MCV_Collocation.map(mvc => ({
            name: mvc.name,
          })) : [],
        }));

        setPatterns(mappedPatterns);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const handleFilterChange = (e, filterType) => {
    const selectedValues = e.detail.value;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [filterType]: selectedValues };
      const params = {
        articleID: newFilters.selectedGdpr,
        owaspID: newFilters.selectedOwasp,
        weaknessID: newFilters.selectedWeakness,
        strategyID: newFilters.selectedStrategy,
        principleID: newFilters.selectedPrinciple,
        isoID: newFilters.selectedIso,
        mvc: newFilters.selectedMVC,
        text: newFilters.text ? [newFilters.text] : []
      };
      fetchPatterns(params);
      return newFilters;
    });
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
            src={patterns.length > 0 ? '../../resources/openbook.jpg' : '../../resources/closedbook.jpg'}
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
                    handleFilterChange({ detail: { value: text } }, 'text');
                  }}
                  placeholder='Ricerca qui il tuo Pattern'
                ></IonSearchbar>
              </IonCol>
            </IonRow>


            <IonRow>
              <IonCol size="12" size-md="6">
                <IonList>
                  <IonItem>
                    <IonLabel>Seleziona GDPR</IonLabel>
                    <IonSelect
                      value={filters.selectedGdpr}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'selectedGdpr')}
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
                    <IonLabel>Seleziona Oswap</IonLabel>
                    <IonSelect
                      value={filters.selectedOwasp}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'selectedOwasp')}
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
                    <IonLabel>Seleziona Weakness</IonLabel>
                    <IonSelect
                      value={filters.selectedWeakness}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'selectedWeakness')}
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
                    <IonLabel>Seleziona Strategy</IonLabel>
                    <IonSelect
                      value={filters.selectedStrategy}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'selectedStrategy')}
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
                    <IonLabel>Seleziona Principle</IonLabel>
                    <IonSelect
                      value={filters.selectedPrinciple}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'selectedPrinciple')}
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
                    <IonLabel>Seleziona Iso</IonLabel>
                    <IonSelect
                      value={filters.selectedIso}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'selectedIso')}
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
                    <IonLabel>Seleziona MVC</IonLabel>
                    <IonSelect
                      value={filters.selectedMVC}
                      multiple={true}
                      cancelText="Annulla"
                      okText="Conferma"
                      onIonChange={(e) => handleFilterChange(e, 'selectedMVC')}
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
            <p>Loading...</p>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {patterns.map((p) => (
                <div key={p.id}>
                  <Card name={p.name} desc={p.description} contex={p.contex} weaknesses={p.weaknesses} principle={p.principles} mvcCollocation={p.mvc} iso={p.isos} gdpr={p.gdpr} owasp={p.owasp} />
                </div>
              ))}
            </Masonry>
          )}
        </div>
      </IonContent>
    </IonPage >
  );
};

export default Page;