# Jaen

Jaen ist ein leistungsstarkes Content-Management-System (CMS) für moderne Webentwicklung mit Gatsby.

## Erste Schritte

Um mit Jaen zu beginnen, folgen Sie diesen Schritten:

1. Erstellen Sie ein neues Gatsby-Projekt:
   ```
   npx gatsby new my-jaen-project
   cd my-jaen-project
   ```

2. Installieren Sie Jaen und seine Abhängigkeiten:
   ```
   npm install jaen @jaenjs/jaen @jaenjs/gatsby-plugin-jaen
   ```

3. Fügen Sie das Jaen-Plugin zu Ihrer `gatsby-config.js` hinzu:
   ```javascript
   module.exports = {
     plugins: [
       '@jaenjs/gatsby-plugin-jaen',
       // ... andere Plugins
     ],
   }
   ```

4. Starten Sie Ihren Entwicklungsserver:
   ```
   gatsby develop
   ```

## Verwendung

Hier sind einige Beispiele für die Verwendung von Jaen v3:

1. Erstellen einer bearbeitbaren Textkomponente:

```jsx
import {TextField} from '@jaenjs/jaen'

const EditableHeadline = () => (
  <TextField
    name="headline"
    defaultValue="Willkommen bei Jaen!"
  >
    {(value) => <h1>{value}</h1>}
  </TextField>
)
```

2. Implementieren eines bearbeitbaren Bildes:

```jsx
import {ImageField} from '@jaenjs/jaen'

const EditableImage = () => (
  <ImageField
    name="heroImage"
    defaultValue={{src: '/default-image.jpg', alt: 'Standardbild'}}
  >
    {(image) => (
      <img src={image.src} alt={image.alt} />
    )}
  </ImageField>
)
```

3. Erstellen einer dynamischen Sektion:

```jsx
import {SectionField} from '@jaenjs/jaen'

const DynamicSection = () => (
  <SectionField
    name="contentSection"
    sections={[
      {name: 'TextBlock', component: TextBlock},
      {name: 'ImageGallery', component: ImageGallery}
    ]}
  />
)
```

## Authentifizierung mit ZITADEL

Jaen verwendet ZITADEL als Authentifizierungsanbieter. ZITADEL bietet eine robuste und sichere Lösung für die Benutzerverwaltung und -authentifizierung in Ihren Jaen-Projekten.

Wichtige Merkmale:
- Kostenlose Tier für Self-Hosting: ZITADEL bietet eine kostenlose Option für Self-Hosting, was Ihnen volle Kontrolle über Ihre Authentifizierungsinfrastruktur gibt.
- Einfache Integration: Die Konfiguration von ZITADEL in Ihrem Jaen-Projekt ist unkompliziert und wird in der `gatsby-config.ts` Datei vorgenommen.

Für detaillierte Informationen zur Konfiguration von ZITADEL in Ihrem Jaen-Projekt, werfen Sie einen Blick in die `gatsby-config.ts` Datei im Beispielprojekt.

## Beitragen

Wir freuen uns über Beiträge zur Verbesserung von Jaen! Wenn Sie mithelfen möchten, folgen Sie bitte diesen Schritten:

1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushen Sie den Branch (`git push origin feature/AmazingFeature`)
5. Öffnen Sie einen Pull Request

## Lizenz

Dieses Projekt ist unter der EUPL-1.2 Lizenz lizenziert. Weitere Details finden Sie in der LICENSE-Datei.

Copyright © 2023 jaen.io
