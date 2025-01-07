```bash
docker-compose --env-file .env.local up --build -d
```

docker-compose down --remove-orphans && docker build . --no-cache && docker-compose --env-file .env.local up -d