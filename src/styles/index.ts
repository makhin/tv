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

const isTV = Platform.isTV;

const baseFlexFill = {
  flex: 1,
};

const baseCentered = {
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
};

export const layoutStyles = StyleSheet.create({
  screen: {
    ...baseFlexFill,
    backgroundColor: colors.background,
  },
  screenBrand: {
    ...baseFlexFill,
    backgroundColor: colors.backgroundBrand,
  },
  screenOverlay: {
    ...baseFlexFill,
    backgroundColor: colors.backgroundOverlay,
  },
  centeredScreen: {
    ...baseFlexFill,
    ...baseCentered,
    backgroundColor: colors.background,
  },
  centeredOverlay: {
    ...baseFlexFill,
    ...baseCentered,
    backgroundColor: colors.backgroundOverlay,
  },
  centered: {
    ...baseFlexFill,
    ...baseCentered,
  },
  row: {
    flexDirection: 'row' as const,
  },
  rowAlignCenter: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  rowBetween: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  column: {
    flexDirection: 'column' as const,
  },
  columnFlex: {
    ...baseFlexFill,
    flexDirection: 'column' as const,
  },
  wrap: {
    flexWrap: 'wrap' as const,
  },
  flex1: {
    ...baseFlexFill,
  },
});

export const gapStyles = StyleSheet.create({
  sm: {
    gap: isTV ? spacing.md : spacing.sm,
  },
  md: {
    gap: isTV ? spacing.lg : spacing.md,
  },
  lg: {
    gap: isTV ? spacing.xxxl : spacing.xl,
  },
});

export const insetStyles = StyleSheet.create({
  screenPadding: {
    padding: isTV ? spacing.jumbo : spacing.xl,
  },
  screenHorizontal: {
    paddingHorizontal: isTV ? spacing.jumbo : spacing.xl,
  },
  headerVertical: {
    paddingVertical: isTV ? spacing.xxxl : spacing.xl,
  },
  headerHorizontal: {
    paddingHorizontal: isTV ? spacing.jumbo : spacing.xl,
  },
  listContent: {
    paddingHorizontal: isTV ? spacing.jumbo : spacing.xl,
    paddingBottom: isTV ? spacing.xl : spacing.md,
  },
  sectionPadding: {
    padding: isTV ? spacing.xxl : spacing.lg,
  },
  cardPadding: {
    padding: isTV ? spacing.xxl : spacing.lg,
  },
  inputPadding: {
    paddingVertical: isTV ? spacing.xxl : spacing.lg,
    paddingHorizontal: isTV ? 13 : 9,
  },
  paddingSm: {
    paddingHorizontal: isTV ? spacing.lg : spacing.md,
    paddingVertical: isTV ? spacing.md : spacing.sm,
  },
  marginBottomLg: {
    marginBottom: isTV ? spacing.xxxl : spacing.xl,
  },
  marginBottomMd: {
    marginBottom: isTV ? spacing.xxl : spacing.lg,
  },
  marginBottomSm: {
    marginBottom: isTV ? spacing.lg : spacing.md,
  },
  marginTopSm: {
    marginTop: spacing.md,
  },
});

export const surfaceStyles = StyleSheet.create({
  default: {
    backgroundColor: colors.background,
  },
  brand: {
    backgroundColor: colors.backgroundBrand,
  },
  muted: {
    backgroundColor: colors.backgroundMuted,
  },
  neutral: {
    backgroundColor: colors.borderMuted,
  },
  overlay: {
    backgroundColor: colors.backgroundOverlay,
  },
  card: {
    backgroundColor: colors.backgroundMuted,
    borderRadius: spacing.xl,
  },
  pill: {
    borderRadius: spacing.lg,
  },
  rounded: {
    borderRadius: spacing.xl,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderMuted,
  },
  borderBottomStrong: {
    borderBottomWidth: 2,
    borderBottomColor: colors.borderMuted,
  },
});

