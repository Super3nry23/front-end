import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Page from './pages/Page';
import Strategy from './pages/Strategy';
import NewsletterPage from './pages/Newsletter';
import NewsletterConfirmation from './pages/SubscribeConfirmPage';

import ApolloAppProvider from './components/ApolloProvider';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { Route } from 'react-router-dom';

setupIonicReact();

const App: React.FC = () => {
  return (
    <ApolloAppProvider >
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <IonRouterOutlet id="main">
              <Route path="/strategy" component={Strategy} exact />
              <Route path="/newsletter" component={NewsletterPage} />
              <Route path="/NewsletterConfirmation" component={NewsletterConfirmation} />
              <Route path="/" component={Page} exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </ApolloAppProvider >
  );
};

export default App;
