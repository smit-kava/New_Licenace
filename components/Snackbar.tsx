// CustomSnackbar.js
import React from 'react';
import { Snackbar } from 'react-native-paper';

interface CustomSnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  message?: string;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ visible, onDismiss, message = '' }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={3000}
      action={{
        label: 'Undo',
        onPress: () => {
            'retunt to the home page';
        },
      }}>
      {message}
    </Snackbar>
  );
};

export default CustomSnackbar;
