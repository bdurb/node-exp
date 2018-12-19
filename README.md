# Node Express API 

Interacts with the swapi star wars api.

To run:  

After cloning down project run `npm i` to install dependencies.
run npm start.  This will start nodemon of the index.js on localhost:4000 file (if you dont have nodemon
installed globally, you will need to add it as a dependency)

endpoints:

/people
This returns all of the star wars people. 
You can add a query and sort the data by 3 options
localhost:4000/people/?sortby=[name, weight, mass]

/planets
this returns all planets, with the names of the residents of the planets. 



