import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const STORAGE_CONSENT_KEY = '@consent_Key';

const AxeptioWidget = forwardRef((props, ref) => {
  const {clientId, cookiesVersion, onConsent} = props;

  const html = `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>body { padding: 0; margin: 0; }</style>
    </head>
    <body>
      <script>
      window.axeptioSettings = {
        clientId: "${clientId}",
        cookiesVersion: "${cookiesVersion}",
        // token: "YOUR_USER_IDENTIFIER",
      };

      (function(d, s) {
        var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
        e.async = true; e.src = "https://static.axept.io/sdk.js";
        t.parentNode.insertBefore(e, t);
      })(document, "script");

      void 0 === window._axcb && (window._axcb = []);
      window._axcb.push(function(axeptio) {
        axeptio.openCookies();

        axeptio.on("close", function(choices) {
          window.ReactNativeWebView.postMessage(JSON.stringify(choices))
        })
      });
      </script>
    </body>
  </html>
  `;

  const [show, setShow] = useState(false);

  const showWidget = () => {
    setShow(true);
  };

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_CONSENT_KEY)
      .then((value) => {
        if (value === null) {
          setShow(true);
        }
      })
      .catch(console.error);
  });

  useImperativeHandle(ref, () => {
    return {
      showWidget: showWidget,
    };
  });

  return (
    <>
      {show === false ? null : (
        <View style={styles.overlay}>
          <WebView
            originWhitelist={['*']}
            source={{baseUrl: 'https://www.axeptio.eu/fr/home', html: html}}
            sharedCookiesEnabled={true}
            javaScriptEnabled={true}
            onMessage={(event) => {
              event.persist && event.persist();
              AsyncStorage.setItem(STORAGE_CONSENT_KEY, event.nativeEvent.data)
                .then(() => {
                  onConsent(JSON.parse(event.nativeEvent.data));
                  setShow(false);
                })
                .catch(console.error);
            }}
            style={styles.webview}
          />
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: width,
    height: height,
    zIndex: 1,
  },
  webview: {
    backgroundColor: 'transparent',
    opacity: 0.99,
  },
});

export default AxeptioWidget;
