import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Colors from '../@Constants/Colors';
import Dialog, {
    DialogContent,
    DialogTitle,
    DialogFooter,
    DialogButton,
} from 'react-native-popup-dialog';

const ConfirmDialog = ({ title, visible, message, onOk, onDismiss, onOkText, onDismissText }) => {
    return (
        <Dialog
            dialogTitle={
                <DialogTitle
                    align="center"
                    hasTitleBar={false}
                    style={styles.header}
                    textStyle={styles.headerText}
                    title={title ? title : 'Caution'}
                />
            }
            footer={
                <DialogFooter bordered={true} style={styles.dialogFooter}>
                    <DialogButton
                        onPress={() => {
                            if (onOk) onOk();
                        }}
                        style={styles.dialogButton}
                        text={onOkText ? onOkText : 'Ok'}
                        textStyle={styles.dialogButtonText}
                    />
                    <DialogButton
                        onPress={() => {
                            if (onDismiss) onDismiss();
                        }}
                        style={styles.dialogButton}
                        text={onDismissText ? onDismissText : 'Cancel'}
                        textStyle={styles.dialogButtonText}
                    />
                </DialogFooter>
            }
            onTouchOutside={() => {
                if (onDismiss) onDismiss();
            }}
            visible={visible}>
            <DialogContent style={styles.dialogContentWrapper}>
                <View style={styles.dialogContent}>
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
        marginBottom: 15,
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
    header: {
        backgroundColor: Colors.tintColor,
        padding: 15,
    },
    headerText: {
        color: Colors.title,
    },
    dialogFooter: {
        backgroundColor: Colors.tintColor,
        borderColor: Colors.tintColor,
    },
    dialogButtonText: {
        color: Colors.tintColorSecondary,
    },
    dialogButton: {
        borderColor: Colors.tintColor,
    },
};

export default ConfirmDialog;
