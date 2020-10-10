# Flight Service
## Summary
This application is a standalone task based micro service providing REST HTTP endpoints.

It has 3 different APIs for finding the best itinerary and flights between two given airports:

* V1: Shortest path between source and destination (Using Dijkstra under the hood)  
* V2: Shortest path between source and destination with most 3 layovers (Using combination of Dynamic programing and Bellman Ford under the hood)  
* v3: Shortest path between source and destination with most 3 layovers and the possibility of taking some amount of path by car. (Same as V2 but it looks for airports in 100 Km around and finds more routes.) 

## Features Overview
* Fully isolated and dockerized application
* Avoiding compilation error with the power of [Typescript](https://www.typescriptlang.org/)
* Strong error handling
* Descriptive API documentation powered by Swagger

## Installation guide
Follow these steps to simply run the project.

### Clone the project
Clone this repository to your local machine using the following command:
```bash
git clone git@github.com:majidakbari/flight.git
```

### Environment variables
There is a `.env.example` file in the project's root directory containing OS level environment variables used for deploying the whole application.
Every single variable inside the file has a default value, so you do not need to change them; But you can also override your own variables. First copy the example file to the `.env` file:
```bash
cd /path-to-project
cp .env.example .env
```
Then open your favorite text editor like `vim` or `nano` and change the variables.

For example `APP_PORT` environment variable shows the project will run on the following port. You can change them to your desired values.

### Running containers
Open `Terminal` and type the following command:
```bash
docker-compose up -d 
```

Only the first time you're running the application, you must execute the following command:

```bash
docker-compose exec flight-app node dist/seeders/seedDb.js
```
It will populate database with airport and airport routes data.

## Technical discussions (Images/Containers)
This project includes three docker containers based on `php-apache`, `MySQL` and `Swagger` images.
It is under development, So the source code is mounted from the host to containers. On production environment you should remove these volumes.

`flight-app`
node:latest

`flight-db`
postgres:12

`flight-swagger`
swaggerapi/swagger-ui

## Author
Majid Akbari [Linkedin](https://linkedin.com/in/majid-akbari)

## Licence
[MIT](https://choosealicense.com/licenses/mit/)
