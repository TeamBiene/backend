# REST API

authorization header -> for all calls

## Controllers

### Colony

| Method | URL                   | Description                          |
| ------ | --------------------- | ------------------------------------ |
| GET    | /colony/{beekeeperId} | Returns all colonies of a beekeeper. |

| Method | URL     | Description      |
| ------ | ------- | ---------------- |
| POST   | /colony | Post new colony. |

### Map

| Method | URL                                                                  | Description                                    |
| ------ | -------------------------------------------------------------------- | ---------------------------------------------- |
| GET    | /map?startLatitude=0&startLongitude=0&stopLatitude=0&stopLongitude=0 | Returns all colonies in the coordinates range. |

### User

| Method | URL            | Description         |
| ------ | -------------- | ------------------- |
| GET    | /user/{userId} | Returns user by id. |

| Method | URL                               | Description       |
| ------ | --------------------------------- | ----------------- |
| GET    | /user?association={associationId} | Return all users. |

### News

| Method | URL                               | Description      |
| ------ | --------------------------------- | ---------------- |
| GET    | /news?association={associationId} | Return all news. |

| Method | URL   | Description            |
| ------ | ----- | ---------------------- |
| POST   | /news | Upload new news entry. |

| Method | URL            | Description                                |
| ------ | -------------- | ------------------------------------------ |
| GET    | /news/{newsId} | Return specific news item. (with comments) |

| Method | URL            | Description         |
| ------ | -------------- | ------------------- |
| POST   | /news/{newsId} | Upload new comment. |

### Account -> feature creep

| Method | URL      | Description                         |
| ------ | -------- | ----------------------------------- |
| GET    | /account | Return infos about current account. |

### Chat

| Method | URL                                  | Description                |
| ------ | ------------------------------------ | -------------------------- |
| GET    | /chat/{userId}?since={unixTimestamp} | Return messages with user. |

| Method | URL                          | Description           |
| ------ | ---------------------------- | --------------------- |
| POST   | /chat/{userId}?from={userId} | Send message to user. |

### Assosiation

| Method | URL          | Description               |
| ------ | ------------ | ------------------------- |
| GET    | /association | Returns all associations. |
