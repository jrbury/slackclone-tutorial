# slackclone-tutorial
code for following along with https://www.youtube.com/watch?v=0MKJ7JbVnFc&amp;list=PLN3n1USn4xlkdRlq3VZ1sT6SGW0-yajjL

## Postgres

`docker run --name postgres-server -p 5432:5432 -e POSTGRES_PASSWORD=postgrespass -d postgres`

`docker run -it --rm --link postgres-server:postgres postgres psql -h postgres-server -U postgres`