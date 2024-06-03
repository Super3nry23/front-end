import { IonItem,IonChip, IonIcon, IonLabel } from "@ionic/react";
import { addOutline, removeOutline } from "ionicons/icons";
import { useState } from "react";

export interface listElement {
    code: string;
    text: string;
}

const ExpandList :React.FC<{items:listElement[],title:string,color:string}> = 
    ({items = [], title = "", color = "primary"}) =>
    {
    const [focusedItem,setFocusedItem] = useState<listElement|null>(null);

    function focusItem(itemCode:listElement|null){
        console.log(itemCode);
        setFocusedItem(itemCode);
    }

    return ( 
        <IonItem>
            {title + ":"}
            { focusedItem==null && 
                items.map((item:listElement) => (
                <IonChip key={item.code} color={color} 
                onClick={() => (focusItem({code:item.code,text:item.text}))}>
                    <IonIcon icon={addOutline} />
                    <IonLabel>{item.code}</IonLabel>
                </IonChip>
            ))}
            {
                focusedItem != null && 
                <IonChip key={focusedItem.code} color={color} 
                onClick={() => (focusItem(null))}>
                    <IonIcon icon={removeOutline} />
                    <IonLabel>{focusedItem.code + " : " + focusedItem.text}</IonLabel>
                </IonChip>        
            }
        </IonItem>
    )
}

export default ExpandList;