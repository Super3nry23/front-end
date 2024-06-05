import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonToast, IonIcon } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import './UnsubscribeComponent.css';

const UnsubscribeComponent: React.FC = () => {
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const unsubscribeFromNewsletter = async () => {
        try {
            const response = await fetch('http://localhost:1337/api/newsletter/unsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: { email } }),
            });

            const data = await response.json();

            if (data.result === 'SUCCESS') {
                setToastMessage('Disiscrizione avvenuta con successo!');
            } else {
                setToastMessage('Si è verificato un errore durante la disiscrizione.');
            }
        } catch (error) {
            console.error('Errore durante la disiscrizione:', error);
            setToastMessage('Si è verificato un errore durante la disiscrizione.');
        }
        setShowToast(true);
    };

    return (
        <IonContent className="ion-padding unsubscribe-content">
            <div className="unsubscribe-container">
                <IonInput
                    value={email}
                    onIonChange={e => setEmail(e.detail.value!)}
                    type="email"
                    placeholder="Inserisci la tua email per disiscriverti"
                    className="unsubscribe-input" />
                <IonButton expand="block" onClick={unsubscribeFromNewsletter} className="unsubscribe-button">
                    <IonIcon slot="start" icon={mailOutline} />
                    Disiscriviti
                </IonButton>
            </div>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={toastMessage}
                duration={2000}
            />
        </IonContent>
    );
};

export default UnsubscribeComponent;
