import { IonButton, IonIcon, NavContext } from "@ionic/react"
import { homeOutline } from "ionicons/icons"
import { useContext } from "react";

const HomeButton:React.FC<{color?:string}> = ({color = "primary"}) => {

    const {navigate} = useContext(NavContext);
    
    return (
    <IonButton color={color} onClick={() => navigate(".")}> 
        <IonIcon icon={homeOutline} slot='start'/>
        Back to Home 
    </IonButton>
    )
}

export default HomeButton;