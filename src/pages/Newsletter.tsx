import React from 'react';
import NewsletterComponent from '../components/NewsletterComponent';
import UnsubscribeComponent from '../components/UnsubscribeComponent';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonRouterLink } from '@ionic/react'; // Aggiunto IonHeader, IonToolbar e IonTitle
import './SubscriptionPage.css';
import Header from '../components/Header';

const SubscriptionPage: React.FC = () => {
    return (
        <IonPage>
            <Header pageTitle='Newsletter'/>
            <IonContent className="subscription-page-content">
                <div className="subscription-container">
                    <NewsletterComponent />
                    <UnsubscribeComponent />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default SubscriptionPage;
