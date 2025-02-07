/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CachedImage} from './CachedImage';

const images = [
  'https://github.com/morintd/react-native-cached-image/blob/main/images/react-native-1.jpg?raw=true',
  'https://github.com/morintd/react-native-cached-image/blob/main/images/react-native-2.png?raw=true',
  'https://github.com/morintd/react-native-cached-image/blob/main/images/free-photo-of-black-and-white-solitary-walk-along-the-city-seaside.jpeg?raw=true',
  'https://github.com/morintd/react-native-cached-image/blob/main/images/free-photo-of-solitary-figure-walking-in-vast-desert-landscape.jpeg?raw=true',
];

function App(): React.JSX.Element {
  const [uncached, setUncached] = useState(0);
  const [cached, setCached] = useState(0);

  const onRefreshUncached = useCallback(() => {
    if (uncached >= images.length - 1) {
      setUncached(0);
    } else {
      setUncached(uncached + 1);
    }
  }, [uncached]);

  const onRefreshCached = useCallback(() => {
    if (cached >= images.length - 1) {
      setCached(0);
    } else {
      setCached(cached + 1);
    }
  }, [cached]);

  return (
    <>
      <SafeAreaView style={[styles.section, {backgroundColor: Colors.lighter}]}>
        <View style={styles.section}>
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.section}
              onPress={onRefreshUncached}>
              <Image
                style={styles.section}
                source={{
                  uri: images[uncached],
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onRefreshCached} style={styles.section}>
            <CachedImage style={[styles.section]} uri={images[cached]} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
  },
});

export default App;
