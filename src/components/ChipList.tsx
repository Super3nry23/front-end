import { IonChip, IonGrid, IonItem, IonRow } from "@ionic/react";
import './Card.css'

const ChipList: React.FC<{ items: string[], title: string, color: string }> =
  ({ items = [], title = "", color = "primary" }) => {
    return (
      <IonItem>
        <IonGrid>
          <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
            <h4 className="card-oncello">{title}</h4>
          </IonRow>
          <IonRow style={{ display: 'flex', justifyContent: 'center' }}>
            {items.map((item, index) => (
              <IonChip key={index} color={color}>
                {item}
              </IonChip>
            ))}
          </IonRow>
        </IonGrid>
      </IonItem>
    )
  };

export default ChipList;