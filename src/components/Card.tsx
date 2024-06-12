import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonGrid, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRow } from '@ionic/react';
import './Card.css'
import '../pages/Page.css';
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
    <IonCard className='custom-grid'>
      <IonCardHeader>
        <h4 className="ion-text-center ion-text-uppercase ion-h5" style={{ color: 'white' }}>{name}</h4>
      </IonCardHeader>

      <IonCardHeader style={{ display: 'flex', justifyContent: 'center' }}>
        <IonCardContent class="ion-text-center">{desc}</IonCardContent>
      </IonCardHeader>

      {showDetails && (
        <IonList>
          <IonCardHeader>
            <IonCardContent class="ion-text-center">{contex}</IonCardContent>
          </IonCardHeader>

          <IonList className='cardWeaknesses'>
            <IonGrid>
              <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
                <h4 style={{ color: 'white' }}>Weaknesses</h4>
              </IonRow>

              <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
                <IonCol size="12" style={{ display: 'inline-grid', justifyContent: 'center' }}>
                  {weaknesses.map((weakness, index) => (
                    <IonRow key={index} style={{ textAlign: 'left' }}>
                      <IonItem>
                        <IonIcon icon={alertCircleOutline} slot="start" color="danger" />
                        <IonChip color="danger">{weakness.name}</IonChip>
                      </IonItem>
                    </IonRow>
                  ))}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonList>

          <ChipList items={principles.map((p) => (p.name))}
            title='Principles' color='primary' />
          <ChipList items={strategies.map((str) => (str.name))}
            title='Strategies' color='strategy' />
          <ChipList items={mvcCollocation.map((mvc) => (mvc.name))}
            title='MVC Collocation' color='success' />
          <ExpandList items={isos.map((iso) => ({ code: "Phase " + iso.code, text: iso.name }))}
            title="Iso phase" color="secondary" />
          <ExpandList items={gdprs.map((gdpr) => ({ code: "Article " + gdpr.code, text: gdpr.name }))}
            title="GDPR Article" color="tertiary" />
          <ExpandList items={owasps.map((owasp) => ({ code: owasp.code, text: owasp.name }))}
            title="Owasp" color="warning" />

          {examples.length > 0 && (
            <IonList>
              <IonGrid>
                <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
                  <h4 style={{ color: 'white' }}>Examples</h4>
                </IonRow>
                <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
                  {examples.map((ex, index) => (
                    <IonItem key={index}>
                      <IonChip color="dark" style={{ fontSize: '16px', margin: '10px', padding: '15px' }}>
                        {ex.description}
                      </IonChip>
                    </IonItem>
                  ))}
                </IonRow>
              </IonGrid>
            </IonList>
          )}

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