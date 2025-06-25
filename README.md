# daim-automation-testing

## npm install
```
npm install
```

## set config db in env/.env.dev
```
# Config for API
API_BASE_URL=http://localhost:3001

# Config for DB
DB_HOST=mysql              # <--- thstock-host-db
DB_USER=root               # <--- any
DB_PASSWORD=root           # <--- 1234
DB_NAME=tutorial           # <--- th-stock
DB_PORT=3306               # <--- 1234

RUNNING_LOCALLY=false       # <--- เติม true ถ้าต้องการรัน locally
DB_ENABLED=false            # <--- เติม true ถ้าต้องการใช้ DB
```

## run test
```
npx playwright test
```
