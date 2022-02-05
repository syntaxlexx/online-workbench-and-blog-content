# Done With It - React Native Course App

A RN app

## Deployments

### Optimizing assets

Install the npm package `sharp-cli` globally

```bash
npm i -g sharp-cli
```

Procees to optimize assets

```bash
npx expo-optimize
```

### Optimizing JavaScript

How you import a package matters

## Error Reporting Tools

- Bugsnag - better, but pricier
- Sentry

#### Bugsnag

Installation:

- using npx (recommended)

```bash
npx bugsnag-expo-cli init
```

-using npm (if npx isn't available)

```bash
npm install --global bugsnag-expo-cli
bugsnag-expo-cli init
```

## Publishing

### Expo

Specify the release channel

- Releasing for staging

```bash
expo publish --release-channel staging
```

To hide from the public world, you can set the `"privacy": "unlisted"` in app.json and it will be hidden from the internet.
