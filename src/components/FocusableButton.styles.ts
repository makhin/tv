import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: Platform.isTV ? 16 : 12,
    paddingHorizontal: Platform.isTV ? 32 : 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: Platform.isTV ? 200 : 120,
  },
  buttonFocused: {
    backgroundColor: '#2563eb',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonDisabled: {
    backgroundColor: '#6b7280',
    opacity: 0.5,
  },
  text: {
    color: '#ffffff',
    fontSize: Platform.isTV ? 24 : 16,
    fontWeight: '600',
  },
  textFocused: {
    color: '#ffffff',
    fontWeight: '700',
  },
  textDisabled: {
    color: '#d1d5db',
  },
});
