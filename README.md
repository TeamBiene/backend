# REST API

## Controllers

### Colony

| Method | URL                   | Description                          |
| ------ | --------------------- | ------------------------------------ |
| GET    | /colony/{beekeeperId} | Returns all colonies of a beekeeper. |

### Map

| Method | URL                                                                  | Description                                    |
| ------ | -------------------------------------------------------------------- | ---------------------------------------------- |
| GET    | /map?startLatitude=0&startLongitude=0&stopLatitude=0&stopLongitude=0 | Returns all colonies in the coordinates range. |
