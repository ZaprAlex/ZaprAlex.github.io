## Требования 
npm >= 6.14.6 <br />
node = 14.15.1 <br />
eslint >= 6.6.0



### Локальное развертывание
1. Установить node.<br />
   Лучше для этого использовать `nvm` и затем задать требуемую версию node по умолчанию, например:
   ```
   nvm alias default 14.15.1
   ```
   
2. Установить зависимости<br />
   `yarn` или `yarn install`
   <br />
   или использовать shell-скрипт в корне проекта:
   ```
   sh ./yarn-install.sh
   ```


3. Стартовать приложение
```
yarn start
```

Можно запустить приложение в контейнере.
URL бэкенда при сборке контейнера берется из .env.production
```
yarn run build
yarn run docker-build
yarn run docker-run
```

### Перед созданием PR
Необходимо прогнать 
```
yarn run lint
yarn run test --watchAll
```

Тесты лежат в папке с компонентами для упрощенной переносимости
