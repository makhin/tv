# PhotoList Implementation - Отображение PhotoItemDto

## Обзор

HomeScreen теперь отображает полную информацию о фотографиях используя тип `PhotoItemDto` из API.

## Созданные компоненты и файлы

### 1. `PhotoListItem.tsx` (src/components/PhotoListItem.tsx)

Компонент для отображения одной фотографии со всеми деталями:

**Отображаемые поля:**
- ✅ **Thumbnail** (50x50px) - превью фото
- ✅ **Name** - имя файла
- ✅ **Storage** - название хранилища (с иконкой 📁)
- ✅ **TakenDate** - дата съёмки в формате `dd.MM.yyyy HH:mm` (с иконкой 🕒)
- ✅ **Caption** - описание/подпись (с иконкой 💬)
- ✅ **Persons** - список людей на фото (с иконкой 👥)
- ✅ **Tags** - список тегов (с иконкой 🏷️)
- ✅ **NSFW Badge** - бейдж 18+ для контента для взрослых

**Layout (2-row format):**
- **Строка 1:** 📁 Storage • Name • 🕒 Date
- **Строка 2:** 💬 Caption • 👥 Persons • 🏷️ Tags

**Особенности:**
- Placeholder для отсутствующего thumbnail
- Форматирование даты из ISO в читаемый формат с помощью **date-fns**
- NSFW badge в правом верхнем углу thumbnail
- TV focus эффекты (подсветка, масштабирование 1.02x)
- Адаптивные размеры для TV и мобильных устройств
- Компактный 2-строчный layout с разделителями-точками

**Props:**
```typescript
interface PhotoListItemProps {
  thumbnailUrl?: string | null;
  name: string;
  storageName: string;
  takenDate?: string | null;
  captions?: string[] | null;
  personNames?: string[];    // Преобразованные ID -> имена
  tagNames?: string[];       // Преобразованные ID -> названия
  isAdultContent?: boolean;
  onPress: () => void;
  onFocus?: () => void;
  hasTVPreferredFocus?: boolean;
}
```

### 2. `photoHelpers.ts` (src/utils/photoHelpers.ts)

Utility функции для работы с `PhotoItemDto`:

#### Основные функции:

**`mapPhotosToDisplay()`**
```typescript
// Преобразует PhotoItemDto[] в PhotoItemDisplay[]
// Добавляет personNames и tagNames вместо ID
const displayPhotos = mapPhotosToDisplay(photos, persons, tags);
```

**`formatPhotoDate()`**
```typescript
// ISO -> dd.MM.yyyy HH:mm
const formatted = formatPhotoDate('2024-01-15T14:30:00Z');
// => '15.01.2024 14:30'
```

**`isNSFW()`**
```typescript
// Проверка NSFW контента
const nsfw = isNSFW(photo); // true если isAdultContent === true или adultScore > 0.7
```

**`getMainCaption()`**
```typescript
// Возвращает первую caption
const caption = getMainCaption(photo.captions); // 'Семейный ужин'
```

**`filterPhotos()`**
```typescript
// Фильтрация фото по критериям
const filtered = filterPhotos(photos, {
  hideNSFW: true,
  personName: 'Анна',
  tagName: 'отпуск',
  dateFrom: new Date('2024-01-01'),
  dateTo: new Date('2024-12-31'),
});
```

**`sortPhotos()`**
```typescript
// Сортировка
const sorted = sortPhotos(photos, 'date', 'desc'); // По дате, новые первые
const sorted = sortPhotos(photos, 'name', 'asc');  // По имени, А-Я
const sorted = sortPhotos(photos, 'storage', 'asc'); // По хранилищу
```

**`groupPhotosByDate()`**
```typescript
// Группировка для timeline view
const grouped = groupPhotosByDate(photos);
// Map<'2024-01-15', PhotoItemDto[]>
```

### 3. Обновленный `HomeScreen.tsx`

**Структура данных:**
```typescript
interface PhotoItemDisplay extends PhotoItemDto {
  personNames?: string[];  // Преобразованные имена персон
  tagNames?: string[];     // Преобразованные имена тегов
}
```

**Моковые данные:**
- 20 фотографий с различными атрибутами
- Случайные даты съёмки
- Разные хранилища ('Семейный архив', 'Отпуск 2024')
- Случайные люди и теги
- NSFW контент (каждая 7-я фотография)
- Подписи и описания

**Header:**
- Заголовок: "Фотоархив"
- Счётчик фото: "Фото: 20"
- Кнопка "Настройки"

## Интеграция с реальным API

### Шаг 1: Получение данных

Замените моковые данные на реальный API запрос:

