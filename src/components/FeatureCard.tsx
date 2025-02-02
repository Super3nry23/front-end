import { IonButton, IonCard, IonIcon, IonRow, NavContext } from "@ionic/react"
import HomeButton from "./HomeButton";
import "./FeatureCard.css"
import { useContext } from "react";
import { arrowForwardOutline } from "ionicons/icons";
import '../pages/Page.css';

interface props{
    img:string,
    color?:string,
    link:string,
    button?:string
    external?:boolean,
    children?: string | JSX.Element | JSX.Element[]
}

const FeatureCard : React.FC<props> = ({img, color="light", link, button = "Go To", external = false, children}) => {

    const {navigate} = useContext(NavContext);

    return (
        <IonCard color={color} className='custom-grid'>
            <img src={img} className="image"
            style={{
                maxWidth: '250px',
                maxHeight: '250px',
            }}/>
            <div>
                {children}
            </div>
            <IonRow className="ion-justify-content-center">
                {
                    !external ? (
                        <IonButton onClick={() => navigate(link)} style={{ color: 'white'}}> 
                            <IonIcon icon={arrowForwardOutline} slot="start"/>
                            {button} 
                        </IonButton>
                    ) : (
                        <a href={link} target="_blank">
                            <IonButton style={{ color: 'white'}}> 
                                <IonIcon icon={arrowForwardOutline} slot="start"/>
                                {button}
                            </IonButton>
                        </a>
                    )
                }
            </IonRow>
        </IonCard>
    )
};

export default FeatureCard;