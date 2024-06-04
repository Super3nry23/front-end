import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonIcon } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import './NewsletterComponent.css';

const NewsletterComponent: React.FC = () => {
    const [email, setEmail] = useState('');

    const subscribeToNewsletter = () => {
        console.log('Subscribed with:', email);
        // Aggiungi qui la logica per integrare il servizio di newsletter
    };

    return (
        <><IonContent className="ion-padding newsletter-content">
            <div className="newsletter-container">
                <IonInput
                    value={email}
                    onIonChange={e => setEmail(e.detail.value!)}
                    type="email"
                    placeholder="Inserisci la tua email"
                    className="newsletter-input" />
                <IonButton expand="block" onClick={subscribeToNewsletter} className="newsletter-button">
                    <IonIcon slot="start" icon={mailOutline} />
                    Iscriviti
                </IonButton>
            </div>
        </IonContent></>
    );
};

export default NewsletterComponent;
