import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a5f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Platform.isTV ? 32 : 16,
    paddingVertical: Platform.isTV ? 24 : 16,
    backgroundColor: '#1e3a5f',
    gap: Platform.isTV ? 24 : 16,
  },
  title: {
    fontSize: Platform.isTV ? 36 : 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerContent: {
    flex: 1,
    gap: Platform.isTV ? 12 : 8,
  },
  photoCount: {
    fontSize: Platform.isTV ? 18 : 14,
    color: '#d1d5db',
  },
  settingsButton: {
    width: Platform.isTV ? 72 : 44,
    height: Platform.isTV ? 72 : 44,
    minWidth: Platform.isTV ? 72 : 44,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: Platform.isTV ? 18 : 12,
  },
  settingsButtonText: {
    fontSize: Platform.isTV ? 36 : 20,
    lineHeight: Platform.isTV ? 40 : 22,
  },
  listContainer: {
    paddingHorizontal: Platform.isTV ? 32 : 16,
    paddingBottom: Platform.isTV ? 16 : 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
    minHeight: 400,
  },
  emptyText: {
    fontSize: Platform.isTV ? 28 : 18,
    color: '#9ca3af',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: Platform.isTV ? 20 : 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  errorText: {
    fontSize: Platform.isTV ? 28 : 18,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorDetail: {
    fontSize: Platform.isTV ? 18 : 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: Platform.isTV ? 24 : 16,
    color: '#9ca3af',
  },
});
