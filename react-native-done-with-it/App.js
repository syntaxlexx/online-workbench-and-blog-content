import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import AppLoading from "expo-app-loading";
import { navigationRef } from "./app/navigation/rootNavigation";

// logging
import logger from "./app/utility/logger";
logger.start();

import Bugsnag from "@bugsnag/expo";
const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

const ErrorView = () => (
  <div>
    <p>Inform users of an error in the component tree.</p>
  </div>
);

const onError = (event) => {
  // callback will only run for errors caught by boundary
  console.log("error captured", event);
};

const App = () => {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default () => (
  <ErrorBoundary FallbackComponent={ErrorView} onError={onError}>
    <App />
  </ErrorBoundary>
);
