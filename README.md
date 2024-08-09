# Jaen v3

Jaen is a powerful Content Management System (CMS) for modern web development with Gatsby, now in Version 3 with improved performance and user-friendliness.

## Getting Started

To begin with Jaen v3, follow these steps:

1. Create a new Gatsby project:
   ```
   npx gatsby new my-jaen-project
   cd my-jaen-project
   ```

2. Install Jaen v3:
   ```
   jaen
   ```

3. Add the Jaen plugin to your `gatsby-config.ts`:
   ```typescript
   import type {GatsbyConfig} from 'gatsby'

   const config: GatsbyConfig = {
     plugins: [
       {
         resolve: `gatsby-plugin-jaen`,
         options: {
           // Jaen configuration here
         }
       },
       // ... other plugins
     ],
   }

   export default config
   ```

4. Configure ZITADEL for authentication in your `gatsby-config.ts`:
   ```typescript
   options: {
     zitadel: {
       organizationId: 'YOUR_ORGANIZATION_ID',
       clientId: 'YOUR_CLIENT_ID',
       authority: 'https://accounts.zitadel.ch',
       redirectUri: 'http://localhost:8000'
     }
   }
   ```

5. Start your development server:
   ```
   gatsby develop
   ```

## Usage

Here are some examples of using Jaen v3:

1. Creating an editable text component:

```jsx
import {TextField} from '@jaenjs/jaen'

const EditableHeadline = () => (
  <TextField
    name="headline"
    defaultValue="Welcome to Jaen v3!"
  >
    {(value) => <h1>{value}</h1>}
  </TextField>
)
```

2. Implementing an editable image with optimized performance:

```jsx
import {ImageField} from '@jaenjs/jaen'

const EditableImage = () => (
  <ImageField
    name="heroImage"
    defaultValue={{src: '/default-image.jpg', alt: 'Default Image'}}
    withWebp
    imgixParams={{auto: 'compress,format'}}
  >
    {(image) => (
      <img src={image.src} alt={image.alt} />
    )}
  </ImageField>
)
```

3. Creating a dynamic section with enhanced options:

```jsx
import {SectionField} from '@jaenjs/jaen'

const DynamicSection = () => (
  <SectionField
    name="contentSection"
    sections={[
      {name: 'TextBlock', component: TextBlock},
      {name: 'ImageGallery', component: ImageGallery},
      {name: 'VideoEmbed', component: VideoEmbed}
    ]}
    max={5}
  />
)
```

## Authentication with ZITADEL

Jaen v3 uses ZITADEL as its authentication provider. ZITADEL offers a robust and secure solution for user management and authentication in your Jaen projects.

Key features:
- Free tier for self-hosting: ZITADEL provides a free option for self-hosting, giving you full control over your authentication infrastructure.
- Easy integration: Configuring ZITADEL in your Jaen project is straightforward and done in the `gatsby-config.ts` file.
- Advanced security features: ZITADEL offers multi-factor authentication, Single Sign-On (SSO), and detailed permission management.
- GDPR compliant: ZITADEL meets the requirements of the General Data Protection Regulation.

For detailed information on configuring ZITADEL in your Jaen project, take a look at the `gatsby-config.ts` file in the example project or visit the [ZITADEL documentation](https://zitadel.com/docs/).

## Contributing

We welcome contributions to improve Jaen! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the EUPL-1.2 License. See the LICENSE file for more details.

Copyright © 2023 jaen.io. All rights reserved.
