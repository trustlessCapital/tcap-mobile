import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Colors from '../constants/Colors';
import Dialog, {
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';

const ErrorDialog = ({ title, visible, message, onDismiss }) => {
  return (
    <Dialog
      visible={visible}
      onTouchOutside={() => {
        if (onDismiss) onDismiss();
      }}
      dialogTitle={
        <DialogTitle
          title={title ? title : 'Error'}
          style={styles.header}
          hasTitleBar={false}
          align="left"
        />
      }
      footer={
        <DialogFooter>
          <DialogButton
            text="Ok"
            onPress={() => {
              if (onDismiss) onDismiss();
            }}
          />
        </DialogFooter>
      }
    >
      <DialogContent>
        <View style={styles.dialogContent}>
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </DialogContent>
    </Dialog>
  );
};

const styles = {
  dialogContent: {
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 20,
    marginStart: 0,
    minWidth: 30,
    maxWidth: 250,
    textAlign: 'center',
  },
  message: {
    marginTop: 15,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'montserrat',
    color: Colors.title,
  },
  header: {
    backgroundColor: '#F7F7F8',
    padding: 15
  },
};

export default ErrorDialog;
