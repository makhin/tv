import { Dimensions, Platform, StyleSheet } from 'react-native';

export const colors = {
  background: '#111827',
  backgroundMuted: '#1f2937',
  backgroundBrand: '#1e3a5f',
  backgroundOverlay: '#000000',
  textPrimary: '#ffffff',
  textSecondary: '#e5e7eb',
  textMuted: '#9ca3af',
  textSubtle: '#6b7280',
  accentPrimary: '#3b82f6',
  accentStrong: '#2563eb',
  accentMuted: '#4b5563',
  focusBorder: '#ffffff',
  focusShadow: '#ffffff',
  focusHighlight: '#3b82f6',
  borderMuted: '#374151',
  placeholderBackground: '#1f2937',
  placeholderText: '#6b7280',
  badgeTagBackground: '#065f46',
  badgePersonBackground: '#1e3a8a',
  badgeTagText: '#a7f3d0',
  badgePersonText: '#93c5fd',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
};

export const spacing = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 24,
  jumbo: 32,
};

export const typography = {
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    display: 24,
    hero: 28,
    mega: 36,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

const sharedStyleDefinitions = {
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginTop: spacing.xl,
    fontSize: Platform.isTV ? typography.fontSize.display : typography.fontSize.lg,
    color: colors.textMuted,
    textAlign: 'center' as const,
  },
  buttonBase: {
    backgroundColor: colors.accentPrimary,
    paddingVertical: Platform.isTV ? spacing.xxl : spacing.lg,
    paddingHorizontal: Platform.isTV ? spacing.jumbo : spacing.xxxl,
    borderRadius: spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minWidth: Platform.isTV ? 200 : 120,
  },
};

export const sharedStyles = StyleSheet.create(sharedStyleDefinitions);

const { width: detailWidth, height: detailHeight } = Dimensions.get('window');

