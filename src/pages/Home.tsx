import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import FeatureCard from "../components/FeatureCard";
import './Page.css';
import Logo from "../components/Logo";

const Home = () => (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>
                    WetDogs S.R.L. Posd System 
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <img src = "../../resources/closed_logo.png" style={{
                    maxWidth: '250px',
                    maxHeight: '250px',
                    objectFit: 'contain',
                    margin: 'auto',
                    borderRadius: '10px',
                    justifySelf: "center",
                    display: "block"
                }}/>
            <h1 className="title"><span>Posd System</span></h1>
            <h2 className="subtitle">By <span>WetDogs S.R.L.</span></h2>

            <div className='custom-grid' style={{ textAlign: 'center' }}> Welcome to the Privacy Knowledge Base
                In an era where the complexity of information systems is ever-increasing, safeguarding privacy demands deep understanding and expert management. Our Privacy Knowledge Base is crafted as a touchstone for IT specialists who aim to stay at the forefront of data defense strategies.
                Herein, you will find a comprehensive collection of privacy patterns, in-depth analyses, and case studies, all centered on the most advanced challenges and solutions in the field of cybersecurity. Our goal is to provide a platform that not only informs but also fosters debate and innovation among industry professionals.
                We invite experts to contribute their insights, exchange ideas, and collaborate towards a collective knowledge that raises the standards of privacy and security in our increasingly interconnected digital world.
                Explore, contribute, and join our community of experts to defend privacy in the digital age.
            </div>

            <h1 className="title">Click on one of the cards to explore our features </h1>
            <IonGrid>
                <IonRow>
                    <IonCol size="12" sizeMd="6">
                        <FeatureCard img="../../resources/server_error.png" link="./pattern" button="Search Pattern" color='red'>
                            <h1> Pattern </h1>
                            <p> Search the security pattern perfect for your application </p>
                        </FeatureCard>
                    </IonCol>
                    <IonCol size="12" sizeMd="6">
                        <FeatureCard img="../../resources/whiteboard.png" link="./strategy" button="Search Strategy">
                            <h1> Strategy </h1>
                            <p> Search the right strategy for your project </p>
                        </FeatureCard>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol size="12" sizeMd="6">
                        <FeatureCard img="../../resources/mail.png" link="./newsletter" button="Subscribe now">
                            <h1> Newsletter </h1>
                            <p> Do not lose any update on privacy with our newsletter </p>
                        </FeatureCard>
                    </IonCol>
                    <IonCol size="12" sizeMd="6">
                        <FeatureCard img="../../resources/talk.png" link="https://forms.office.com/Pages/ResponsePage.aspx?id=w40yxt-vzkCEbTJu6thtSWhc53XWcMJPsrsDjb62EZ9UQ1MwTkRTNlRUUjBWR0hIVURERk82NzkwMC4u" button="Leave us a Feedback!" external={true}>
                            <h1> Feedback </h1>
                            <p> Send a feedback to help us improve the website </p>
                        </FeatureCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
            
            <div className='custom-grid'>
                <img src="../../resources/wet_dogs.jpg" alt="logo" className="logo" style={{
                    margin: 'auto',
                    justifySelf: "center",
                    display: "block"
                }} />
                <h2 style={{ textAlign: 'center' }}>About us</h2>
                <h5 style={{ paddingLeft: '50px', paddingRight: '50px', textAlign: 'center'}}>
                    Wet Dogs Srl is your ideal choice for waterproof dog products, ensuring comfort and protection in all weather conditions. With innovative design and high-quality materials, we offer a wide range of products that keep your dog dry and happy, both during daily walks and outdoor adventures. Join our community and don’t let the rain stop the fun. Choose Wet Dogs Srl for an unparalleled outdoor experience, where style and functionality come together for the well-being of your furry friend.
                </h5>
            </div>
        </IonContent>
    </IonPage>
)

export default Home;