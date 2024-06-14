import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonRouterLink } from '@ionic/react';
import HomeButton from './HomeButton';

const Header : React.FC <{pageTitle:string}>= ({pageTitle = "Title"}) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>
                    {pageTitle}
                </IonTitle>
                <IonButtons slot="end">
                    <HomeButton/>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
