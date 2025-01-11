# Contact API Spec

## Create Contact API

Endpoint : POST /api/contact

Headers :
- Authorization : Token

Request Body :
```json
{
    "firstName": "Maula",
    "lastName": "Albi",
    "email": "albi@gmail.com",
    "phone" : "012819341"
}
```

Response Body Success :
```json
{
    "data" : {
        "id" : 1,
        "firstName": "Maula",
        "lastName": "Albi",
        "email": "albi@gmail.com",
        "phone" : "012819341"
    }
}
```

Response Body Error :
```json
{
    "errors" : "email not valid format"
}
```
## Update Contact API

Endpoint : PUT /api/contact/:id

Headers :
- Authorization : Token

Request Body :
```json
{
     "firstName": "Maula",
    "lastName": "Albi",
    "email": "albi@gmail.com",
    "phone" : "012819341"
}
```

Response Body Success :
```json
{
      "data" : {
        "id" : 1,
        "firstName": "Maula",
        "lastName": "Albi",
        "email": "albi@gmail.com",
        "phone" : "012819341"
    }
}
```

Response Body Error :
```json
{
    "errors" : "email not valid format"
    
}
```

## Get Contact API

Endpoint : GET /api/contact/:id

Headers :
- Authorization : Token


Response Body Success :
```json
{
      "data" : {
        "id" : 1,
        "firstName": "Maula",
        "lastName": "Albi",
        "email": "albi@gmail.com",
        "phone" : "012819341"
    }    
}
```

Response Body Error :
```json
{
    "errors" : "contact is not found"
}
```
## Search Contact API

Endpoint : POST /api/contact

Headers :
- Authorization : Token

Query Parameters :
- name  : Search by firstName or lastName, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page  : number of page, default 1
- size  : size per page, default 10 

Response Body Success :
```json
{
    "data" : [
        {
        "id" : 1,
        "firstName": "Maula",
        "lastName": "Albi",
        "email": "albi@gmail.com",
        "phone" : "012819341"
        },
        {
         "id" : 2,
        "firstName": "Maula",
        "lastName": "Albi",
        "email": "albi@gmail.com",
        "phone" : "012819341"
        }
    ],
    "pagging" : {
        "page" : 1,
        "total_page" : 3,
        "total_item" : 30
    }
}
```

Response Body Error :
```json
{
    
}
```
## Remove Contact API

Endpoint : DELETE /api/contact/:id

Headers :
- Authorization : Token



Response Body Success :
```json
{
   "data" : "OK" 
}
```

Response Body Error :
```json
{
    "errors" : "contact is not found"
}
```