import { IonButton, IonCard, IonIcon, IonRow, NavContext } from "@ionic/react"
import HomeButton from "./HomeButton";
import "./FeatureCard.css"
import { useContext } from "react";
import { arrowForwardOutline } from "ionicons/icons";

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
        <IonCard color={color} className="featureCard">
            <img src={img} className="ion-float-left"
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
                        <IonButton onClick={() => navigate(link)}> 
                            <IonIcon icon={arrowForwardOutline} slot="start"/>
                            {button} 
                        </IonButton>
                    ) : (
                        <a href={link}>
                            <IonButton> 
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