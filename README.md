curl -H "Content-Type: application/json" -d '{"username":"Mawad2","password":"1"}' -X POST http://127.0.0.1:8000/user/

curl -H "Content-Type: application/json" -X GET http://127.0.0.1:8000/person/
curl -H "Content-Type: application/json" -X GET http://127.0.0.1:8000/family/

curl -H "Content-Type: application/json" -X DELETE http://127.0.0.1:8000/user/19/

curl -H "Content-Type: application/json" -d '{"id":"2", "name":"Muna","partner":"Abdullah","family":"1"}' -X POST http://127.0.0.1:8000/person/


exec(open("populate.py").read())

