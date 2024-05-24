import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonList, IonItem, IonLabel, IonCol, IonGrid, IonRow, IonButton, IonRouterLink } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import './Page.css';
import Masonry from 'react-masonry-css';
import { useHistory } from 'react-router-dom';

const Strategy: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Strategy Research</IonTitle>
                    <IonButtons slot="end">
                        <IonRouterLink href='/'>Pattern Research</IonRouterLink>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

            </IonContent>
        </IonPage >
    );
};

export default Strategy;