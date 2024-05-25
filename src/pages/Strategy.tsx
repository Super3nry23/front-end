import { useQuery, gql } from '@apollo/client';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonRouterLink, IonContent } from '@ionic/react';
import Card from '../components/Card';
import PlaceholderCard from '../components/PlaceholderCard';
import { GET_STRATEGIES } from '../Query/graphQL';

const Strategy: React.FC = () => {
  const { loading, error, data } = useQuery(GET_STRATEGIES);

  if (error) return <p>Error :(</p>;

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
      </IonHeader>

      <IonContent fullscreen>
        {loading ? (
          Array(10).fill().map((_, i) => <PlaceholderCard key={i} />)
        ) : (
          data.strategies.data.map((s) => (
            <Card
              key={s.id}
              name={s.attributes.name}
            />
          ))
        )}
      </IonContent>
    </IonPage >
  );
};

export default Strategy;