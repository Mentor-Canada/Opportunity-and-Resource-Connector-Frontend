set -ex
j2 .env.j2 > .env
npm install
docker-compose run builder npx webpack
docker-compose down
rsync -aP . $1 --delete
