<p align="center">
  <img src="https://raw.githubusercontent.com/Aram47/cyber-bounty-backend/main/icons/logo.png" width="250" alt="Your Logo" />
</p>


[//]: # ([circleci-url]: https://circleci.com/gh/nestjs/nest)

# Requirements

- NodeJS
- GNU Make
- Docker

## Documentation

There is a swagger documentation at http://localhost:1488/doc 
(assuming you're running the server on port 1488)

## Optional
- IPFS daemon (if you need to use the server alongside with frontend part)

# 💀 Important 
```bash
$ make remove_all # translates to `sudo docker system prune -a` which will erase all your systems docker containers, so be careful
```

## Compile and run the project
```bash
$ make npm
$ make
```

## Alternative options
```bash
$ make start # start the containers
$ make stop # stop the containers
$ make up_background # run the server in the background
$ make down # shut down the containers
$ make hard_down # same as make down but with `-v` options which drops the volumes
$ make info # same as sudo docker system df
$ make re # WARNING make remove_all && make 
```

## Core Maintainers
- [Aram Minasyan](https://www.linkedin.com/in/aram47/)
- [Tigran Petrosyan](https://www.linkedin.com/in/tigran-petrosyan-091a5630a/)
- [Mariia Khachaturova](https://www.linkedin.com/in/mariia-khachaturova-27165b271/a/)
- [Tigran Yavroyan](https://www.linkedin.com/in/tigran-yavroyan-bb78a5280/)
- [Artyom Amirkhanyan](https://www.linkedin.com/in/artyom-amirkhanyan-b951b52a7/)

## License

This project is [GPL3 licensed](https://github.com/Aram47/cyber-bounty-backend/blob/main/LICENSE).
