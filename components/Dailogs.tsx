import { StyleSheet } from 'react-native';
import React from 'react';
import WrapperContainer from './WrapperContainer';
import { Dialog } from 'react-native-paper';

interface Props {
  children: React.ReactNode;
  visible:any,
  title: string;
  onDismiss:any;
}

const Dailogs = ({ children, visible, title,onDismiss}: Props) => {
  return (
    <WrapperContainer>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          {children}
        </Dialog.Content>
      </Dialog>
    </WrapperContainer>
  );
};

export default Dailogs;

const styles = StyleSheet.create({});
