# Harborsiderx app backend
Its a back-end server of harborsiderx app. follow the instructions to run the server

# Prerequisites
    - node v16.10.0
    - postgres (you can configure the database & schema name in .env just make sure both exist in your system)

# Setting up project for dev
    database can be configured using `.env`
        install node modules
            - `npm install`
        run migrations
            - `npm run migration:up:dev`
        run seeds
            - `npm run make:seed:dev -x ts`

# Run directly
    run server local
        - `npm run local`

# Build and run
    build project
        `npm run build`
    run built project as local
        `npm start`
    run built project as dev
        `npm run start:dev`
    run built project as staging
        `npm run start:staging`
    run built project as prod
        `npm run start:production`

# Formatting the project
    format project
        `npm run format`