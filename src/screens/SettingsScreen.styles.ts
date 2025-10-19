import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    padding: Platform.isTV ? 21 : 11,
  },
  section: {
    backgroundColor: '#1f2937',
    padding: Platform.isTV ? 16 : 11,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: Platform.isTV ? 19 : 13,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 11,
  },
  infoText: {
    fontSize: Platform.isTV ? 13 : 9,
    color: '#e5e7eb',
    lineHeight: Platform.isTV ? 21 : 15,
    marginBottom: 5,
  },
  buttonSpacing: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 11,
  },
  label: {
    fontSize: Platform.isTV ? 15 : 11,
    color: '#e5e7eb',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#111827',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#374151',
    paddingVertical: Platform.isTV ? 11 : 8,
    paddingHorizontal: Platform.isTV ? 13 : 9,
    color: '#ffffff',
    fontSize: Platform.isTV ? 15 : 11,
  },
});
