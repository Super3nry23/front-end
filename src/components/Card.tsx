import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonGrid, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonListHeader, IonRow } from '@ionic/react';
import './Card.css'
import { alertCircleOutline, chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

interface CardProps {
  name: string;
  desc: string;
  contex: string;
  weaknesses: string[];
  principle: string[];
  mvcCollocation: string[];
  iso: string[];
  gdpr: string[];
  owasp: string[];
}

const Card: React.FC<CardProps> = ({ name = "name", desc = "desc", contex = "contex", weaknesses = [], principle = [], mvcCollocation = [], iso = [], gdpr = [], owasp = [] }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle class="ion-text-center">{name}</IonCardTitle>
      </IonCardHeader>

      <IonItemDivider>
        <h3>Description</h3>
        <IonCardContent>{desc}</IonCardContent>
      </IonItemDivider>
      <IonItemDivider>
        <h3>Contex</h3>
        <IonCardContent>{contex}</IonCardContent>
      </IonItemDivider>

      {showDetails && (
        <IonList>
          <IonList>
            <IonListHeader>
              <IonLabel><h3>Weaknesses:</h3></IonLabel>
            </IonListHeader>
            {weaknesses.map((weakness, index) => (
              <IonItem key={index}>
                <IonIcon icon={alertCircleOutline} slot="start" color="danger" />
                <IonChip color="danger">{weakness.name}</IonChip>
              </IonItem>
            ))}
          </IonList>

          <IonItem>
            Principle:
            {principle.map((principle, index) => (
              <IonChip key={index} color="primary">{principle.name}</IonChip>
            ))}
          </IonItem>
          <IonItem>
            MVC Collocation:
            {mvcCollocation.map((mvc, index) => (
              <IonChip key={index} color="success">{mvc.name}</IonChip>
            ))}
          </IonItem>
          <IonItem>
            ISO:
            {iso.map((iso, index) => (
              <IonChip key={index} color="secondary">{iso.name} ({iso.code})</IonChip>
            ))}
          </IonItem>
          <IonItem>
            GDPR:
            {gdpr.map((gdpr, index) => (
              <IonChip key={index} color="tertiary">{gdpr.name} ({gdpr.code})</IonChip>
            ))}
          </IonItem>
          <IonItem>
            OWASP:
            {owasp.map((owasp, index) => (
              <IonChip key={index} color="warning">{owasp.name} ({owasp.code})</IonChip>
            ))}
          </IonItem>
        </IonList>
      )}

      <IonButton expand="full" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Nascondi dettagli' : 'Mostra dettagli'}
        <IonIcon slot="end" icon={showDetails ? chevronUpOutline : chevronDownOutline}></IonIcon>
      </IonButton>
    </IonCard>
  );
};
export default Card;