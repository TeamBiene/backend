# REST API

authorization header -> for all calls

## Controllers

### Colony - [x]

| Method | URL                   | Description                          |
| ------ | --------------------- | ------------------------------------ |
| GET    | /colony/{beekeeperId} | Returns all colonies of a beekeeper. |

| Method | URL     | Description      |
| ------ | ------- | ---------------- |
| POST   | /colony | Post new colony. |

### Map - [x]

| Method | URL                                                                  | Description                                    |
| ------ | -------------------------------------------------------------------- | ---------------------------------------------- |
| GET    | /map?startLatitude=0&startLongitude=0&stopLatitude=0&stopLongitude=0 | Returns all colonies in the coordinates range. |

### User - [x]

| Method | URL            | Description         |
| ------ | -------------- | ------------------- |
| GET    | /user/{userId} | Returns user by id. |

| Method | URL                               | Description       |
| ------ | --------------------------------- | ----------------- |
| GET    | /user?association={associationId} | Return all users. |

### News - [x]

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

### Events - [x]

| Method | URL                                | Description        |
| ------ | ---------------------------------- | ------------------ |
| GET    | /event?association={associationId} | Return all events. |

| Method | URL    | Description            |
| ------ | ------ | ---------------------- |
| POST   | /event | Upload new news entry. |

| Method | URL             | Description                                 |
| ------ | --------------- | ------------------------------------------- |
| GET    | /event/{newsId} | Return specific event item. (with comments) |

| Method | URL             | Description         |
| ------ | --------------- | ------------------- |
| POST   | /event/{newsId} | Upload new comment. |

### Account -> feature creep

| Method | URL      | Description                         |
| ------ | -------- | ----------------------------------- |
| GET    | /account | Return infos about current account. |

### Chat - [x]

| Method | URL                                       | Description                |
| ------ | ----------------------------------------- | -------------------------- |
| GET    | /chat?since={unixTimestamp}&from={userId} | Return messages with user. |

| Method | URL                 | Description           |
| ------ | ------------------- | --------------------- |
| POST   | /chat?from={userId} | Send message to user. |

| Method | URL   | Description           |
| ------ | ----- | --------------------- |
| GET    | /chat | Get all active chats. |

### Association - [x]

| Method | URL          | Description               |
| ------ | ------------ | ------------------------- |
| GET    | /association | Returns all associations. |
