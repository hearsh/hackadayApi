# hackadayApi

## Introduction
This project provides a view for [hackaday.io](https://hackaday.io) projects and their users. The projects makes use of server side rendering without using ReactJs. Implemented caching inorder to navigate through pages faster.

Provides 10 projects per page, has a read more on each projects if anyone wants to know more about the project. 

All data is fetched from the [hackaday API](https://dev.hackaday.io/doc/api). The project itself only maintains local cache and no database as of now.

It also provides the user with recommendations about projects and users, Recommendations are unique to each browsing session. Recommendations are based tags for users and projects, shows projects similar to projects where users clicks on read more.

## Requirements
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/)
* [nodeJs](https://nodejs.org/en/)

## How to Run This?
* Clone or download the project
* Enter the project directory
* Open your cmd
* Type `yarn` or `npm install`
* Type `yarn start` or `npm start`
* Go to `localhost:3000`
* enjoy browsing and hack away.

## Detailed description on the project
