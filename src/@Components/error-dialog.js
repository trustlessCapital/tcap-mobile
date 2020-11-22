/**
 * Modified By @name Sukumar_Abhijeet,
 */

import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../@Constants/Colors';
import Dialog, {
    DialogContent,
    DialogTitle,
    DialogFooter,
    DialogButton,
} from 'react-native-popup-dialog';

const ErrorDialog = ({ title, visible, message, onDismiss }) => {

    const renderMessage = () =>{
        if(message)
            return <Text style={styles.message}>{message}</Text>;
        return null;
    };

    return (
        <Dialog
            dialogTitle={
                <DialogTitle
                    align="left"
                    hasTitleBar={false}
                    style={styles.header}
                    textStyle={styles.headerText}
                    title={title ? title : 'Error'}
                />
            }
            footer={
                <DialogFooter bordered={true} style={styles.dialogFooter}>
                    <DialogButton
                        bordered={false}
                        onPress={() => {
                            if (onDismiss) onDismiss();
                        }}
                        text="Ok"
                        textStyle={styles.dialogButtonText}
                    />
                </DialogFooter>
            }
            onTouchOutside={() => {
                if (onDismiss) onDismiss();
            }}
            style={styles.dialog}
            visible={visible}>
            <DialogContent style={styles.dialogContentWrapper}>
                <View style={styles.dialogContent}>
                    {renderMessage()}
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
};

export default ErrorDialog;
