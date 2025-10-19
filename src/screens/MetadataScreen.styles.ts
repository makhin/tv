import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: Platform.isTV ? 32 : 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: Platform.isTV ? 20 : 16,
    color: '#9ca3af',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: Platform.isTV ? 24 : 18,
    color: '#ef4444',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Platform.isTV ? 24 : 16,
    paddingBottom: Platform.isTV ? 16 : 12,
    borderBottomWidth: 2,
    borderBottomColor: '#374151',
  },
  headerText: {
    fontSize: Platform.isTV ? 28 : 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  hint: {
    fontSize: Platform.isTV ? 16 : 12,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: Platform.isTV ? 24 : 16,
  },
  column: {
    flex: 1,
  },
  section: {
    marginBottom: Platform.isTV ? 20 : 16,
    backgroundColor: '#1f2937',
    padding: Platform.isTV ? 16 : 12,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: Platform.isTV ? 20 : 16,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: Platform.isTV ? 12 : 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: Platform.isTV ? 8 : 6,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: Platform.isTV ? 15 : 12,
    color: '#9ca3af',
    marginRight: 8,
    minWidth: Platform.isTV ? 140 : 100,
  },
  value: {
    fontSize: Platform.isTV ? 15 : 12,
    color: '#ffffff',
    flex: 1,
  },
  captionItem: {
    marginBottom: Platform.isTV ? 10 : 8,
    paddingBottom: Platform.isTV ? 8 : 6,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  captionText: {
    fontSize: Platform.isTV ? 14 : 12,
    color: '#ffffff',
  },
  moreText: {
    fontSize: Platform.isTV ? 12 : 10,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: Platform.isTV ? 8 : 4,
  },
  faceItem: {
    backgroundColor: '#374151',
    paddingHorizontal: Platform.isTV ? 10 : 8,
    paddingVertical: Platform.isTV ? 6 : 4,
    borderRadius: 6,
    marginBottom: Platform.isTV ? 6 : 4,
  },
  faceText: {
    fontSize: Platform.isTV ? 13 : 11,
    color: '#ffffff',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreValue: {
    fontSize: Platform.isTV ? 15 : 12,
    fontWeight: 'bold',
  },
  scoreLow: {
    color: '#10b981',
  },
  scoreMedium: {
    color: '#f59e0b',
  },
  scoreHigh: {
    color: '#ef4444',
  },
  scoreIcon: {
    fontSize: Platform.isTV ? 18 : 14,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Platform.isTV ? 6 : 4,
  },
  noFlags: {
    fontSize: Platform.isTV ? 14 : 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});
