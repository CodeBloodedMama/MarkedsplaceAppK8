# Marketplace App - Exam project for web architecture and orchestration

Marketplace service

## Description

A marketplace application were users can set items for sale and buy items from other users.

## Tech stack

### Checklist

- (+) Lecture 01 - Nodejs, Express, Postman, TypeScript, Nodemon
- (+) Lecture 02 - MongoDB, Mongoose, Microservice, Schemas
- (+) Lecture 03 - Containerisation, Docker, Rancher/DockerDesktop
- (+) Lecture 06 - GraphQL, Apollo Server
- (+) Lecture 07 - GraphQLGQL
- (+) Lecture 10 - RabbitMQ queues, brokers
- (+) Lecture 12 - Monolith to Microservices
- (+) Lecture 16 - Kubernetes Concepts, Local Cluster, OpenLens, kubectl
- (+) Lecture 18 - Kubernetes Basics, pods, services, ingress, yamls
- (+) Lecture 19+20 - Kubernetes Basics part, app+db pod,

### Percentage

Total courses: 23

Applied/partly applied : 19

Percentage: 18/23 = 83%

## Run app locally

We run the app in `watch` mode which allows us to change the code on the fly, so that the containers automatically update and refresh browser:

    $ docker compose watch

## Deploying to cluster

First off, the database connection strings has to be altered in every service that connects to the database (main app and apollo app). Go to the connection strings of these services and comment/uncomment the right connection string. The database connection string might look something like below line, where `10.42.8.150` is the IP of the pod:

    mongodb://10.42.8.150:27017/marketapp

You may need to expose the cluster yaml file (below command applies to Linux):

    $ export KUBECONFIG=~/.kube/kubeconfig.yaml

When running docker compose the images are built locally. These aren't visible to the remote cluster. To make them visible we push them to an online repository on Docker Hub. To do this we first need to tag the image - see below example for the main marketplace image. We tag it with a Docker account name (au618687):

    $ docker tag marketplace-app-marketplace-app au618687/marketplace-app-marketplace-app:latest

Do this to every image you want to push. You can now push the images from Docker Desktop.

Navigate to the `kubernetes` folder in the terminal. Navigate to the subfolder corresponding to the image you want to deploy to cluster and run below command. The cluster looks for the image on Docker Hub and deploys:

    $ kubectl apply -f .