export const homeScreenStyles = StyleSheet.create({
  container: {
    ...sharedStyleDefinitions.screenContainer,
    backgroundColor: colors.backgroundBrand,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Platform.isTV ? spacing.jumbo : spacing.xl,
    paddingVertical: Platform.isTV ? spacing.xxxl : spacing.xl,
    backgroundColor: colors.backgroundBrand,
    gap: Platform.isTV ? spacing.xxxl : spacing.xl,
  },
  title: {
    fontSize: Platform.isTV ? typography.fontSize.mega : typography.fontSize.display,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  headerContent: {
    flex: 1,
    gap: Platform.isTV ? spacing.lg : spacing.md,
  },
  photoCount: {
    fontSize: Platform.isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    color: colors.textMuted,
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
    fontSize: Platform.isTV ? typography.fontSize.mega : typography.fontSize.display,
    lineHeight: Platform.isTV ? 40 : 22,
  },
  listContainer: {
    paddingHorizontal: Platform.isTV ? spacing.jumbo : spacing.xl,
    paddingBottom: Platform.isTV ? spacing.xl : spacing.md,
  },
  emptyContainer: {
    ...sharedStyleDefinitions.centeredContent,
    padding: spacing.xxxl,
    gap: spacing.xxxl,
    minHeight: 400,
  },
  emptyText: {
    fontSize: Platform.isTV ? typography.fontSize.hero : typography.fontSize.xxl,
    color: colors.textMuted,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: Platform.isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    color: colors.textSubtle,
    textAlign: 'center',
  },
  errorText: {
    fontSize: Platform.isTV ? typography.fontSize.hero : typography.fontSize.xxl,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  errorDetail: {
    fontSize: Platform.isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xxxl,
  },
  loadingText: {
    marginTop: spacing.xl,
    fontSize: Platform.isTV ? typography.fontSize.display : typography.fontSize.lg,
    color: colors.textMuted,
  },
});

export const detailScreenStyles = StyleSheet.create({
  container: {
    ...sharedStyleDefinitions.centeredContent,
    backgroundColor: colors.backgroundOverlay,
  },
  loadingContainer: {
    ...sharedStyleDefinitions.centeredContent,
    backgroundColor: colors.backgroundOverlay,
  },
  loadingText: {
    ...sharedStyleDefinitions.statusText,
  },
  errorContainer: {
    ...sharedStyleDefinitions.centeredContent,
    backgroundColor: colors.backgroundOverlay,
    padding: spacing.xxxl,
  },
  errorText: {
    fontSize: Platform.isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    color: colors.danger,
    textAlign: 'center',
  },
  image: {
    width: detailWidth,
    height: detailHeight,
  },
  photoCounter: {
    position: 'absolute',
    bottom: Platform.isTV ? 40 : 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: Platform.isTV ? spacing.jumbo : spacing.xxxl,
    paddingVertical: Platform.isTV ? spacing.xxl : spacing.lg,
    borderRadius: spacing.xl,
  },
  photoCounterText: {
    color: colors.textPrimary,
    fontSize: Platform.isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    fontWeight: typography.weight.semibold,
  },
});

export const metadataScreenStyles = StyleSheet.create({
  container: {
    ...sharedStyleDefinitions.screenContainer,
    backgroundColor: colors.background,
    padding: Platform.isTV ? spacing.jumbo : spacing.xl,
  },
  loadingContainer: {
    ...sharedStyleDefinitions.centeredContent,
    backgroundColor: colors.background,
  },
  loadingText: {
    ...sharedStyleDefinitions.statusText,
    fontSize: Platform.isTV ? typography.fontSize.xxl : typography.fontSize.lg,
  },
  errorContainer: {
    ...sharedStyleDefinitions.centeredContent,
    backgroundColor: colors.background,
    padding: spacing.xxxl,
  },
  errorText: {
    fontSize: Platform.isTV ? typography.fontSize.hero : typography.fontSize.xxl,
    color: colors.danger,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Platform.isTV ? spacing.xxxl : spacing.xl,
    paddingBottom: Platform.isTV ? spacing.xl : spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderMuted,
  },
  headerText: {
    fontSize: Platform.isTV ? typography.fontSize.hero : typography.fontSize.display,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  hint: {
    fontSize: Platform.isTV ? typography.fontSize.lg : typography.fontSize.sm,
    color: colors.textSubtle,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: Platform.isTV ? spacing.xxxl : spacing.xl,
  },
  column: {
    flex: 1,
  },
  section: {
    marginBottom: Platform.isTV ? spacing.xxl : spacing.xl,
    backgroundColor: colors.backgroundMuted,
    padding: Platform.isTV ? spacing.xxl : spacing.lg,
    borderRadius: spacing.xl,
  },
  sectionTitle: {
    fontSize: Platform.isTV ? typography.fontSize.xxl : typography.fontSize.lg,
    fontWeight: typography.weight.bold,
    color: colors.accentPrimary,
    marginBottom: Platform.isTV ? spacing.xl : spacing.lg,
  },
  row: {
    flexDirection: 'row',
    marginBottom: Platform.isTV ? spacing.lg : spacing.md,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: Platform.isTV ? typography.fontSize.xl : typography.fontSize.sm,
    color: colors.textMuted,
    marginRight: spacing.md,
    minWidth: Platform.isTV ? 140 : 100,
  },
  value: {
    fontSize: Platform.isTV ? typography.fontSize.xl : typography.fontSize.sm,
    color: colors.textPrimary,
    flex: 1,
  },
  captionItem: {
    marginBottom: Platform.isTV ? spacing.xl : spacing.lg,
    paddingBottom: Platform.isTV ? spacing.lg : spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderMuted,
  },
  captionText: {
    fontSize: Platform.isTV ? typography.fontSize.lg : typography.fontSize.sm,
    color: colors.textPrimary,
  },
  moreText: {
    fontSize: Platform.isTV ? typography.fontSize.sm : typography.fontSize.xs,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginTop: Platform.isTV ? spacing.xl : spacing.md,
  },
  faceItem: {
    backgroundColor: colors.borderMuted,
    paddingHorizontal: Platform.isTV ? spacing.lg : spacing.md,
    paddingVertical: Platform.isTV ? spacing.md : spacing.sm,
    borderRadius: spacing.lg,
    marginBottom: Platform.isTV ? spacing.md : spacing.sm,
  },
  faceText: {
    fontSize: Platform.isTV ? typography.fontSize.md : typography.fontSize.xs,
    color: colors.textPrimary,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  scoreValue: {
    fontSize: Platform.isTV ? typography.fontSize.xl : typography.fontSize.sm,
    fontWeight: typography.weight.bold,
  },
  scoreLow: {
    color: colors.success,
  },
  scoreMedium: {
    color: colors.warning,
  },
  scoreHigh: {
    color: colors.danger,
  },
  scoreIcon: {
    fontSize: Platform.isTV ? typography.fontSize.xxl : typography.fontSize.lg,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Platform.isTV ? spacing.lg : spacing.md,
  },
  noFlags: {
    fontSize: Platform.isTV ? typography.fontSize.lg : typography.fontSize.sm,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});

export const settingsScreenStyles = StyleSheet.create({
  container: {
    ...sharedStyleDefinitions.screenContainer,
    backgroundColor: colors.background,
  },
  content: {
    padding: Platform.isTV ? 21 : 11,
  },
  section: {
    backgroundColor: colors.backgroundMuted,
    padding: Platform.isTV ? spacing.xxl : 11,
    borderRadius: spacing.xl,
    marginBottom: spacing.xxxl,
  },
  sectionTitle: {
    fontSize: Platform.isTV ? 19 : 13,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
    marginBottom: 11,
  },
  infoText: {
    fontSize: Platform.isTV ? 13 : 9,
    color: colors.textSecondary,
    lineHeight: Platform.isTV ? 21 : 15,
    marginBottom: 5,
  },
  buttonSpacing: {
    marginTop: spacing.md,
  },
  inputGroup: {
    marginBottom: 11,
  },
  label: {
    fontSize: Platform.isTV ? 15 : 11,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: spacing.lg - 4,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    paddingVertical: Platform.isTV ? spacing.xxl : spacing.lg,
    paddingHorizontal: Platform.isTV ? 13 : 9,
    color: colors.textPrimary,
    fontSize: Platform.isTV ? 15 : 11,
  },
});

export const focusableButtonStyles = StyleSheet.create({
  button: {
    ...sharedStyleDefinitions.buttonBase,
  },
  buttonFocused: {
    backgroundColor: colors.accentStrong,
    borderWidth: 3,
    borderColor: colors.focusBorder,
    shadowColor: colors.focusShadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonDisabled: {
    backgroundColor: colors.textSubtle,
    opacity: 0.5,
  },
  text: {
    color: colors.textPrimary,
    fontSize: Platform.isTV ? typography.fontSize.display : typography.fontSize.lg,
    fontWeight: typography.weight.semibold,
  },
  textFocused: {
    color: colors.textPrimary,
    fontWeight: typography.weight.bold,
  },
  textDisabled: {
    color: colors.textMuted,
  },
});

export const photoListItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.borderMuted,
    borderRadius: spacing.xl,
    padding: Platform.isTV ? spacing.xxl : spacing.lg,
    marginBottom: Platform.isTV ? spacing.xxl : spacing.lg,
    minHeight: Platform.isTV ? 90 : 80,
  },
  containerFocused: {
    backgroundColor: colors.accentMuted,
    borderWidth: 3,
    borderColor: colors.focusHighlight,
    shadowColor: colors.focusHighlight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    transform: [{ scale: 1.02 }],
  },
  thumbnailContainer: {
    marginRight: Platform.isTV ? spacing.xxxl : spacing.xl,
    position: 'relative',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: spacing.lg,
    backgroundColor: colors.placeholderBackground,
  },
  thumbnailPlaceholder: {
    backgroundColor: colors.placeholderBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.placeholderText,
    fontSize: Platform.isTV ? typography.fontSize.display : typography.fontSize.xxl,
    fontWeight: typography.weight.bold,
  },
  nsfwBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.danger,
    borderRadius: spacing.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
  },
  nsfwText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: typography.weight.bold,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: spacing.lg / 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.xl,
  },
  rowText: {
    fontSize: Platform.isTV ? typography.fontSize.xl : typography.fontSize.sm,
    color: colors.textMuted,
  },
  rowTextFocused: {
    color: colors.textSecondary,
  },
  nameText: {
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
  },
  separator: {
    fontSize: Platform.isTV ? typography.fontSize.xl : typography.fontSize.sm,
    color: colors.textSubtle,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});

export const loadMoreIndicatorStyles = StyleSheet.create({
  container: {
    paddingVertical: Platform.isTV ? spacing.jumbo : spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  text: {
    fontSize: Platform.isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    color: colors.textMuted,
    textAlign: 'center',
  },
  completeIcon: {
    fontSize: Platform.isTV ? typography.fontSize.hero : typography.fontSize.display,
    color: colors.success,
  },
});

export const tagBadgeStyles = StyleSheet.create({
  badge: {
    paddingHorizontal: Platform.isTV ? spacing.lg : spacing.md,
    paddingVertical: Platform.isTV ? spacing.md : spacing.sm,
    borderRadius: spacing.lg,
    marginRight: Platform.isTV ? spacing.md : spacing.sm,
    marginBottom: Platform.isTV ? spacing.md : spacing.sm,
  },
  badgeTag: {
    backgroundColor: colors.badgeTagBackground,
  },
  badgePerson: {
    backgroundColor: colors.badgePersonBackground,
  },
  text: {
    fontSize: Platform.isTV ? typography.fontSize.sm : typography.fontSize.xs,
    fontWeight: typography.weight.medium,
  },
  textTag: {
    color: colors.badgeTagText,
  },
  textPerson: {
    color: colors.badgePersonText,
  },
});

export const rootNavigatorStyles = StyleSheet.create({
  loadingContainer: {
    ...sharedStyleDefinitions.centeredContent,
    backgroundColor: colors.background,
  },
  loadingText: {
    ...sharedStyleDefinitions.statusText,
  },
  errorContainer: {
    ...sharedStyleDefinitions.centeredContent,
    backgroundColor: colors.background,
    padding: spacing.xxxl,
  },
  errorText: {
    fontSize: Platform.isTV ? typography.fontSize.hero : typography.fontSize.xxl,
    color: colors.danger,
    textAlign: 'center',
  },
});
