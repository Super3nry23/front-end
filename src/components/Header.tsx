import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonRouterLink } from '@ionic/react';

const Header = () => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle style={{ color: '#FFFFFF' }}>
                    <IonRouterLink href='/' style={{ color: 'inherit' }}>
                        Pattern Research
                    </IonRouterLink>
                </IonTitle>
                <IonButtons slot="end">
                    <IonTitle><IonRouterLink href='/newsletter'>Newsletter</IonRouterLink></IonTitle>
                    <IonTitle style={{ color: '#FFFF00' }}>
                        <IonRouterLink href='/strategy' style={{ color: 'inherit' }}>
                            Strategy Research
                        </IonRouterLink>
                    </IonTitle>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
