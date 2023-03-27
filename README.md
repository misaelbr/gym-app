# Gympass Challenge

## How to run

```bash
$ docker-compose up -d

$ npm install
$ npx prisma migrate dev # initialize database in development mode
$ npm run start:dev # to run in development mode
```

## How to test

```bash
$ npm run test
```

## Status of implementation of the challenge

### Functional requirements

- [x] should be able to sign up
- [x] should be able to sign in
- [x] should be able to get the authenticated user profile
- [ ] should be able to get the number of checkins of the authenticated user
- [x] should be able to authenticated user get your checkins history
- [ ] should be able to authenticated user find a nearby gym
- [ ] should be able to authenticated user find a gym by name
- [x] should be able to authenticated user check in a gym
- [ ] should be able to validate the check in of a user
- [x] should be able to sign in a gym

### Business rules

- [x] should not be able to sign up with an email already registered
- [x] should not be able make more then 1 check in same day
- [x] should not be able to check-in if the user distance is greater than 100 meters from the gym
- [ ] the check-in only can validate in 20 minutes after the check-in
- [ ] the ckeck-in can be validated by the gym manager
- [ ] the gym only can sign up by the admin users

### Non-functional requirements

- [x] the password of the user must be encrypted
- [x] the data of application must be stored in a databasa (Postgres)
- [x] all data list must be paginated with a maximum of 20 items per page
- [ ] the user must be identified by a JWT token
