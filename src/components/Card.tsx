import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonItemDivider, IonItemGroup, IonRow } from '@ionic/react';
import './Card.css'
import { chevronDownOutline } from 'ionicons/icons';

interface CardProps {
  name: string;
  desc: string;
  contex: string;
}

const Card: React.FC<CardProps> = ({ name = "name", desc = "desc", contex = "contex" }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>


      <IonItemDivider>
        <IonCardContent>{desc}</IonCardContent>
      </IonItemDivider>
      <IonItemDivider>
        <IonCardContent>{contex}</IonCardContent>
      </IonItemDivider>

      <IonGrid fixed={true}>
        <IonRow class="ion-align-items-center">
          <IonCol>
            <IonButton size="small" fill="clear">
              Espandi
              <IonIcon slot="end" icon={chevronDownOutline}></IonIcon>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid >
    </IonCard>

  );
}
export default Card;