```typescript
import { usePhotosSearchPhotos, usePersonsGetAll, useTagsGetAll } from '@/api';

const HomeScreen = ({ navigation }) => {
  // Загружаем фото
  const searchMutation = usePhotosSearchPhotos();

  // Загружаем справочники
  const { data: personsData } = usePersonsGetAll();
  const { data: tagsData } = useTagsGetAll();

  useEffect(() => {
    searchMutation.mutate({
      data: {
        page: 1,
        pageSize: 50,
        storages: [1, 2], // ID хранилищ
      },
    });
  }, []);

  // Преобразуем данные
  const photos = useMemo(() => {
    if (!searchMutation.data?.items) return [];

    return mapPhotosToDisplay(
      searchMutation.data.items,
      personsData || [],
      tagsData || []
    );
  }, [searchMutation.data, personsData, tagsData]);

  // Показываем индикатор загрузки
  if (searchMutation.isPending) {
    return <LoadingSpinner />;
  }

  // Рендерим список
  return <FlatList data={photos} ... />;
};
```

### Шаг 2: Обновление при изменениях

```typescript
// Инвалидация кеша при добавлении/удалении фото
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

// После загрузки/удаления фото
queryClient.invalidateQueries({
  queryKey: getPhotosSearchPhotosKey()
});
```

## Поля PhotoItemDto

Согласно `photoBankApi.schemas.ts:193-216`:

```typescript
interface PhotoItemDto {
  id: number;
  thumbnailUrl?: string | null;        // ✅ Отображается
  name: string;                         // ✅ Отображается
  takenDate?: string | null;            // ✅ Отображается (форматируется)
  isBW?: boolean;                       // ⚪ Можно добавить индикатор Ч/Б
  isAdultContent?: boolean;             // ✅ Отображается (NSFW badge)
  adultScore?: number;                  // ✅ Используется для определения NSFW
  isRacyContent?: boolean;              // ⚠️ Не отображается
  racyScore?: number;                   // ⚠️ Не отображается
  storageName: string;                  // ✅ Отображается
  relativePath: string;                 // ⚠️ Не отображается (можно добавить)
  tags?: number[] | null;               // ✅ Преобразуется в tagNames
  persons?: number[] | null;            // ✅ Преобразуется в personNames
  captions?: string[] | null;           // ✅ Отображается (первая caption)
}
```

## Дизайн и стили

### Цветовая схема:
- Фон приложения: `#1e3a5f` (синий)
- Фон карточки: `#374151` (серый)
- Фон при фокусе: `#4b5563` + синяя рамка `#3b82f6`
- Текст основной: `#e5e7eb` → `#ffffff` при фокусе
- Текст второстепенный: `#9ca3af` → `#d1d5db` при фокусе
- NSFW badge: `#ef4444` (красный)

### Размеры (TV):
- Thumbnail: 50x50px
- Padding карточки: 12px
- Margin между карточками: 12px
- Минимальная высота: 90px
- Масштаб при фокусе: 1.02x
- Рамка при фокусе: 3px

### Иконки (эмодзи):
- 📁 Хранилище
- 🕒 Дата
- 💬 Описание
- 👥 Люди
- 🏷️ Теги

## Будущие улучшения

### 1. Добавить фильтры:
```typescript
<FilterPanel
  onFilterChange={(filters) => setFilters(filters)}
  showNSFW={false}
  selectedStorage={null}
  selectedPerson={null}
  dateRange={null}
/>
```

### 2. Добавить сортировку:
```typescript
<SortSelector
  sortBy="date"
  order="desc"
  onChange={(sort, order) => setSorting({ sort, order })}
/>
```

### 3. Добавить индикатор Ч/Б:
```typescript
{isBW && <Text style={styles.bwBadge}>Ч/Б</Text>}
```

### 4. Показать relativePath:
```typescript
<Text style={styles.path}>📂 {relativePath}</Text>
```

### 5. Timeline view:
```typescript
const grouped = groupPhotosByDate(photos);
// Отображать группами по датам
```

### 6. Infinite scroll:
```typescript
<FlatList
  data={photos}
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
/>
```

## Тестирование

### Запуск:
```bash
pnpm start
pnpm run android
```

### Проверить:
- ✅ Отображение всех полей PhotoItemDto
- ✅ Форматирование даты
- ✅ NSFW badge на нужных фото
- ✅ Списки людей и тегов
- ✅ Навигация в DetailScreen
- ✅ TV focus с пульта
- ✅ Масштабирование при фокусе

## Пример использования с реальными данными

```typescript
// Пример запроса с фильтрами
searchMutation.mutate({
  data: {
    page: 1,
    pageSize: 20,
    storages: [1],
    personNames: ['Анна'],
    tagNames: ['отпуск'],
    takenDateFrom: '2024-01-01T00:00:00Z',
    takenDateTo: '2024-12-31T23:59:59Z',
    isAdultContent: false, // Скрыть NSFW
  },
});
```

## Связь с другими экранами

**DetailScreen** может отображать:
- Полноразмерное фото
- Все captions
- Всех людей с возможностью перехода к их профилям
- Все теги
- Карту с location (если есть GeoPoint)
- EXIF данные (orientation, scale)
