import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import logo from '../assets/logo_blanc.png';

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 142,
        marginBottom: 12,
    },
});

const Logo = () => <Image source={logo} style={styles.image} />;

export default memo(Logo);
