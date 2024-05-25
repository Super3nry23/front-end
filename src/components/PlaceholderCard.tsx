import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import './PlaceholderCard.css';

const PlaceholderCard: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle className="card-loading"> </IonCardTitle>
            </IonCardHeader>
            <div className="card-loading div-loading" />
            <div className="card-loading div-loading" />
        </IonCard>
    );
};

export default PlaceholderCard;
