RMDIR "C:\dev\js.fullstack.edu\srv\git-server\server\storage" /S /Q  
MKDIR "C:\dev\js.fullstack.edu\srv\git-server\server\storage"

docker-compose -f ./frontend/docker-compose-build.yml build
docker-compose -f ./git-server/docker-compose-build.yml build
docker-compose up -d --force-recreate
