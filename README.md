setup:

<code>echo REACT_APP_BASE_URL=https://<YOUR_API_ENDPOINT>/ > .env.local</code>

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Test was changed to Cypress, but haven't really add one.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

---

### notes:

currently I was having issues with you API and eventually the account was locked so currently I'm not able to login or authenticate using it, but before that happens I was able to fetch some data and implement a simple localStorage based auth system with simple http request client

instead of stopping, what I did is create a CRUD that kinda replicates the http based crud, currently it's a auto-generated data for orders and I did some simple data manipulations based on the data to perform CRUD operations

you'll be redirected to signin page once your local dev server is running, you'll notice sign in button

first button (blue) - it authorize and authenticates using http request
second button (pink) - it will bypass the auth system and will process with dummy data to operate

### updated notes:

I refactored the code, the app supposed to be fully functional now, however there is another issue with the API for PUT and DELETE request, for some reason it will return a 500 error, I already debug my parameters and data making sure I met with the requirements, however the error messages does not help me fix the problem

error messages

- [DELETE] - Error deleting the order. Please contact {COMPANY}
- [PUT] - Entity changed, please refresh

I also use Redux with this update via @reduxjs/toolkit
