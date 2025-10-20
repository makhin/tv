import React, { useState, useCallback } from 'react';
import { View, TextInput, Platform } from 'react-native';

import { FocusableButton } from '@/components/FocusableButton';
import { useThemedStyles } from '@/hooks/useThemedStyles';

export const VoiceSearchBar: React.FC = () => {
  const { styles: appStyles, colors } = useThemedStyles();
  const [query, setQuery] = useState('');

  const handleVoiceSearchPress = useCallback(() => {
    // Placeholder for future voice search integration.
  }, []);

  return (
    <View style={[appStyles.layout.rowBetween, appStyles.gaps.md, appStyles.search.container]}>
      <TextInput
        style={[appStyles.forms.input, appStyles.search.input]}
        value={query}
        onChangeText={setQuery}
        placeholder="Поиск по фото"
        placeholderTextColor={colors.placeholderText}
        returnKeyType="search"
        accessibilityLabel="Строка поиска"
      />
      <FocusableButton
        title="🎤"
        onPress={handleVoiceSearchPress}
        hasTVPreferredFocus={Platform.isTV}
        style={[appStyles.buttons.iconSquare, appStyles.search.microphoneButton]}
        textStyle={appStyles.buttons.iconText}
        accessibilityLabel="Голосовой поиск"
        accessibilityHint="Функция будет доступна позже"
      />
    </View>
  );
};
