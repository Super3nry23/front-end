import { useQuery, gql } from '@apollo/client';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonRouterLink, IonContent, IonLoading, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

// Definisci la tua query GraphQL
const GET_PATTERNS = gql`
  query GetPatterns {
    patterns(pagination: { page: 2, pageSize: 10 }) {
      data {
        id
        attributes {
          name
          description
          contex
          strategies {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const Strategy: React.FC = () => {
    const { loading, error, data } = useQuery(GET_PATTERNS);

    if (loading) return <IonLoading isOpen={loading} message={'Loading...'} />;
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
                    {data.patterns.data.map(({ id, attributes }) => (
                        <IonCard key={id}>
                            <IonCardHeader>
                                <IonCardTitle>{attributes.name}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>{attributes.description}</p>
                                <p>{attributes.contex}</p>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </IonContent>
            </IonPage >
    );
};

export default Strategy;
