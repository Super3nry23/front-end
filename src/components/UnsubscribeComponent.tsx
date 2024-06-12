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
                setToastMessage('Unsubscribe successfully!');
            } else {
                setToastMessage('An error occurred while unenrolling.');
            }
        } catch (error) {
            console.error('Error unsubscribing:', error);
            setToastMessage('An error occurred while unenrolling.');
        }
        setShowToast(true);
    };

    return (
        <IonContent className="newsletter-content">
            <div className="custom-grid">
                <h3>Newsletter</h3>
                <IonInput
                    value={email}
                    onIonChange={e => setEmail(e.detail.value!)}
                    type="email"
                    placeholder="Enter your email to unsubscribe"
                    className="unsubscribe-input" />
                <IonButton expand="block" onClick={unsubscribeFromNewsletter} fill="clear" className="primary">
                    <IonIcon slot="start" icon={mailOutline} />
                    Unsubscribe
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
