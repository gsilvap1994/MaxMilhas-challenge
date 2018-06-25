# MaxMilhas Challenge

<p>Application for MaxMilhas Challenge, including the proposed features for consulting a CPF
in the Blacklist, include a CPF the Blacklist, and other features.</p>


## Table of Contents
- [Getting Started](#getting-started)
- [Setup](#setup)
- [Routes](#routes)

## Getting Started

The projects dependencies includes docker and npm 
- Download [Docker](https://docs.docker.com/docker-for-windows/install/)
- Download [npm](https://www.npmjs.com/get-npm)
- Clone this repository: `git clone https://github.com/gsilvap1994/MaxMilhas-challenge.git`

The next step is the project setup.

## Setup

For accessing the app locally you need to follow the steps:
- Build the container: `docker build -t gsilvap1994/maxmilhas-challenge .`
- Run the image: `docker run -p 49160:3000 -d gsilvap1994/maxmilhas-challenge`


## Routes

The routes acessible in the browser are:
- The route '/' is the route for the form and user interface.
- The route '/blacklist' returns all the cpfs consulted and in the blacklist.
- The route '/status' returns the server status.

