
curl -H "Content-Type: application/json" -d '{"username":"Mawad2","password":"1","password2":"1","family_name":"Mawad2"}' -X POST http://127.0.0.1:8000/authentication/register/

curl -H "Content-Type: application/json" -X GET http://127.0.0.1:8000/person/
curl -H "Content-Type: application/json" -X GET http://127.0.0.1:8000/family/

delete a user
curl -H "Content-Type: application/json" -X DELETE http://127.0.0.1:8000/authentication/delete/1/
curl -H "Content-Type: application/json" -X DELETE http://127.0.0.1:8000/authentication/delete/1/ -H 'Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b' # with auth

curl -H "Content-Type: application/json" -d '{"id":"2", "name":"Muna","partner":"Abdullah","family":"1"}' -X POST http://127.0.0.1:8000/person/


exec(open("populate.py").read())

