import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton,
  IonTitle, IonRouterLink, IonContent, IonSearchbar
} from '@ionic/react';
import StrategyCard from '../components/StrategyCard';
import PlaceholderCard from '../components/PlaceholderCard';
import { GET_STRATEGIES } from '../Query/graphQL';

const Strategy: React.FC = () => {
  const { loading, error, data } = useQuery(GET_STRATEGIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStrategies, setFilteredStrategies] = useState([]);

  useEffect(() => {
    if (data) {
      const filtered = data.strategies.data.filter((s) =>
        s.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStrategies(filtered);
    }
  }, [searchTerm]);

  if (error) return <p>Error :(</p>;
  if (loading) return Array(10).fill().map((_, i) => <PlaceholderCard key={i} />);

  const handleSearch = (event: CustomEvent) => {
    setSearchTerm(event.detail.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Strategy Research</IonTitle>
          <IonButtons slot="end">
            <IonRouterLink href='/'>Pattern Research</IonRouterLink>
          </IonButtons>
        </IonToolbar>
        <IonSearchbar
          value={searchTerm}
          onIonInput={handleSearch}
          placeholder="Search by strategy name"
        />
      </IonHeader>

      <IonContent fullscreen>
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
      </IonContent>
    </IonPage>
  );
};

export default Strategy;
