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

type SpacingKey = keyof typeof spacing;
type FontSizeKey = keyof typeof typography.fontSize;

const responsiveSpacing = (tv: SpacingKey, other: SpacingKey) =>
  isTV ? spacing[tv] : spacing[other];

const responsiveFontSize = (tv: FontSizeKey, other: FontSizeKey) =>
  isTV ? typography.fontSize[tv] : typography.fontSize[other];

const responsiveValue = <T>(tvValue: T, otherValue: T): T =>
  isTV ? tvValue : otherValue;

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
    gap: responsiveSpacing('md', 'sm'),
  },
  md: {
    gap: responsiveSpacing('lg', 'md'),
  },
  lg: {
    gap: responsiveSpacing('xxxl', 'xl'),
  },
});

export const insetStyles = StyleSheet.create({
  screenPadding: {
    padding: responsiveSpacing('jumbo', 'xl'),
  },
  screenHorizontal: {
    paddingHorizontal: responsiveSpacing('jumbo', 'xl'),
  },
  headerVertical: {
    paddingVertical: responsiveSpacing('xxxl', 'xl'),
  },
  headerHorizontal: {
    paddingHorizontal: responsiveSpacing('jumbo', 'xl'),
  },
  listContent: {
    paddingHorizontal: responsiveSpacing('jumbo', 'xl'),
    paddingBottom: responsiveSpacing('xl', 'md'),
  },
  sectionPadding: {
    padding: responsiveSpacing('xxl', 'lg'),
  },
  cardPadding: {
    padding: responsiveSpacing('xxl', 'lg'),
  },
  inputPadding: {
    paddingVertical: responsiveSpacing('xxl', 'lg'),
    paddingHorizontal: responsiveValue(13, 9),
  },
  paddingSm: {
    paddingHorizontal: responsiveSpacing('lg', 'md'),
    paddingVertical: responsiveSpacing('md', 'sm'),
  },
  marginBottomLg: {
    marginBottom: responsiveSpacing('xxxl', 'xl'),
  },
  marginBottomMd: {
    marginBottom: responsiveSpacing('xxl', 'lg'),
  },
  marginBottomSm: {
    marginBottom: responsiveSpacing('lg', 'md'),
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
    fontSize: responsiveFontSize('mega', 'display'),
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  headingDisplay: {
    fontSize: responsiveFontSize('display', 'xxl'),
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  headingSection: {
    fontSize: responsiveFontSize('xxl', 'lg'),
    fontWeight: typography.weight.bold,
    color: colors.accentPrimary,
  },
  headingPrimary: {
    fontSize: responsiveFontSize('xxl', 'xl'),
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  headingMuted: {
    fontSize: responsiveFontSize('xxl', 'xl'),
    color: colors.textMuted,
  },
  bodyPrimary: {
    fontSize: responsiveFontSize('xl', 'md'),
    color: colors.textPrimary,
  },
  bodySecondary: {
    fontSize: responsiveFontSize('xl', 'sm'),
    color: colors.textSecondary,
  },
  bodyMuted: {
    fontSize: responsiveFontSize('xl', 'sm'),
    color: colors.textMuted,
  },
  bodySubtle: {
    fontSize: responsiveFontSize('lg', 'sm'),
    color: colors.textSubtle,
  },
  caption: {
    fontSize: responsiveFontSize('lg', 'sm'),
    color: colors.textPrimary,
  },
  captionMuted: {
    fontSize: responsiveFontSize('sm', 'xs'),
    color: colors.textMuted,
  },
  badge: {
    fontSize: responsiveFontSize('sm', 'xs'),
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
    fontSize: responsiveFontSize('display', 'lg'),
    color: colors.textMuted,
    textAlign: 'center' as const,
  },
  statusSmall: {
    fontSize: responsiveFontSize('xxl', 'xl'),
    color: colors.textMuted,
    textAlign: 'center' as const,
  },
  error: {
    fontSize: responsiveFontSize('hero', 'xxl'),
    color: colors.danger,
    textAlign: 'center' as const,
  },
  errorDetail: {
    fontSize: responsiveFontSize('xxl', 'xl'),
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
    paddingVertical: responsiveSpacing('xxl', 'lg'),
    paddingHorizontal: responsiveSpacing('jumbo', 'xxxl'),
    borderRadius: spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minWidth: responsiveValue(200, 120),
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
    fontSize: responsiveFontSize('display', 'lg'),
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
    width: responsiveValue(72, 44),
    height: responsiveValue(72, 44),
    minWidth: responsiveValue(72, 44),
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: responsiveValue(18, 12),
  },
  iconText: {
    fontSize: responsiveFontSize('mega', 'display'),
    lineHeight: responsiveValue(40, 22),
  },
});

export const listStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    backgroundColor: colors.borderMuted,
    borderRadius: spacing.xl,
    padding: responsiveSpacing('xxl', 'lg'),
    marginBottom: responsiveSpacing('xxl', 'lg'),
    minHeight: responsiveValue(90, 80),
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
    marginRight: responsiveSpacing('xxxl', 'xl'),
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
    fontSize: responsiveFontSize('display', 'xxl'),
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
    fontSize: responsiveFontSize('xl', 'sm'),
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
    fontSize: responsiveFontSize('xl', 'sm'),
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
    paddingHorizontal: responsiveSpacing('lg', 'md'),
    paddingVertical: responsiveSpacing('md', 'sm'),
    borderRadius: spacing.lg,
    marginRight: responsiveSpacing('md', 'sm'),
    marginBottom: responsiveSpacing('md', 'sm'),
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
    gap: responsiveSpacing('xxxl', 'xl'),
    paddingVertical: responsiveSpacing('jumbo', 'xxxl'),
  },
  emptyState: {
    minHeight: 400,
  },
  loaderText: {
    fontSize: responsiveFontSize('xxl', 'xl'),
    color: colors.textMuted,
    textAlign: 'center' as const,
  },
  completeIcon: {
    fontSize: responsiveFontSize('hero', 'display'),
    color: colors.success,
  },
});

