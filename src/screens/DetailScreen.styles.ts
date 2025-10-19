import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#9ca3af',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
  },
  image: {
    width: width,
    height: height,
  },
  photoCounter: {
    position: 'absolute',
    bottom: Platform.isTV ? 40 : 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: Platform.isTV ? 24 : 16,
    paddingVertical: Platform.isTV ? 12 : 8,
    borderRadius: 8,
  },
  photoCounterText: {
    color: '#ffffff',
    fontSize: Platform.isTV ? 20 : 14,
    fontWeight: '600',
  },
});
