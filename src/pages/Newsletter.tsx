import React from 'react';
import NewsletterComponent from '../components/NewsletterComponent';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const NewsletterPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iscriviti alla nostra Newsletter</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <NewsletterComponent />
            </IonContent>
        </IonPage>
    );
};

export default NewsletterPage;
