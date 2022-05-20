# Friender

## Dev setup

### Frontend
- `$ cd frontend`
- `$ npm install`
- `$ npm run dev`

Frontend runs on http://localhost:3001/

### Backend
- `$ cd backend`
- `$ npm install`
- `$ npm run dev`

API calls can be made to http://localhost:3002/

## Prod setup

### Server setup
Clone the repo. In the repo folder:
- `$ cd backend`
- `$ npm install`
- `$ pm2 start ecosystem.config.js --watch --ignore-watch="node_modules" --env production`
- `$ cd ../frontend`
- `$ npm install`
- `$ pm2 start ecosystem.config.js --watch --ignore-watch="node_modules" --env production`

Frontend runs on http://ec2-3-82-51-192.compute-1.amazonaws.com/

### Server update
To update the server, pull repo changes.
