// FormProvider.tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormProvider as RHFFormProvider, UseFormReturn } from 'react-hook-form';
import { useTheme } from 'react-native-paper';

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
};
const theme = useTheme();
export default function FormProvider({ children, methods }: Props) {
  return (
    <RHFFormProvider {...methods}>
      <View style={styles.container}>{children}</View>
    </RHFFormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
