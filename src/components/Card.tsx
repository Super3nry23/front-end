import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

interface CardProps {
    title: string;
    desc: string;
  }

const Card: React.FC<CardProps> = ({ title="titolo", desc="desc" }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>{desc}</IonCardContent>

      <IonButton fill="clear">Espandi</IonButton>
    </IonCard>
  );
}
export default Card;