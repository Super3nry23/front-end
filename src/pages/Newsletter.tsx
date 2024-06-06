import React from 'react';
import NewsletterComponent from '../components/NewsletterComponent';
import UnsubscribeComponent from '../components/UnsubscribeComponent';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonRouterLink } from '@ionic/react'; // Aggiunto IonHeader, IonToolbar e IonTitle
import './SubscriptionPage.css';

const SubscriptionPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iscriviti o disiscriviti dalla nostra Newsletter</IonTitle>
                    <IonButtons slot="end">
                        <IonRouterLink href='/'>Pattern Research</IonRouterLink>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
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
