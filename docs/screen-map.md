# Screen Map and User Flows

## Глобальная структура

```text
Onboarding / Guest
└─ Main app
   ├─ Учеба
   │  ├─ Карта курса
   │  ├─ Карточка/старт урока
   │  ├─ Урок
   │  │  ├─ Упражнение
   │  │  ├─ Feedback: верно / 1-я ошибка / 2-я ошибка
   │  │  ├─ Bottom sheet «Теория»
   │  │  └─ Повтор ошибок
   │  ├─ Завершение урока
   │  ├─ Итоги рейтинговой недели (условно)
   │  └─ Тест уровня
   ├─ Рейтинг
   │  ├─ Демонстрационный рейтинг гостя
   │  ├─ Недельный рейтинг
   │  └─ Правила рейтинга
   └─ Профиль
      ├─ Обзор прогресса
      ├─ Медали и история
      ├─ Достижения
      ├─ Редактирование профиля/никнейма
      └─ Настройки
```

«Коллекций» в глобальной навигации и карте экранов нет.

## Поток 1. Первый UX-прототип

```text
Карта курса
→ выбрать текущий урок
→ старт/контекст урока
→ 5–10 упражнений разных типов
   ↳ открыть/закрыть «Теорию» без потери состояния
   ↳ верно: продолжить
   ↳ 1-я ошибка: повторить попытку
   ↳ 2-я ошибка: увидеть правильный ответ и пояснение
→ повторить ошибочные задания один раз
→ экран завершения: XP + маскот + джингл
→ вернуться на обновленную карту
```

Этот поток является первым объектом проектирования и тестирования. Регистрация, настоящий рейтинг и backend не блокируют его.

## Поток 2. Упражнение

```text
Load exercise
→ stimulus/instruction
→ user answer
→ Check
   ├─ correct on first attempt
   │  → positive feedback → Continue
   ├─ incorrect, attempt 1
   │  → corrective feedback → retry same exercise
   └─ incorrect, attempt 2
      → correct answer + brief explanation
      → queue for end-of-lesson repeat → Continue
```

Теория доступна из упражнения как модальный bottom sheet. При закрытии пользователь возвращается в точно то же состояние.

## Поток 3. Завершение урока

```text
Last regular exercise
→ queued error repeats (if any)
→ calculate first-completion XP
→ lesson completion screen
   ├─ 20 base XP + accuracy bonus up to 10
   ├─ mascot reaction
   ├─ 1–3 s jingle
   └─ ranking rise, only when positive and applicable
→ Continue / Course map
→ weekly results screen if this was first lesson of a new week
```

Порядок итогов недели: сначала обычное завершение текущего урока, затем одноразовые итоги предыдущей рейтинговой недели.

## Поток 4. Карта и уровни

```text
Учеба
→ карта модулей/уроков
→ текущий доступный урок
→ прохождение
→ обновление завершенности
→ следующий урок
→ итоговый тест A1 (80%)
→ A2
```

Входной тест может сразу открыть A2. Точные правила предложения входного теста, разблокировки и пересдачи — TBD.

## Поток 5. Рейтинг

### Зарегистрированный участник

```text
Рейтинг
→ неделя: progress + time remaining
→ 5 neighbors above + user + 5 below
→ position delta since previous visit
```

Первые три места оформляются внутри таблицы. При 0 XP таблица видна, но место пользователя заменено приглашением начать обучение.

### Гость

```text
Рейтинг
→ clearly labeled demo table
→ short rules
→ Register
```

### Конец недели

```text
First completed lesson of a new week
→ normal lesson completion
→ previous-week result
   ├─ place
   ├─ medal if top 3 and XP > 0
   └─ mascot congratulations without negative framing
```

## Поток 6. Профиль

```text
Профиль
├─ A1 and A2 progress
├─ streak / goals / statistics
├─ medal counters → weekly medal history
├─ achievements → received/locked detail
├─ edit avatar and nickname
│  └─ manual input or two-part Tatar nickname generator
└─ settings
```

Точная структура настроек, авторизации и управления данными — TBD.

## Ключевые состояния, которые обязаны иметь макеты/реализацию

- карта: новый пользователь, текущий урок, завершенный модуль, заблокированный урок;
- упражнение: пусто, выбран ответ, верно, первая ошибка, вторая ошибка, теория открыта, повтор ошибки;
- аудио: готово, воспроизводится, пауза, ошибка загрузки;
- завершение: 20 XP, 20 + бонус, рост рейтинга, без рейтингового изменения, повторное прохождение без XP;
- рейтинг: гость, ожидание 20 участников, 0 XP, обычная позиция, топ-3, итоги недели;
- профиль: нет наград, есть медали, закрытые/полученные достижения.