export const sectionStyles = StyleSheet.create({
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingBottom: responsiveSpacing('xl', 'lg'),
    borderBottomWidth: 2,
    borderBottomColor: colors.borderMuted,
  },
  container: {
    backgroundColor: colors.backgroundMuted,
    borderRadius: spacing.xl,
    padding: responsiveSpacing('xxl', 'lg'),
    marginBottom: responsiveSpacing('xxxl', 'xl'),
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    marginBottom: responsiveSpacing('lg', 'md'),
  },
});

export const infoStyles = StyleSheet.create({
  label: {
    fontSize: responsiveFontSize('xl', 'sm'),
    color: colors.textMuted,
    marginRight: spacing.md,
    minWidth: responsiveValue(140, 100),
  },
  value: {
    fontSize: responsiveFontSize('xl', 'sm'),
    color: colors.textPrimary,
    flex: 1,
  },
  captionItem: {
    marginBottom: responsiveSpacing('xl', 'lg'),
    paddingBottom: responsiveSpacing('lg', 'md'),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderMuted,
  },
  captionText: {
    fontSize: responsiveFontSize('lg', 'sm'),
    color: colors.textPrimary,
  },
  moreText: {
    fontSize: responsiveFontSize('sm', 'xs'),
    color: colors.textMuted,
    fontStyle: 'italic',
    marginTop: responsiveSpacing('xl', 'md'),
  },
  faceItem: {
    backgroundColor: colors.borderMuted,
    paddingHorizontal: responsiveSpacing('lg', 'md'),
    paddingVertical: responsiveSpacing('md', 'sm'),
    borderRadius: spacing.lg,
    marginBottom: responsiveSpacing('md', 'sm'),
  },
  faceText: {
    fontSize: responsiveFontSize('md', 'xs'),
    color: colors.textPrimary,
  },
  badgesContainer: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: responsiveSpacing('lg', 'md'),
  },
  noFlags: {
    fontSize: responsiveFontSize('lg', 'sm'),
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});

export const formStyles = StyleSheet.create({
  infoText: {
    fontSize: responsiveFontSize('lg', 'sm'),
    color: colors.textSubtle,
    lineHeight: responsiveValue(21, 15),
    marginBottom: spacing.sm,
  },
  group: {
    marginBottom: responsiveSpacing('xxl', 'xl'),
  },
  label: {
    fontSize: responsiveFontSize('xl', 'sm'),
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: spacing.lg - 4,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    paddingVertical: responsiveSpacing('xxl', 'lg'),
    paddingHorizontal: responsiveValue(13, 9),
    color: colors.textPrimary,
    fontSize: responsiveFontSize('xl', 'sm'),
  },
});

export const scoreStyles = StyleSheet.create({
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: spacing.md,
  },
  value: {
    fontSize: responsiveFontSize('xl', 'sm'),
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
    fontSize: responsiveFontSize('xxl', 'lg'),
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
    bottom: responsiveValue(40, 20),
    alignSelf: 'center' as const,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: responsiveSpacing('jumbo', 'xxxl'),
    paddingVertical: responsiveSpacing('xxl', 'lg'),
    borderRadius: spacing.xl,
  },
  counterText: {
    color: colors.textPrimary,
    fontSize: responsiveFontSize('xxl', 'xl'),
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
