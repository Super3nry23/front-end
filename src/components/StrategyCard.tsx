import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonGrid, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonRow } from '@ionic/react';
import './Card.css'
import { bulb, chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

interface CardProps {
    name: string;
    short: string;
    desc: string;
    type: string;
    patterns?: string[];
}

const Card: React.FC<CardProps> = ({ name = "name", desc = "desc", short = "short", type = "type", patterns = [] }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <IonCard className='custom-grid'>
            <IonCardHeader>
                <h4 className="ion-text-center ion-text-uppercase ion-h5 card-oncello" >{name}</h4>
            </IonCardHeader>

            <IonCardHeader style={{ display: 'flex', justifyContent: 'center' }}>
                <IonCardContent class="ion-text-center">{short}</IonCardContent>
            </IonCardHeader>

            {showDetails && (
                <IonList>
                    <IonCardHeader>
                        <IonCardContent class="ion-text-center">{desc}</IonCardContent>
                    </IonCardHeader>

                    <IonList className='cardWeaknesses'>
                        <IonGrid>
                            <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
                                <h4 className='card-oncello'>Patterns</h4>
                            </IonRow>

                            <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
                                <IonCol size="12" style={{ display: 'inline-grid', justifyContent: 'center' }}>
                                    {patterns.map((p, index) => (
                                        <IonRow key={index} style={{ textAlign: 'left' }}>
                                            <IonItem>
                                                <IonIcon icon={bulb} slot="start" color="success" />
                                                <IonChip color="success">{p.attributes.name}</IonChip>
                                            </IonItem>
                                        </IonRow>
                                    ))}
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonList>

                    <IonItem>
                        <IonGrid>
                            <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
                                <h4 className='card-oncello'>Type</h4>
                            </IonRow>
                            <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
                                <IonChip color='warning'>
                                    {type}
                                </IonChip>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonList>
            )}

            <IonRow className="ion-justify-content-center ion-align-items-center">
                <IonCol size="10">
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="custom-button"
                    >
                        {showDetails ? 'Hide details' : 'Show more'}
                        <IonIcon slot="end" style={{ fontSize: '28px' }} icon={showDetails ? chevronUpOutline : chevronDownOutline} />
                    </button>
                </IonCol>
            </IonRow>

        </IonCard>
    );
};
export default Card;