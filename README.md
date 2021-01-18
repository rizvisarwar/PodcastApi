# ACAST coding assigment

You will find the coding assignment description in the [ASSIGNMENT.md](ASSIGNMENT.md) file.

## API Documentation

API documentation is written in swagger.json file inside src\app folder. [Swagger](api/swagger.json).
If the application is running locally on port 3000, then the swagger link would be:
http://localhost:3000/api-docs

## API Description

The REST endpoints are described below:

- GET /episodes/metadata

The expected response is a JSON array.
Example: GET episodes/metadata?rss=https://rss.acast.com/varvet


```json
[
{
"title": "KORT VERSION #450: Anne Lundberg",
"checkoutsum": 123,
"url": "https://play.acast.com/s/varvet/kortversion-450-annelundberg"
},
{
"title": "#450: Anne Lundberg",
"checkoutsum": 123,
"url": "https://play.acast.com/s/varvet/-450-annelundberg"
}
]
```

## Tools and libraries used

    - axios
    - jest
    - express
    - fast-xml-parser
    - npm
    - nodemon
    - rss-parser
    - swagger-ui-express
    - swagger editor
    - typescript

## How to run

Easiest way is run the following command from project home directory:

    $ cd src/app
    $ npm start

## Test

Following is the command to run tests from anywhere in the project directory:

    $ jest
