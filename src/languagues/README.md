# Languages

This folder contains all the files needed to handle multiple languages in this app.

To handle multiple languages in this app we use JSON Files to map a key with a corresponding word in some language.

For example

> en.json

```json
{
"sending_title": "Sending"
}
```

> es.json

```json
{
"sending_title": "Enviando"
}
```

---

## Where is Implemented?

📄 en.json
> Contains all the words used in the English version of the app

📄 es.json
> Contains all the words used in the Spanish version of the app

📄 index.tsx
> Contains some functions and variables needed to handle correctly the management of the languages in the app

📄 interface.tsx
> Contains the interface (all the keys needed) of the Language JSON file.

---

## How Can I add some new Language to this app?

1. Create the Language JSON file of that language.
2. In the index.tsx file you have to:
    
    ```tsx
    // Import the Language JSON file that you create
    import FR from './fr.json';
    import ES from './es.json';
    import EN from './en.json';
    import { ILanguage, Language } from "../context/interface";
    
    // Example adding the French Language ('fr')
    export const languages = ['es', 'en', 'fr'];
    
    // Adding the 'fr' case to the switch case
    export const stringToLanguague = (key:string):Language|null => {
        switch (key) {
            case "es":
                return "es";
            case "en":
                return "en";
            case "fr":
                return "fr";
            default:
                return null;
        }
    };
    
    const es: ILanguage = {
        json: ES,
        flag: '🇪🇸',
        symbol: 'es'
    };
    
    const en: ILanguage = {
        json: EN,
        flag: '🇬🇧',
        symbol: 'en'
    }
    
    // Create the corresponding obj of the Language
    const fr: ILanguage = {
        json: FR,
        flag: '🇫🇷',
        symbol: 'fr'
    }
    
    // Include that language to this array of Languages
    export const Languages: ILanguage[] = [
        es,
        en,
        fr
    ]
    ```
    
3. Done! You already have to add a new language to this app.