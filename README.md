# Need A Puppy? Take A Puppy!

Now deployed on Github Pages!

[Need A Puppy Take A Puppy](https://keith-flynn.github.io/pet-adoption-website-frontend/)

## About My Pet Adoption Website

### A mock website to adopt your next adorable dog or cat.

Built using HTML, CSS, and JavaScript to serve the frontend on your browser, and Node.js and Express.js as a RESTful API server, Need A Puppy Take A Puppy offers up results for your potential pet adoptions. With responsive displays designed for mobile devices, tablets, and desktop web browsers, users can utilize NAPTAP's robust filtering options to find the perfect fuzzy friend for your family today!

## To Run

 - Clone the repository 
   - `git clone https://github.com/keith-flynn/pet-adoption-website.git`
 - Change directory to newly cloned repo
   - `cd pet-adoption-website`
 - Install Node
   - `npm install`
 - Start the server using Node
   - `node index.js`
 - Launch index.html using [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
   - In Visual Studio Code, right click either anywhere inside of the opened index.html file, or right click on index.html itself in the file explorer of VS Code. Select "Open with Live Server [Alt+L Alt+O]"

If you do not already have Node installed on your system, it can be downloaded from the official [download page](https://nodejs.org/en/download)

## Features

:warning: If you are grading this project, [Check Here!](https://github.com/keith-flynn/pet-adoption-website/tree/main/project-review) :warning:

### Front End

 - Search filter dropdowns are populated dynamically at page load and with the switch of the dog/cat toggle (doggle)
 - Toggle selection of dog or cat persists between page visits in local storage.
 - Input in the search field is sterilized to only include alphanumeric
 - An appealing loading screen while the user briefly waits for results
 - Beautifully displayed pet results that dynamically shift depending on the viewing device (Mobile and Desktop)
 - A scroll to top button for when your search returns a mountain of fuzzy friends
 - A perfect Lighthouse score (if you disable google fonts)

### Back End
 - Robust error handling and logging system
 - Serve data based on ID, type (dog/cat), breed, size, age, gender, color, and/or name
 - Modular files can be [swapped](https://github.com/keith-flynn/pet-adoption-website/tree/mongo) to serve MongoDB Atlas Cloud
 - Wrap responses in industry standard JSON envelope format

## Resources

Logos generated using [Adobe Express Logo Maker](https://express.adobe.com/express-apps/logo-maker/preview)

Color scheme at [Colorhunt.com](https://colorhunt.co/palette/1b262c0f4c753282b8bbe1fa)

All of this was made possible by [Petfinder.com](https://www.petfinder.com/) We thank them for their efforts in finding homes for all of these little goofballs as well as helping developers learn RESTful API usage at scale in a live environment.

[Petfinder API Documentation](https://www.petfinder.com/developers/v2/docs/)

[deploy-replit](https://github.com/keith-flynn/pet-adoption-website/tree/deploy-replit) branch middleware is served by [Replit.com](https://replit.com/)