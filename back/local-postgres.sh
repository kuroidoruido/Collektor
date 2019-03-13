#!/bin/sh

NAME=postgres-collektor
USER=postgres
PASSWORD=secret

DB_NAME=collektor-back

docker stop $NAME
docker rm $NAME

docker run --name $NAME \
	-e POSTGRES_USER=$USER \
	-e POSTGRES_PASSWORD=$PASSWORD \
	-p 5432:5432 \
	-d postgres

sleep 5
docker exec -it $NAME /usr/bin/psql -U $USER -c 'CREATE DATABASE "'${DB_NAME}'"'
