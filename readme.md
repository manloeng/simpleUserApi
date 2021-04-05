# Simple User API

A simple user api written with node.js (express.js)

The has been deployed and can be seen on: https://simple-user-api.vercel.app/api/users

# The Mission

The main user features that are currently included in this app are the ability to:

- Get Users details
- Get User details
- Add User
- Update User details
- Delete User

# Crud Routes

The main user features that are currently included in this app are the ability to:

- GET: /api/users - get all users
- POST: /api/users - create a user
- GET: /api/users/:id - get a single user
- PATCH: /api/users/:id - update a single user
- DELETE: /api/users/:id - delete a single user

## Step 1 - Setting up your own repository

Clone the repo:

```
git clone https://github.com/manloeng/simpleUserApi
```

Once you have cloned the repo, you should have the repo on your system.

You will need to install the required modules to run the app successfully

## Step 2 - Update the env.example

You will need to add the mongodb uri in order to test this app.

Once you have signed up, please rename the `env.example` file to `.env` and change the uri key

example:

```
"uri": "<mongo:<user>:<password>@cluser.....>"
```

## Step 3a - Running this app via docker

On your terminal where your cloned project is located at you will need to run:

```
docker-compose up
```

This should get the app up and running and it can be viewed on http://localhost:3030

## Step 3b - How to run this app locally

On your terminal you will want to run:

```
npm install
```

or

```
yarn
```

This will install all the modules that are listed in the package.json

Once you have the modules installed, you will need to start the app.

```
yarn start

```

This should get the app up and running and it can be viewed on http://localhost:3030

# Testing the App

## Step 1 - Update the secret.example.json (for testing)

You will need to add the mongodb uri in order to test this app.

Please rename the `secret.example.json` file to `secret.json` and change the uri field

example:

```
"uri": "<mongo:<user>:<password>@cluser.....>"
```

To test the app you can now run:

```
yarn test
```
