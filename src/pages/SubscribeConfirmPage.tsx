import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonText, IonCard} from '@ionic/react';
import { useLocation } from 'react-router';
import axios from 'axios';
import "./SubscribeConfirmPage.css"
import HomeButton from '../components/HomeButton';
import FeatureCard from '../components/FeatureCard';

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
            img:"confirm.png"
        },
        fail:{
            title:"Subscription Unsuccessful",
            subtitle:"This veryfication link may be expired",
            img:"fail.png"
        }
    },
    unsubscribe:{
        ok:{
            title:"Unubscription Successful",
            subtitle:"We will miss you",
            img:"confirm.png"
        },
        fail:{
            title:"Unsubscription Unsuccessful",
            subtitle:"This veryfication link may be expired",
            img:"fail.png"
        }
    },
    fail:{
        title:"Could not reach the server :-/",
        subtitle:"Please try again later",
        img:"server_error.png",
    },

}

const NewsletterConfirmation: React.FC = () => {
    const [confirmationMessage, setConfirmationMessage] = useState<{title:string,subtitle:string,img:string}>
    ({
        title:"Awaiting server",
        subtitle:"Please wait a moment...",
        img:"wait.png"
    });
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
                    if(response.status == 200){setConfirmationMessage(msgs[action].ok)}
                    if(response.status == 400) setConfirmationMessage(msgs[action].fail)
                })
                .catch(err => {
                    console.log(err)
                    setConfirmationMessage(msgs.fail)
                }
                )

        } else {
            setConfirmationMessage({title:'Missing Param',subtitle:' Link may Be Broken',img:"fail.png"});
        }
    }, [search]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Confirm Newsletter</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonCard color="light" className='card'>
                    <IonRow className='ion-justify-content-center'>
                        <img src={"../../resources/" + confirmationMessage.img} 
                        style={{
                            maxWidth: '250px',
                            maxHeight: '250px',
                        }}/>
                    </IonRow>
                    <IonText>
                        <h1 className='ion-text-center'>{confirmationMessage.title}</h1>
                        <h3 className='ion-text-center'>{confirmationMessage.subtitle}</h3>
                    </IonText>
                    <IonRow className='ion-justify-content-center'>
                        <HomeButton/>
                    </IonRow>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default NewsletterConfirmation;
