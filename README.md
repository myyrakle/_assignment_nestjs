# test

테스트용 DB 세팅  
(PostgreSQL, nats)

```
docker run -p 12345:5432 -e POSTGRES_PASSWORD=q1w2e3r4 -d postgres
docker run -idt --name nats --network nats --rm -p 4222:4222 -p 8222:8222 nats:2.9.15-alpine3.17 --http_port 8222
```

서버 실행

```

npm i
npm run start:dev

```
