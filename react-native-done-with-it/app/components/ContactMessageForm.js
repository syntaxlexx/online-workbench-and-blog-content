import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import ActivityIndicator from "./ActivityIndicator";

import { ErrorMessage, AppForm, AppFormField, SubmitButton } from "./forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).max(255).label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().required().min(1).max(255).label("Subject"),
  message: Yup.string().required().min(1).max(1000).label("Message"),
});

function ContactMessageForm({ handleAdded }) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (message, { resetForm }) => {
    setError(null);
    setLoading(true);

    setTimeout(() => {
      handleAdded(message);
      setLoading(false);
      resetForm();
    }, 1000);
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <ActivityIndicator visible={loading} />
        <ErrorMessage error={error} visible={!!error} />

        <AppForm
          initialValues={{ name: "", email: "", subject: "", message: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="name"
            icon="account"
            placeholder="Name"
            autoCorrect={false}
          />

          <AppFormField
            name="email"
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            placeholder="Email"
            textContentType="emailAddress"
          />

          <AppFormField
            name="subject"
            icon="text"
            placeholder="Subject"
            autoCorrect={false}
          />

          <AppFormField
            name="message"
            icon="card-text-outline"
            placeholder="Message"
            autoCorrect={false}
            multiline
          />

          <SubmitButton title="Send Message" />
        </AppForm>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ContactMessageForm;
