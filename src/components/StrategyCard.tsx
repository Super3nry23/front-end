import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonListHeader, IonRow } from '@ionic/react';
import './Card.css'
import { alertCircleOutline, bulb, chevronDownOutline, chevronUpOutline, cog } from 'ionicons/icons';

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
        <IonCard style={{ marginBottom: '50px', borderRadius: '15px' }}>
            <IonCardHeader>
                <IonCardTitle class="ion-text-center">{name}</IonCardTitle>
            </IonCardHeader>

            <IonItemDivider>
                <h3>Short</h3>
                <IonCardContent>{short}</IonCardContent>
            </IonItemDivider>

            {showDetails && (
                <IonList>
                    <IonItemDivider>
                        <h3>Description</h3>
                        <IonCardContent>{desc}</IonCardContent>
                    </IonItemDivider>

                    <IonList>
                        <IonListHeader>
                            <IonLabel><h2>Patterns:</h2></IonLabel>
                        </IonListHeader>
                        {patterns.map((p, index) => (
                            <IonItem key={index}>
                                <IonIcon icon={bulb} slot="start" color="success" />
                                <IonChip color="success">{p.attributes.name}</IonChip>
                            </IonItem>
                        ))}
                    </IonList>

                    <IonItemDivider>
                        <h3>Type</h3>
                        <IonChip color='dark'>
                            {type}
                        </IonChip>
                    </IonItemDivider>
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