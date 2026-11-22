import { IonContent, IonHeader, IonPage } from '@ionic/react';

import AppNavbar from './AppNavbar';

interface Props {
  title: string;
  children: React.ReactNode;
}

/** Estructura común: cabecera con la barra de navegación + contenido. */
const Layout: React.FC<Props> = ({ title, children }) => (
  <IonPage>
    <IonHeader>
      <AppNavbar />
    </IonHeader>
    <IonContent>
      <div className="container py-4">
        <h1 className="h3 mb-4">{title}</h1>
        {children}
      </div>
    </IonContent>
  </IonPage>
);

export default Layout;
