import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import './NewsletterComponent.css';

const CenteredCard = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
            <IonCard style={{ width: '80%', maxWidth: '800px', borderRadius: '15px' }}>
                <IonCardHeader>
                    <IonCardTitle style={{ textAlign: 'center' }}>Help us improve our Privacy Knowledge Base</IonCardTitle>
                </IonCardHeader>

                <IonCardContent style={{ textAlign: 'center' }}>
                    <IonButton expand="block" href="https://forms.office.com/Pages/ResponsePage.aspx?id=w40yxt-vzkCEbTJu6thtSWhc53XWcMJPsrsDjb62EZ9UQ1MwTkRTNlRUUjBWR0hIVURERk82NzkwMC4u" target="_blank" rel="noopener noreferrer" className="newsletter-button">
                        Leave us a Feedback!
                    </IonButton>

                </IonCardContent>
            </IonCard>
        </div>
    );
};

export default CenteredCard;
