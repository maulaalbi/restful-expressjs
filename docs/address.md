# Address API Spec

## Create Address API

Endpoint : POST /api/contact/:id/addresses

Headers :
- Authorization : Token

Request Body :
```json
{
    "street" : "jalan apa",
    "city" : "kota apa",
    "province" : "provinsi apa",
    "country" : "negara apa",
    "postal_code" : "kode pos"
}
```

Response Body Success :
```json
{
   "data" : {
    "id" : 1,
    "street" : "jalan apa",
    "city" : "kota apa",
    "province" : "provinsi apa",
    "country" : "negara apa",
    "postal_code" : "kode pos"
   }
}
```

Response Body Error :
```json
{
    "errors" : "country is required"
}
```
## Update Address API

    Endpoint : PUT /api/contact/:id/addresses/:addressId

Headers :
- Authorization : Token

Request Body :
```json
{
    "street" : "jalan apa",
    "city" : "kota apa",
    "province" : "provinsi apa",
    "country" : "negara apa",
    "postal_code" : "kode pos"
}
```

Response Body Success :
```json
{
     "data" : {
    "id" : 1,
    "street" : "jalan apa",
    "city" : "kota apa",
    "province" : "provinsi apa",
    "country" : "negara apa",
    "postal_code" : "kode pos"
   }
}
```

Response Body Error :
```json
{
    "errors" : "contact is not found"
}
```
## Get Address API
Endpoint : GET /api/contact/:contactId/addresses/:addressId

Headers :
- Authorization : Token


Response Body Success :
```json
{
     "data" : {
    "id" : 1,
    "street" : "jalan apa",
    "city" : "kota apa",
    "province" : "provinsi apa",
    "country" : "negara apa",
    "postal_code" : "kode pos"
   }
}
```

Response Body Error :
```json
{
    "errors" : "contact is not found"
}
```
## List Address API
Endpoint : GET /api/contact/:contactId/addresses

Headers :
- Authorization : Token


Response Body Success :
```json
{
   "data" : [
    {
        "id" : 1,
    "street" : "jalan apa",
    "city" : "kota apa",
    "province" : "provinsi apa",
    "country" : "negara apa",
    "postal_code" : "kode pos"
    },
    {
        "id" : 2,
    "street" : "jalan apa",
    "city" : "kota apa",
    "province" : "provinsi apa",
    "country" : "negara apa",
    "postal_code" : "kode pos"
    }
   ]
    
   
}
```

Response Body Error :
```json
{
    "errors" : "contact is not found"
}
```
## Remove Address API
Endpoint : DELETE /api/contact/:contactId/addresses/:addressId

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