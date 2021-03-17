# rakuten

This is my solution for the Rakuten test.
This app is made without using any boilerplate or thirdparty library. It is used with pure css, React and Webpack as a development server.
Node modules are not included.
To install all dependencies: npm install
To run use: npm start

Code lines are commented.
Thank you!

Gotchas:
-Adding a Loading state spinner and style it instead of "Loading.." plain text.
-Error handling when we can't retrieve the desired information to display the movies because api is not available with hidding the affected component.
-Error handling when we can't connect to the api server with a properly styled message on the screen.
-Integrating with redux in a next version so we can handle better all the states and data.
-Using cypress for testing the whole app.
-Use express as development server and webpack as a middleware.
-Add the Rakuten fav-icon.
