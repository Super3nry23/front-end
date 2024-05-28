import { IonItem,IonChip, IonIcon, IonLabel } from "@ionic/react";
import { addOutline, removeOutline } from "ionicons/icons";
import { useState } from "react";

export interface list {
    code : string,
    text : string
}

export default function SelectableList({items, title, color}){

    const [focusedItem,setFocusedItem] = useState<list|null>(null);

    function focusItem(itemCode:list|null){
        console.log(itemCode);
        setFocusedItem(itemCode);
    }

       return( <IonItem>
                {title + ":"}
                { focusedItem==null && 
                    items.map((item) => (
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