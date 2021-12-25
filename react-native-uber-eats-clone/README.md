# React Native Uber Eats Clone
An Uber Eats clone based on react native

## Link
[https://www.youtube.com/watch?v=jmvbhuJXFow](https://www.youtube.com/watch?v=jmvbhuJXFow)

## Project Setup
- Expo
- Firebase (v9)
- Yelp API Key

create an `.env` file with these costants
```bash
YELP_API_KEY=

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=

```

Run project
```bash
expo start
```

Build apk with Expo EAS
```bash
eas build -p android --profile local
```

Build for Google Play /Apple Store
```bash
# android
eas build -p android

#ios
eas build -p ios
```

## Yeah
We did it!