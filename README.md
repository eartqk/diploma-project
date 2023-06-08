# Дипломный проект
## На тему "Веб-приложение для обмена фото- и видеоматериалами для ученых"

Проект состоит из двух частей:
- фронтенд
- бэкенд

Для фронтеда использовался React и Redux.  
Для бэкенда использовался FastAPI.  
Для БД - PostgreSQL.
Для хранения файлов - MinIO.
Для поиска - Elasticsearch.

Для запуска фронтенда (действия делать в папке фронтенда):
```
npm i  # Скачать все зависимости
npm run dev  # Запустить в dev режиме
```
Для запуска бэкенда, вместе с базой даных, хранилищем и поисковой системой (действия делать в папке бэкенда):
```
make rebuild  # Для сборки контейнеров
```
В случае, если контейнеры уже собраны, но нужно просто их запустить или выключить, можно использовать:
```
make up  # Для поднятия контейнеров
make down  # Для выключения контейнеров
```

Необходимо предварительно выполнить миграции на новой базе данных, делается это с помощью alembic.  
Для передачи пути для базы данных используется переменная окружения database_url в backend/sciencelink/setting.py  
Запускается миграция с помощью команды:
```
alembic upgrade heads
```
В случае изменения в таблицах SQLAlchemy необходимо создать новую миграцию:
```
alembic revision --autogenerate -m <название_миграции> 
```
