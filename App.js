import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, Button} from 'react-native';
import AxeptioWidget from './AxeptioWidget';

function onConsent(consent) {
  if (consent?.google_analytics) {
    console.log('google analytics collection can be enabled.');
  } else {
    console.log('google analytics collection must be disabled.');
  }
}

const App = () => {
  const ref = useRef(null);

  const showWidget = () => {
    ref.current.showWidget();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Button onPress={showWidget} title="Show preferences" />
      </SafeAreaView>
      <AxeptioWidget
        clientId="5ffc24255558222597d6afa9"
        cookiesVersion="ga_only_mobile"
        onConsent={onConsent}
        ref={ref}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default App;
