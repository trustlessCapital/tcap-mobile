import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import Colors from '../@Constants/Colors';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

const LoadingIndicator = ({ visible, message }) => {
    return (
        <Dialog visible={visible}>
            <DialogContent style={styles.dialogContentWrapper}>
                <View style={styles.dialogContent}>
                    <ActivityIndicator color={Colors.title} size="small" />
                    {message && <Text style={styles.message}>{message}</Text>}
                </View>
            </DialogContent>
        </Dialog>
    );
};

const styles = {
    dialogContentWrapper: {
        backgroundColor: Colors.primaryBg,
    },
    dialogContent: {
        justifyContent: 'center',
        marginBottom: 'auto',
        marginTop: 20,
        marginStart: 0,
        minWidth: 30,
        maxWidth: 250,
        textAlign: 'center',
        backgroundColor: Colors.primaryBg,
    },
    message: {
        marginTop: 15,
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'montserrat',
        color: Colors.title,
    },
};

export default LoadingIndicator;
