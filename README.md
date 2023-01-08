# QG

QG is a feature rich quiz game written in Typescript. the main idea of creating this project is implementing an infrastructure for up and running system with some of the latest technologies in Typescript.

## Summary

First I will try to introduce the whole concept of the project. As I've stated before this project is about a 2 player quiz game. People can create accounts and start requesting to play with other people. For each turn one of the players will be asked to select one category from categories suggested to him and after the selection is done, he will receive 3 questions that should be answered in less than 90 seconds. the same questions will be sent to the other player after the first player turn is over and after that the second player should decide what categories should the questions be of. the users can even upload the questions if they find some questions interesting but an admin should confirm whether the mentioned questions is suitable for the game or not.

## Structure of Project

In this project I tried to stick to Clean Architecture and DDD principles. the structure of project is as follows:

- **`Domain Layer`:** The entities of the project are in the folder, most of the business logic is implemented here
- **`Infra Layer`**: The infrastructure classes like database connections or redis connections are implemented here. for this layer I decided to used repository and unit of work patterns as well
- **`Service Layer`**: This Layer is used as a worker and abstractions for the upper layers and to seperate the application layer from Infra layer for decoupling this two parts of the projects
- **`App Layer`**: This Layer is for handling the users requests and responses and building up the projects

## Backbones

- **Web FrameWork**: For this project I've decided to used the best Node.js backend framework NestJS. Tons of features are provided in this framework out of the box which makes it easy for developing a system from scratch. The dependency Injection tool, Guards, support for both Express and Fastify, Data Validation and compatibility with a lot of tools like redis are just a bunch of cool features this framework gives you.
- **ORM**: As for the ORM, I decided to go with TypeORM. I tried to keep my domain layer as pure as possible and I don't really like Active Record pattern cause I believe it doesn't necessary follows neither DDD nor SOLID. when you tell your method to save it self it actually perform some transactions on the database which I believe is not the responsibility of any model in my project at least. thats why I decided to go with the repository pattern which is well supported by Typeorm. another feature that I like a lot in this orm is that you can completely separate your schema of the database and the entities of your domain which I believe is close to DDD compared to other ORMS like Sequelize.
- **Database**: My goto database is PostgreSQL. the out-of-the-box supports for different data types such as json, dates and arrays(the most cool one in my opinion :)) ) is why I decided to used it as one of the backbones of my projects

## Features

In this part I will try to summarize some of the works I've done for this project. Many of the systems that are run across the world be ran in a cluster mode for maximum output and I've decided that maybe It would be a good idea for this project. for this purpose I've used PM2 Package which could run multiple instances of your application, check their status and would balance the load on them. everything that this package do is great, but in some conditions it might cause race condition in this application which wouldn't be the case if the application was not run in a cluster environment due to the single threaded event loop of NodeJS. Now about the scenario that this race condition would happen. I've decided to use a queue for store the games which there haven't been any other players to join. if a user wants to play a game first i will check the queue to see wether there is any games in this queue which he is not a part of or not. if there was he will join the mentioned game, otherwise a new game will be created for him. now accessing this queue in a cluster environment would create a race condition and the solution to this problem would be to use a distributed lock which I decided to go with RedLock. one of the reasons that i decided to go with this options was because I was already using Redis for caching and for the queue that I've previously talked about and it offered all I wanted so no extra complexity was added to the project.

##Installation
I've written the dockerfile and docker-compose file for these project so all you have to do to run this project in your own system is run 2 commands

```sh
    sudo docker-compose build
    sudo docker-compose up -d
```
