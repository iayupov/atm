# Выкладка на atm.teorius.ru по SSH

## Параметры окружения

- Публичный адрес: `https://atm.teorius.ru/`
- SSH-хост: `vh406.timeweb.ru`
- IP: `92.53.96.143`
- Пользователь: `cb01374`
- Домашняя папка пользователя: `/home/c/cb01374`
- Каталог сайта: `/home/c/cb01374/atm/public_html`
- Локальный приватный ключ: `C:\atm\.deploy\teorius_atm_ed25519`

Папка `.deploy/` исключена через `.gitignore`. Никогда не коммитить приватный ключ и не вставлять его содержимое в документы, issue, сообщения или логи.

## Проверка SSH-доступа

Из PowerShell в `C:\atm`:

```powershell
ssh -i .\.deploy\teorius_atm_ed25519 -o BatchMode=yes cb01374@vh406.timeweb.ru "pwd"
```

Ожидаемый результат:

```text
/home/c/cb01374
```

Если сервер отвечает `Permission denied`, проверить:

- публичный ключ присутствует в `~/.ssh/authorized_keys` пользователя `cb01374`;
- права на `~/.ssh` — `700`;
- права на `authorized_keys` — `600`;
- локальный ключ не требует интерактивного пароля;
- используется именно пользователь `cb01374`.

## Production-сборка

```powershell
cd C:\atm
npm run build
```

Продолжать выкладку только при успешном завершении команды. Предупреждения `lucide-react` о `"use client"` допустимы, если process exit code равен `0`.

## Подготовка архива

Архивировать нужно **содержимое** `dist`, а не родительскую папку:

```powershell
tar -czf .\.deploy\atm-dist.tar.gz -C .\dist .
```

## Загрузка архива

```powershell
scp -i .\.deploy\teorius_atm_ed25519 -o BatchMode=yes `
  .\.deploy\atm-dist.tar.gz `
  cb01374@vh406.timeweb.ru:atm/atm-dist-upload.tar.gz
```

## Безопасная замена сайта

Нельзя распаковывать файлы поверх текущего сайта: старые хешированные JS/CSS-файлы останутся в каталоге. Используется соседняя временная папка и атомарное переименование.

```powershell
ssh -i .\.deploy\teorius_atm_ed25519 -o BatchMode=yes cb01374@vh406.timeweb.ru 'set -eu; cd "$HOME/atm"; test -f atm-dist-upload.tar.gz; if [ -e public_html_next ]; then rm -rf -- public_html_next; fi; mkdir public_html_next; tar -xzf atm-dist-upload.tar.gz -C public_html_next; test -f public_html_next/index.html; stamp=$(date +%Y%m%d-%H%M%S); backup="public_html_backup_$stamp"; mv public_html "$backup"; mv public_html_next public_html; rm -f atm-dist-upload.tar.gz; printf "BACKUP=%s\n" "$HOME/atm/$backup"'
```

Команда:

1. Проверяет наличие архива.
2. Распаковывает сборку в `public_html_next`.
3. Проверяет наличие `index.html`.
4. Переименовывает действующий сайт в `public_html_backup_YYYYMMDD-HHMMSS`.
5. Атомарно заменяет его новой папкой.
6. Удаляет загруженный временный архив.

Не менять путь `$HOME/atm` без отдельной проверки `pwd`, `realpath` и содержимого каталога.

## Проверка после выкладки

```powershell
curl.exe -sS -I https://atm.teorius.ru/
```

Ожидается `HTTP/1.1 200 OK`. При добавлении новых ассетов проверить хотя бы один новый файл отдельным запросом:

```powershell
curl.exe -sS -I https://atm.teorius.ru/assets/audio/upr21-selam.mp3
```

После этого вручную проверить основной поток в браузере. Учитывать длительное кеширование статических аудиофайлов; при замене файла под тем же именем мобильный браузер может показывать старую версию.

## Откат

Сначала посмотреть доступные резервные копии:

```powershell
ssh -i .\.deploy\teorius_atm_ed25519 cb01374@vh406.timeweb.ru "ls -dt atm/public_html_backup_* | head"
```

Перед откатом подставить точное имя выбранной резервной папки и ещё раз проверить его. Пример:

```powershell
ssh -i .\.deploy\teorius_atm_ed25519 cb01374@vh406.timeweb.ru 'set -eu; cd "$HOME/atm"; test -d public_html_backup_YYYYMMDD-HHMMSS; mv public_html "public_html_failed_$(date +%Y%m%d-%H%M%S)"; mv public_html_backup_YYYYMMDD-HHMMSS public_html'
```

После отката снова проверить публичный URL через `curl.exe` и браузер.

## Что не хранится в Git

- `.deploy/` и приватный SSH-ключ;
- `dist/`;
- архивы сборки `*.zip`, `*.tar.gz`;
- серверные резервные копии.

