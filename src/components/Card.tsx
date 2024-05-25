import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRow } from '@ionic/react';
import './Card.css'
import { alertCircleOutline, chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

interface CardProps {
  name: string;
  desc?: string;
  contex?: string;
  weaknesses?: string[];
  principles?: string[];
  strategies?: string[];
  mvcCollocation?: string[];
  isos?: string[];
  gdprs?: string[];
  owasps?: string[];
  examples?: string[];
}

const Card: React.FC<CardProps> = ({ name = "name", desc = "desc", contex = "contex", weaknesses = [], principles = [], strategies = [], mvcCollocation = [], isos = [], gdprs = [], owasps = [], examples = [] }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <IonCard style={{ marginBottom: '50px', borderRadius: '15px' }}>
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
            {principles.map((principle, index) => (
              <IonChip key={index} color="primary">{principle.name}</IonChip>
            ))}
          </IonItem>
          <IonItem>
            Strategies:
            {strategies.map((strategy, index) => (
              <IonChip key={index} style={{ color: '#fa026e', background: '#fa026e40' }}>{strategy.name}</IonChip>
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
            {isos.map((iso, index) => (
              <IonChip key={index} color="secondary">{iso.name} ({iso.code})</IonChip>
            ))}
          </IonItem>
          <IonItem>
            GDPR:
            {gdprs.map((gdpr, index) => (
              <IonChip key={index} color="tertiary">{gdpr.name} ({gdpr.code})</IonChip>
            ))}
          </IonItem>
          <IonItem>
            OWASP:
            {owasps.map((owasp, index) => (
              <IonChip key={index} color="warning">{owasp.name} ({owasp.code})</IonChip>
            ))}
          </IonItem>

          <IonList>
            <IonListHeader>
              <IonLabel><h3>Examples:</h3></IonLabel>
            </IonListHeader>
            {examples.map((ex, index) => (
              <IonItem key={index}>
                <IonChip color="dark">{ex.description}</IonChip>
              </IonItem>
            ))}
          </IonList>
        </IonList>
      )}

      <IonRow className="ion-justify-content-center ion-align-items-center">
        <IonCol size="10">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="custom-button"
          >
            {showDetails ? 'Nascondi dettagli' : 'Mostra dettagli'}
            <IonIcon slot="end" style={{ fontSize: '28px' }} icon={showDetails ? chevronUpOutline : chevronDownOutline} />
          </button>
        </IonCol>
      </IonRow>

    </IonCard>
  );
};
export default Card;