export const textStyles = StyleSheet.create({
  headingHero: {
    fontSize: isTV ? typography.fontSize.mega : typography.fontSize.display,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  headingDisplay: {
    fontSize: isTV ? typography.fontSize.display : typography.fontSize.xxl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  headingSection: {
    fontSize: isTV ? typography.fontSize.xxl : typography.fontSize.lg,
    fontWeight: typography.weight.bold,
    color: colors.accentPrimary,
  },
  headingPrimary: {
    fontSize: isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  headingMuted: {
    fontSize: isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    color: colors.textMuted,
  },
  bodyPrimary: {
    fontSize: isTV ? typography.fontSize.xl : typography.fontSize.md,
    color: colors.textPrimary,
  },
  bodySecondary: {
    fontSize: isTV ? typography.fontSize.xl : typography.fontSize.sm,
    color: colors.textSecondary,
  },
  bodyMuted: {
    fontSize: isTV ? typography.fontSize.xl : typography.fontSize.sm,
    color: colors.textMuted,
  },
  bodySubtle: {
    fontSize: isTV ? typography.fontSize.lg : typography.fontSize.sm,
    color: colors.textSubtle,
  },
  caption: {
    fontSize: isTV ? typography.fontSize.lg : typography.fontSize.sm,
    color: colors.textPrimary,
  },
  captionMuted: {
    fontSize: isTV ? typography.fontSize.sm : typography.fontSize.xs,
    color: colors.textMuted,
  },
  badge: {
    fontSize: isTV ? typography.fontSize.sm : typography.fontSize.xs,
    fontWeight: typography.weight.medium,
  },
  badgeTag: {
    color: colors.badgeTagText,
  },
  badgePerson: {
    color: colors.badgePersonText,
  },
  status: {
    marginTop: spacing.xl,
    fontSize: isTV ? typography.fontSize.display : typography.fontSize.lg,
    color: colors.textMuted,
    textAlign: 'center' as const,
  },
  statusSmall: {
    fontSize: isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    color: colors.textMuted,
    textAlign: 'center' as const,
  },
  error: {
    fontSize: isTV ? typography.fontSize.hero : typography.fontSize.xxl,
    color: colors.danger,
    textAlign: 'center' as const,
  },
  errorDetail: {
    fontSize: isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    color: colors.textMuted,
    textAlign: 'center' as const,
    marginBottom: spacing.xxxl,
  },
  italic: {
    fontStyle: 'italic',
  },
  strong: {
    fontWeight: typography.weight.bold,
  },
  center: {
    textAlign: 'center' as const,
  },
});

export const buttonStyles = StyleSheet.create({
  base: {
    backgroundColor: colors.accentPrimary,
    paddingVertical: isTV ? spacing.xxl : spacing.lg,
    paddingHorizontal: isTV ? spacing.jumbo : spacing.xxxl,
    borderRadius: spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minWidth: isTV ? 200 : 120,
  },
  focused: {
    backgroundColor: colors.accentStrong,
    borderWidth: 3,
    borderColor: colors.focusBorder,
    shadowColor: colors.focusShadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  disabled: {
    backgroundColor: colors.textSubtle,
    opacity: 0.5,
  },
  text: {
    color: colors.textPrimary,
    fontSize: isTV ? typography.fontSize.display : typography.fontSize.lg,
    fontWeight: typography.weight.semibold,
  },
  textFocused: {
    color: colors.textPrimary,
    fontWeight: typography.weight.bold,
  },
  textDisabled: {
    color: colors.textMuted,
  },
  iconSquare: {
    width: isTV ? 72 : 44,
    height: isTV ? 72 : 44,
    minWidth: isTV ? 72 : 44,
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: isTV ? 18 : 12,
  },
  iconText: {
    fontSize: isTV ? typography.fontSize.mega : typography.fontSize.display,
    lineHeight: isTV ? 40 : 22,
  },
});

export const listStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    backgroundColor: colors.borderMuted,
    borderRadius: spacing.xl,
    padding: isTV ? spacing.xxl : spacing.lg,
    marginBottom: isTV ? spacing.xxl : spacing.lg,
    minHeight: isTV ? 90 : 80,
  },
  itemFocused: {
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
    marginRight: isTV ? spacing.xxxl : spacing.xl,
    position: 'relative' as const,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: spacing.lg,
    backgroundColor: colors.placeholderBackground,
  },
  thumbnailPlaceholder: {
    backgroundColor: colors.placeholderBackground,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  placeholderText: {
    color: colors.placeholderText,
    fontSize: isTV ? typography.fontSize.display : typography.fontSize.xxl,
    fontWeight: typography.weight.bold,
  },
  nsfwBadge: {
    position: 'absolute' as const,
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
    justifyContent: 'flex-start' as const,
  },
  contentGap: {
    gap: spacing.lg / 3,
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flexWrap: 'wrap' as const,
    gap: spacing.xl,
  },
  rowText: {
    fontSize: isTV ? typography.fontSize.xl : typography.fontSize.sm,
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
    fontSize: isTV ? typography.fontSize.xl : typography.fontSize.sm,
    color: colors.textSubtle,
  },
  badgesContainer: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    alignItems: 'center' as const,
  },
});

export const badgeStyles = StyleSheet.create({
  base: {
    paddingHorizontal: isTV ? spacing.lg : spacing.md,
    paddingVertical: isTV ? spacing.md : spacing.sm,
    borderRadius: spacing.lg,
    marginRight: isTV ? spacing.md : spacing.sm,
    marginBottom: isTV ? spacing.md : spacing.sm,
  },
  tag: {
    backgroundColor: colors.badgeTagBackground,
  },
  person: {
    backgroundColor: colors.badgePersonBackground,
  },
});

export const feedbackStyles = StyleSheet.create({
  block: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: isTV ? spacing.xxxl : spacing.xl,
    paddingVertical: isTV ? spacing.jumbo : spacing.xxxl,
  },
  emptyState: {
    minHeight: 400,
  },
  loaderText: {
    fontSize: isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    color: colors.textMuted,
    textAlign: 'center' as const,
  },
  completeIcon: {
    fontSize: isTV ? typography.fontSize.hero : typography.fontSize.display,
    color: colors.success,
  },
});

