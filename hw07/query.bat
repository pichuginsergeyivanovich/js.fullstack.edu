docker exec -i postgresdb psql -U postgres -c "create database psi;"
docker exec -i postgresdb psql -U postgres -d psi -c "create table users(id int not null, username text not null);"
docker exec -i postgresdb psql -U postgres -d psi -c "insert into users(id, username) values(1, 'pichuginsergey');"
docker exec -i postgresdb psql -U postgres -d psi -c "select * from users;"
