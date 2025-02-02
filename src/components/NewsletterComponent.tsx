import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonIcon, IonToast } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import './NewsletterComponent.css';

const NewsletterComponent: React.FC = () => {
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const subscribeToNewsletter = async () => {
        console.log(email);
        try {
            const response = await fetch('http://localhost:1337/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: { email } }),
            });


            const data = await response.json();

            if (data.result === 'SUCCESS') {
                setToastMessage('Registration successful! Check your email to confirm.');
            } else {
                setToastMessage('An error occurred while registering.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setToastMessage('An error occurred while registering.');
        }
        setShowToast(true);
    };

    return (
        <IonContent className="newsletter-content">
            <div className="custom-grid">
                <h3>Newsletter Subscription</h3>
                <IonInput
                    value={email}
                    onIonChange={e => setEmail(e.detail.value!)}
                    type="email"
                    placeholder="Enter your email"
                    className="newsletter-input" />
                <IonButton expand="block" onClick={subscribeToNewsletter} className="newsletter-button">
                    <IonIcon slot="start" icon={mailOutline} />
                    Subscribe
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

export default NewsletterComponent;
