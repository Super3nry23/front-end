import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router';

// Funzione per effettuare la chiamata API al backend per confermare l'iscrizione o la disiscrizione
const confirmSubscription = async (id: string, code: string, action: string) => {
    const endpoint = action === 'subscribe' ?
        `http://localhost:1337/api/newsletter/subscribe/${id}&${code}` :
        `http://localhost:1337/api/newsletter/unsubscribe/${id}&${code}`;
    console.log("Ppocodio");

    try {
        const response = await fetch(endpoint, { method: 'GET' });
        if (response.ok) {
            const data = await response.json();
            return data.message;
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
};

const NewsletterConfirmation: React.FC = () => {
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const { search } = useLocation();
    const query = new URLSearchParams(search);


    useEffect(() => {
        const id = query.get('id');
        const code = query.get('code');
        const action = query.get('action'); // 'subscribe' o 'unsubscribe'

        console.log(id, code, action);

        if (id && code && action) {
            confirmSubscription(id, code, action)
                .then(message => setConfirmationMessage(message))
            //.catch(error => setConfirmationMessage('Si è verificato un errore durante la conferma.'));
        } else {
            setConfirmationMessage('Parametri mancanti o non validi.');
        }
    }, [search]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Conferma Newsletter</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {confirmationMessage ? (
                    <div>
                        <h2>{confirmationMessage}</h2>
                    </div>
                ) : (
                    <div>CONFERMA AVVENUTA</div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default NewsletterConfirmation;
