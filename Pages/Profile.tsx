import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useThemeContext } from '../theme/ThemeContext';
import WrapperContainer from '../components/WrapperContainer';
import { Avatar } from 'react-native-paper';
const Profile = () => {
  const { toggleTheme, isDarkTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <WrapperContainer>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Avatar.Text label="SK" size={64} style={{ backgroundColor: theme.colors.primary }} />
<Text style={[styles.name, { color: theme.colors.onBackground }]}>Smit Kava</Text>
        <View style={styles.switchRow}>
          <Text style={[styles.label, { color: theme.colors.onBackground }]}>
            Dark Mode
          </Text>
          <Switch
            value={isDarkTheme}
            onValueChange={toggleTheme}
            trackColor={{ false: '#ccc', true: theme.colors.primary }}
            thumbColor={isDarkTheme ? theme.colors.primary : '#f4f3f4'}
          />
        </View>
      </View>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  name: {
     flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Profile;
