# HomeScreen - Изменения в дизайне

## Что изменилось

### Было (Grid Layout):
- Сетка 4x5 с карточками
- Превью 400x225px
- Горизонтальная прокрутка по рядам

### Стало (List Layout):
- Вертикальный список эпизодов
- Превью 50x50px (как на скриншоте)
- Дизайн в стиле списка эпизодов TV-шоу

## Новые компоненты

### `EpisodeListItem.tsx`

Компонент для отображения элемента списка с:
- Миниатюрой 50x50px слева
- Названием эпизода (основной текст)
- Именем файла (подзаголовок)
- TV focus эффектами (масштабирование, подсветка)

**Props:**
```typescript
interface EpisodeListItemProps {
  title: string;          // "Блуи - S02E01 - Эпизод 1"
  subtitle?: string;      // "Bluey.S02E01.720p.mkv"
  thumbnailUrl?: string;  // URL превью 50x50
  onPress: () => void;
  onFocus?: () => void;
  hasTVPreferredFocus?: boolean;
}
```

**Стили:**
- Фон: `#374151` (серый)
- Фокус: `#4b5563` (светло-серый) + синяя рамка `#3b82f6`
- Масштабирование при фокусе: 1.02x
- Минимальная высота: 74px (TV) / 66px (мобильный)

## Обновленный HomeScreen

### Структура данных:
```typescript
interface Episode {
  id: string;           // "episode-1"
  title: string;        // "Блуи - S02E01 - Эпизод 1"
  subtitle: string;     // "Bluey.S02E01.720p.mkv"
  thumbnailUrl: string; // URL 50x50
}
```

### Изменения в UI:
1. **Заголовок:** "Блуи - Сезон 2" (вместо "Моё Android TV приложение")
2. **Фон:** `#1e3a5f` (синий, как на скриншоте)
3. **Layout:** FlatList вместо FocusableGrid
4. **Формат данных:** Эпизоды с номерами сезонов/серий

### Генерация тестовых данных:
```typescript
const episodes = Array.from({ length: 20 }, (_, i) => ({
  id: `episode-${i + 1}`,
  title: `Блуи - S02E${String(i + 1).padStart(2, '0')} - Эпизод ${i + 1}`,
  subtitle: `Bluey.S02E${String(i + 1).padStart(2, '0')}.720p.mkv`,
  thumbnailUrl: `https://picsum.photos/50/50?random=${i}`,
}));
```

## Навигация

При клике на эпизод:
```typescript
navigation.navigate('Detail', {
  itemId: item.id,      // "episode-1"
  title: item.title,    // "Блуи - S02E01 - Эпизод 1"
});
```

## TV Focus поведение

1. **Первый элемент:** `hasTVPreferredFocus={index === 0}` - фокус по умолчанию
2. **Навигация:** Вверх/вниз по списку с помощью D-pad
3. **Выбор:** Кнопка OK/Enter для открытия DetailScreen
4. **Визуальная обратная связь:**
   - Увеличение масштаба (1.02x)
   - Синяя рамка 3px
   - Светлый фон
   - Яркий текст

## Интеграция с API

Для реальных данных используйте хуки из `@api`:

```typescript
import { usePhotosSearchPhotos } from '@api';

const { data, isLoading } = usePhotosSearchPhotos({
  query: {
    enabled: true,
  },
});

const episodes = data?.items?.map(photo => ({
  id: String(photo.id),
  title: photo.name,
  subtitle: photo.relativePath,
  thumbnailUrl: photo.thumbnailUrl || '',
})) || [];
```

## Размеры и отступы

### EpisodeListItem:
- Thumbnail: 50x50px (фиксировано)
- Padding: 12px (TV) / 8px (mobile)
- Margin bottom: 12px (TV) / 8px (mobile)
- Border radius: 8px
- Focus border: 3px

### HomeScreen:
- Header padding: 32px horizontal, 24px vertical (TV)
- List padding: 32px horizontal, 16px vertical (TV)
- Title font: 36px (TV) / 24px (mobile)

## Цветовая схема

| Элемент | Цвет | Описание |
|---------|------|----------|
| Фон экрана | `#1e3a5f` | Синий (как на скриншоте) |
| Фон элемента | `#374151` | Темно-серый |
| Фон при фокусе | `#4b5563` | Светло-серый |
| Рамка фокуса | `#3b82f6` | Синий |
| Текст заголовка | `#e5e7eb` → `#ffffff` | Серый → Белый |
| Текст подзаголовка | `#9ca3af` → `#d1d5db` | Темно-серый → Светло-серый |

## Тестирование

Запустите приложение:
```bash
pnpm start
pnpm run android
```

Проверьте:
- ✅ Список отображается вертикально
- ✅ Превью 50x50px видны
- ✅ Фокус работает с пульта (D-pad)
- ✅ Масштабирование при фокусе
- ✅ Навигация в DetailScreen работает
