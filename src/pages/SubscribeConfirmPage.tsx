import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router';
import axios from 'axios';

// Funzione per effettuare la chiamata API al backend per confermare l'iscrizione o la disiscrizione
const confirmSubscription = async (id: string, code: string, action: string) => {
    const endpoint = action === 'subscribe' ?
        `http://localhost:1337/api/newsletter/subscribe/${id}&${code}` :
        `http://localhost:1337/api/newsletter/unsubscribe/${id}&${code}`;

    return axios.get(endpoint,{
        validateStatus: (status) => status == 200 || status == 400
    });
};

const msgs= {
    subscribe:{
        ok:{
            title:"Subscription Successful",
            subtitle:"Welcome to our Newsletter",
        },
        fail:{
            title:"Subscription Unsuccessful",
            subtitle:"This veryfication link may be expired",
        }
    },
    unsubscribe:{
        ok:{
            title:"Unubscription Successful",
            subtitle:"We will miss you",
        },
        fail:{
            title:"Unsubscription Unsuccessful",
            subtitle:"This veryfication link may be expired",
        }
    },
    fail:{
        title:"Could not reach the server :-/",
        subtitle:"Please try again later",
    },

}

const NewsletterConfirmation: React.FC = () => {
    const [confirmationMessage, setConfirmationMessage] = useState<{title:string,subtitle:string}|null>(null);
    const { search } = useLocation();
    const query = new URLSearchParams(search);


    useEffect(() => {
        const id = query.get('id');
        const code = query.get('code');
        const action = query.get('action'); // 'subscribe' o 'unsubscribe'

        console.log(id, code, action);

        if (id && code && action) {
            confirmSubscription(id, code, action)
                .then(response => {
                    if(response.status == 200) setConfirmationMessage(msgs[action].ok)
                    if(response.status == 400) setConfirmationMessage(msgs[action].fail)
                })
                .catch(err => {
                    console.log(err)
                    setConfirmationMessage(msgs.fail)
                }
                )

        } else {
            setConfirmationMessage({title:'Missing Param',subtitle:' Link may Be Broken'});
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
                        <h2>{confirmationMessage.title}</h2>
                        <h3>{confirmationMessage.subtitle}</h3>
                    </div>
                ) : (
                    <div>
                         <h2>Awaiting server</h2>
                         <h3>Please Wait a moment ...</h3>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default NewsletterConfirmation;
