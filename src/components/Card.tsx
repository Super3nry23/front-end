import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRow } from '@ionic/react';
import './Card.css'
import { alertCircleOutline, chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import ExpandList from './ExpandList';
import ChipList from './ChipList';

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

          <ChipList items={principles.map((p) => (p.name))} 
            title='Principles' color='primary'/>
          <ChipList items={strategies.map((str) => (str.name))}
            title='Strategies' color='strategy'/>
          <ChipList items={mvcCollocation.map((mvc) => (mvc.name))} 
            title='MVC Collocation' color='success'/>
          <ExpandList items={isos.map((iso) => ({code: "Phase " + iso.code, text: iso.name}))}
           title="Iso phase" color="secondary"/>
          <ExpandList items={gdprs.map((gdpr) => ({code:"Article " + gdpr.code, text: gdpr.name}))}
           title="GDPR Article" color="tertiary"/>
          <ExpandList items={owasps.map((owasp) => ({code:owasp.code , text:owasp.name}))} 
           title="Owasp" color="warning"/>
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