export const sectionStyles = StyleSheet.create({
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingBottom: isTV ? spacing.xl : spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: colors.borderMuted,
  },
  container: {
    backgroundColor: colors.backgroundMuted,
    borderRadius: spacing.xl,
    padding: isTV ? spacing.xxl : spacing.lg,
    marginBottom: isTV ? spacing.xxxl : spacing.xl,
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    marginBottom: isTV ? spacing.lg : spacing.md,
  },
});

export const infoStyles = StyleSheet.create({
  label: {
    fontSize: isTV ? typography.fontSize.xl : typography.fontSize.sm,
    color: colors.textMuted,
    marginRight: spacing.md,
    minWidth: isTV ? 140 : 100,
  },
  value: {
    fontSize: isTV ? typography.fontSize.xl : typography.fontSize.sm,
    color: colors.textPrimary,
    flex: 1,
  },
  captionItem: {
    marginBottom: isTV ? spacing.xl : spacing.lg,
    paddingBottom: isTV ? spacing.lg : spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderMuted,
  },
  captionText: {
    fontSize: isTV ? typography.fontSize.lg : typography.fontSize.sm,
    color: colors.textPrimary,
  },
  moreText: {
    fontSize: isTV ? typography.fontSize.sm : typography.fontSize.xs,
    color: colors.textMuted,
    fontStyle: 'italic',
    marginTop: isTV ? spacing.xl : spacing.md,
  },
  faceItem: {
    backgroundColor: colors.borderMuted,
    paddingHorizontal: isTV ? spacing.lg : spacing.md,
    paddingVertical: isTV ? spacing.md : spacing.sm,
    borderRadius: spacing.lg,
    marginBottom: isTV ? spacing.md : spacing.sm,
  },
  faceText: {
    fontSize: isTV ? typography.fontSize.md : typography.fontSize.xs,
    color: colors.textPrimary,
  },
  badgesContainer: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: isTV ? spacing.lg : spacing.md,
  },
  noFlags: {
    fontSize: isTV ? typography.fontSize.lg : typography.fontSize.sm,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});

export const formStyles = StyleSheet.create({
  infoText: {
    fontSize: isTV ? typography.fontSize.lg : typography.fontSize.sm,
    color: colors.textSubtle,
    lineHeight: isTV ? 21 : 15,
    marginBottom: spacing.sm,
  },
  group: {
    marginBottom: isTV ? spacing.xxl : spacing.xl,
  },
  label: {
    fontSize: isTV ? typography.fontSize.xl : typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: spacing.lg - 4,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    paddingVertical: isTV ? spacing.xxl : spacing.lg,
    paddingHorizontal: isTV ? 13 : 9,
    color: colors.textPrimary,
    fontSize: isTV ? typography.fontSize.xl : typography.fontSize.sm,
  },
});

export const scoreStyles = StyleSheet.create({
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: spacing.md,
  },
  value: {
    fontSize: isTV ? typography.fontSize.xl : typography.fontSize.sm,
    fontWeight: typography.weight.bold,
  },
  low: {
    color: colors.success,
  },
  medium: {
    color: colors.warning,
  },
  high: {
    color: colors.danger,
  },
  icon: {
    fontSize: isTV ? typography.fontSize.xxl : typography.fontSize.lg,
  },
});

const { width: detailWidth, height: detailHeight } = Dimensions.get('window');

export const mediaStyles = StyleSheet.create({
  fullscreenImage: {
    width: detailWidth,
    height: detailHeight,
  },
  counter: {
    position: 'absolute' as const,
    bottom: isTV ? 40 : 20,
    alignSelf: 'center' as const,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: isTV ? spacing.jumbo : spacing.xxxl,
    paddingVertical: isTV ? spacing.xxl : spacing.lg,
    borderRadius: spacing.xl,
  },
  counterText: {
    color: colors.textPrimary,
    fontSize: isTV ? typography.fontSize.xxl : typography.fontSize.xl,
    fontWeight: typography.weight.semibold,
  },
});

export const appStyles = {
  layout: layoutStyles,
  gaps: gapStyles,
  insets: insetStyles,
  surfaces: surfaceStyles,
  text: textStyles,
  buttons: buttonStyles,
  list: listStyles,
  badges: badgeStyles,
  feedback: feedbackStyles,
  sections: sectionStyles,
  info: infoStyles,
  forms: formStyles,
  scores: scoreStyles,
  media: mediaStyles,
};
