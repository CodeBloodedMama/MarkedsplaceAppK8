# Apollo Queries Tutorial

## Signup (Create User)

The operation name is important. The specific operations `CreateUser` and `Login` are allowed without a jwt.

Operation:

```
mutation CreateUser($input: AuthInput) {
  signup(input: $input) {
    __typename
    ... on AuthResponse{
      _id
      username
      userJwt {
        token
      }
    }
  }
}
```

Variables (json):


```json
{
  "input":{
    "username": "mat",
    "password": "pass1234"
  }
}
```

Expected response:

```
{
  "data": {
    "signup": {
      "__typename": "AuthResponse",
      "_id": "662792ee6e5d9c2782554fb8",
      "username": "mat",
      "userJwt": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjI3OTJlZTZlNWQ5YzI3ODI1NTRmYjgiLCJ1c2VybmFtZSI6Im1hdCIsImlhdCI6MTcxMzg2OTU1MCwiZXhwIjoxNzEzODczMTUwfQ.rslMFegk2fa3zVvbVZrvK3-pCs1hAJRMdUczcnWKeo8"
      }
    }
  }
}
```

I had some odd behavior in the beginning where Apollo didn't create the user after I ran the operation a few times.

## Login

Similar to Signup.

Operation:

```
mutation Login($input: AuthInput) {
  login(input: $input) {
    __typename
    ... on AuthResponse{
      _id
      username
      userJwt {
        token
      }
    }
  }
}
```

Variables (json):


```json
{
  "input":{
    "username": "mat",
    "password": "pass1234"
  }
}
```

Expected response:

```
{
  "data": {
    "login": {
      "_id": "662792ee6e5d9c2782554fb8",
      "userJwt": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjI3OTJlZTZlNWQ5YzI3ODI1NTRmYjgiLCJ1c2VybmFtZSI6Im1hdCIsImlhdCI6MTcxMzg3MDM0MiwiZXhwIjoxNzEzODczOTQyfQ.bhtgZgwLdXWCCTmYaf4rHrfl0mpWiZZt7IJC-218O2Q"
      },
      "username": "mat"
    }
  }
}
```

## Create Book

Now we need to include the authorization token.

Operation:

```
mutation CreateBook($bookInput: BookInput) {
  createBook(bookInput: $bookInput) {
    author
    id
    title
  }
}
```

Variables (json):


```json
{
  "bookInput": {
    "author": "mybook",
    "title": "mytitle"
  }
}
```

Headers:

```
Authorization : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

Expected response:

```
{
  "data": {
    "createBook": {
      "author": "mybook",
      "id": "662797496e5d9c2782554fbd",
      "title": "mytitle"
    }
  }
}
```