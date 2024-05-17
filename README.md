curl -H "Content-Type: application/json" -d '{"username":"Mawad2","password":"1","password2":"1","family_name":"Mawad2"}' -X POST http://127.0.0.1:8000/authentication/register/

curl -d '{"username":"momen30","password":"123456",}' -H "Content-Type: application/json" -X GET http://127.0.0.1:8000/person/
curl -H "Content-Type: application/json" -X GET http://127.0.0.1:8000/family/

delete a user
curl -H "Content-Type: application/json" -X DELETE http://127.0.0.1:8000/authentication/delete/1/
curl -H "Content-Type: application/json" -X DELETE http://127.0.0.1:8000/authentication/delete/1/ -H 'Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b' # with auth

curl -H "Content-Type: application/json" -d '{"id":"2", "name":"Muna","partner":"Abdullah","family":"1"}' -X POST http://127.0.0.1:8000/person/

curl --user momen30:123456 -H "Content-Type: application/json" -d '{"id":"2", "name":"Munaaaa","partner":"Abdullah","family":"1"}' -X PUT http://127.0.0.1:8000/person/

exec(open("populate.py").read())

{
"username": "",
"password": "",
"re_password": "",
"family_name": "",
}

docker build -t family-app

COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yaml build
docker-compose -f docker-compose.yml up -d

docker-compose -f docker-compose.yaml up

ssh -i "Keymaster.pem" ubuntu@ec2-18-159-113-152.eu-central-1.compute.amazonaws.com

```
cd orchestrator/
docker login nexus.terrestris.de
docker build -t nexus.terrestris.de/wwfch_firieval/orchestrator:1.0.0 -t nexus.terrestris.de/wwfch_firieval/orchestrator:latest .
docker push nexus.terrestris.de/wwfch_firieval/orchestrator:1.0.0
docker push nexus.terrestris.de/wwfch_firieval/orchestrator:latest

docker build -t momen3/momenrepo .
docker run momen3/momenrepo
docker push momen3/momenrepo:latest
```
