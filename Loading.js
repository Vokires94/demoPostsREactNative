import * as React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Loading() {
    return (
        <Text style={styles.text}>Loading...</Text>
    );
}

const styles = StyleSheet.create({
  text: {
      color: 'red',
      fontSize: 36,
    },
  });