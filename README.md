# Github Visualizer CSU33012

Integrating the [GitHub REST API](https://docs.github.com/en/free-pro-team@latest/rest) into a visualization of an aspect(s) of the measurement of the software engineering process. This visualization is using [Chart.js](https://www.chartjs.org/) to visualize repository size in kilobytes (KB) and the language per repository.

## Prerequisites

You should have [Docker](https://www.docker.com/) installed on your machine before running this project.

If you do not have Docker, you can install it [here](https://www.docker.com/products/docker-desktop)

In order to access an increased amount of data, you will need a **personal access token**, which you may find [here](https://github.com/settings/tokens). You can find more information about personal access tokens [here](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).

## Installation

In order to run this project, you must clone the repository with the following git command:
```
git clone https://github.com/hamza-mughees/GitHub-Visualizer.git
```
`cd` into this folder and build the docker image for the server with the following command:
```
docker build -t github-visualizer
```
Run the server on port 5500 with the following command:
```
docker run -d --name github_visualizer -p 55:00 github-visualizer
```

## Deployment

Visit `localhost:5500` to view the project.

## Usage

In order to visualize a GitHub profile, you will need the following:

- The github **username** of the user
- The **personal access** token of the user

The personal access token isn't a requirement. However, it increases the rate limit when fetching data. Without it, the request might not be responded to with relevant data.