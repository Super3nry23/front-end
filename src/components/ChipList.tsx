import { IonChip, IonItem} from "@ionic/react";

const ChipList : React.FC<{items:string[],title:string,color:string}> = 
    ({items = [], title = "", color = "primary"}) => 
    {
        return(
        <IonItem>
            {title + ":"}
            {items.map((item, index) => (
              <IonChip key={index} color={color}> 
                {item}
              </IonChip>
            ))}
        </IonItem>
        )
    };

export default ChipList;