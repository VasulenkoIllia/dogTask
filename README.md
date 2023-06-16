# dog_API
## install
```bash
$ npm i
#create database img
$ cd docker
$ docker comose up -d
#seed DB create
$npx sequelize-cli db:seed:all
#seed DB delete
npx sequelize-cli db:seed:undo
#run progect
$ npm run start
```
## API
```sh
#Swagger api
http://localhost:3000/api
#GET Health check
http://localhost:3000/dog-health
#POST Dog create
http://localhost:3000/dogs/create

{
"name": "string",
"color": "string",
"tail_length": 0,
"weight": 0
}

#GET all Dogs
http://localhost:3000/dogs
#GET all Dogs with Query
http://localhost:3000/dogs?pageNumber=1&pageSize=2&attribute=name&order=asc
#GET one Dog by id
http://localhost:3000/dogs/:id
#DELETE one Dog by id
http://localhost:3000/dogs/:id
```


