 - [Creating Local Server](#Creating-a-local-server)  
 - [Loading Static Files](#Loading-static-files-(css/imgs)-with-the-html)  
 - [Node Module Creation](#Node-Module-Exports-and-Passing-Functions/Data-between-Files)  
    - [Multiple Module Functions](#Access-multiple-functions)  
 - [GET Request APIs](#GET-requests-to-APIs)
    - [View API Data](#Viewing-API-data)  
    - [Display API Data](#Displaying-API-data-in-our-website)
    - [Catch User Input](#Catch-user-input-for-API-data)  
    - [Posting Data to API Server](#Posting-Data-to-Mailchimp's-Servers-via-their-API)  
 - [Code Optimization](#Shortening-and-optemizing-code)  




**Express.js** is a **Node.js framework** (*code that somebody else wrote that adds a bunch of features*, like jQuery does to Js) that helps organize and structure our code specifically for web application built with Node.  
It's a **low level language** that allows us to ineract directly with the computer.  

# Creating a local server  
We can create a **server** locally on our computer using Node.js and Express.js  
After we've run  `npm init` and npm `install express` in our working folder we can add this line of code to include this external module which is express:  
```js 
const express = require("express");  
```
then we create a constant called `app` (a function that represents the **express module**, we bind it to the word app)  
```js
const app = express();  
```
we can use the method "`listen`" to tell it to listen to a specific port  
(we use "`node file.js`" in our terminal to bind node to our file.js and make the page work)  
(or just use "`nodemon file.js`" in our terminal insetad which allows us to change the code **live** in our **server**, if you do this there is no need for command "node file.js")  
```js
app.listen(3000); 
```
**3000** is the port listening for any **HTTP** requests coming our way  
We can add a **callback function** to the listen method:  
```js 
app.listen(3000 , function() {  
	console.log("Server started on port 3000");  
}); 
``` 
We can send a **GET** request by accessing that port by typing "**localhost:3000**" into our browser  
Now, since there is **nothing to display**, our server sends an error "**Cannot GET /**"  
To create something to display when we get a **GET request** in our server we can use the *express' method* get:  
```js
app.get("/"); 
``` 
The "**`/`**" stands for the **root route** of our server, the first parameter of the get function tells the get request to which **location** to go to, the root route being our "homepage".  
When the get request happens we can trigger a callback function which can have 2 parameters, (we can name both of them whatever we like, but it's recommended we name then req and res which stand for request and response)  
```js
app.get("/", function(request, response){
	console.log(request);
});  
```
**app.get defines what should happen when somebody makes a get request to** (in our case) **the home route** and then (the second parameter of the get function) tells the server what to do when that request happens. We can console log both the request and the resoponse to see what's inside them.   
We will still get an error in our browser like "local host didn't send any data" or "empty response" because we are still not giving anything for it to display (the console log displays in the terminal).   
We can give it data to display by using the **response object** and the **send method**  
```js
app.get("/", function(request, response){
    response.send("Hello");
}) 
``` 
Now when someone sends a get HTTP request in our port 3000 they will recieve back the word "Hello".  
Instead of just plain text we can also use html  
```js
app.get("/", function(request, response){
    response.send("<h1>Hello world!</h1>");
})  
```
*And usually other programmers prefer to shorten the names request and response with just req and res*  
If we create more pages and wish to display the different information to the user requesting it then we can do so by simply copying and paste the code above and write "/" + the name of the page:  
```js
app.get("/contact", function(request, response){
    response.send("Contact me at: ana@gmail.com");
})  
```
This page can be viewed at the location "**localhost:3000/contact**" when the user makes a request to that route and they will get back "Contact me at: ana@gmail.com"  
`sendFile();` is a function that will send the user a file once they give us a request on a specific route:  
```js
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});  
```
The dir name **(directory name)** is whatever directory **path name** is situated in our computer/users' computer or the cloud + /index.html, example:  
`E:\Ana 2023\Documents\LEARNING\PROGRAMMING\WEB DEV\COURSES\ANGELA\19. Express.js with Node.js\Calculator + "/index.html"`   
So **__dirname** gives us the file's current path location at any given time wherever it is and then we simply add the file's name at the end of the path since __dirname only includes the whole path up to the folder that the file is in but not the file's name itself.  
Now in our html file, if we want to **recieve data from the user** we need to create a **form** then we need to specify the route of where we want that data to be sent to in the "`action = "/"`" (*this for example will send the user and their data to the root route*) and if we use the post method in our form then we must have an `app.post` that listens to that request in our server and responds to it or else we might get a 404 error code:   
```js
app.post("/",  function(req, res){
    res.send("Thank you for sending in your data!");
});
```  
Now to **access** those pieces of information within the **form's inputs** we need to install an *npm package* called **body-parser** which will allow us to process the information that gets send to our post request and give us variables that we can work with from the user's input. 
And since we're passing data from an html form/grab information that gets posted to our server then we need to use urlencoded. We need to also use the "extended: true" so we can be allowed to post nested objects (which we won't use but body-parser forces us to declare). It will look something like this:   
```js
const bodyParser = require("body-parser");          //we are requiring it  
```	
```js
app.use(bodyParser.urlencoded({extended: true}));	//we are declaring it  
```
if we console log the **body** in `app.post` then now we can view the data submitted in the form:  
```js
console.log(req.body); 
```
So with all of that now we are able to do this   
```js
app.post("/", function(req, res){
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;
    res.send("The result is: " + result);
});  
```
*(Where num1 and num2 are the names given to two inputs in our form in the html page)*

# GET requests to APIs  
(If anything below sounds confusing please view my documentation on APIs)  
One way of doing this is by using the native standard node library called `https`. Here is the [documentation](https://nodejs.org/api/https.html#httpsgetoptions-callback).  
We only have to include the module since it's an internal library we do not need to also install it through npm
```js
const https = require('https');
```
In our `app.get` we can finally ask for a GET request to an **external server** holding the **API** :  
```js
app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=635823c4bbb4444c36f1aee94f5a7e75";
    https.get(url, function(response){
        console.log(response.statusCode);
    });
res.send("Server is running");
});  
```
This will console log, after we refresh (/GET request)  the **localhost:3000**, the response's status code into our CLI. If  it's 200 that means everything is working correctly from both client and server side. [Status Code Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) - [Dog version](https://httpstatusdogs.com/)  
Now, to *access the body of the data that's sent to us* from the weatherapp API we need to use `response.on` :  
```js
app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=635823c4bbb4444c36f1aee94f5a7e75";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            console.log(data);
        });
    });
    res.send("Server is running");
});  
```
If we send a GET request now we will find the body's data from the weatherapp API in our terminal in hexadecimal code which is unreadable to the human eye. We must convert it to a **JSON** format (js object) for it to look more like we see it in the API previews :  
``` js
response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
        });  
```
**parse** is what tells the JSON format to go from *straight strings* into an *object structure format*, the contrary of parse would be **stringify**:  
`console.log(JSON.stringify(data)); `  
This is good for when we want to make our JSON formatted data to take as little space as possible.  
## Viewing  API data  
How can we **access** specific strings of **information** from this JSON's data?  
Let's say we want to access the *temperature* which is situated inside the *main indentation*. *(the picture can be achieved by installing "JSON viewer pro" chrome extension and pasting the API pathing in the browser)*    
![](./imgs/api_get.png)  
we can access temperature which is in main with:  
```js
const temp = weatherData.main.temp;
            console.log(temp); 
``` 
An easier way to copy the **path in the indentation** of the JSON formatted data is if we have  'json viewer pro' extension installed in our browser, if we click on temp's data we get the choice to copy it's pathing "main.temp"  

### Displaying API data in our website
The "`res`" is the **response** our server gives to the **client's browser**. Remember, you can only have one "`res.send();`" per "`app.get`". To avoid this limitation we can use `res.write()` instead with whatever we used to put inside of `res.send()`.  
To display the data is pretty simple:  
 ```js
res.write("<h1>The temperature is " + temp + " degrees Celcius.</h1>");  
res.write("<p> The weather is currently " + description + "</p>");  
```
[Link to view openweathermap icons](https://openweathermap.org/weather-conditions#Icon-list) 

## Catch user input for API data
When the user click a submit button within a form we are able to catch that data with a post request :  
```html
<form action="/" method="post">
        <label for="cityInput">City Name:</label>
        <input id="cityInput" type="text" name="cityName">
        <button type="submit">Go</button>
    </form>
```
```js
app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    console.log("Post request recieved");
});
```
Now everytime we click on the "`Go`" submit button we will read "Post request recieved" in our terminal. With body-parser we can also catch the info in the input "`console.log(req.body.cityName);`"  
### Loading static files (css/imgs) with the html 
The bootstrap's stylesheets link will work because it's in a **remote** location (their servers) but our styles.css and other images will not load up because they are **local** to our working folder. To fix this we can use the express function "`static`":  
```js
app.use(express.static("public"));
```  
"*public*" being the folder where we will put all of our **static files** so they can be reffered to by a relative url which is relative to the public folder. With this in mind we do not need to add the "public" in front of our pathing to find our static files that are inside of this folder.  
So instead of:  
`href="public/css/styles.css"`  
it should just be:  
`href="css/styles.css"`
## Posting Data to Mailchimp's Servers via their API
[The documentation for Mailchimp API](https://mailchimp.com/developer/marketing/api/)  
The *unique list ID* tells the mailchimp where we want to put our *subscribers* and the *API key* is associated with our mailchimp account identification which **authorizes** us.  
Since the API gives us back a flatpack json format we can store that type of information dynamically inside of a *js data object*.  
We can then put **key value pairs** inside of the *js data object* (json) that mailchimp is going to recognize.   
Let's create our js data structure:  
``` js
var data ={
    }; 
``` 
Evething inside of "`data`" will be sent as a json formatted string request to the Mailchimp API's server.  
In their documentation we can see that "members" is an object, meaning it can store other properties inside itself such as "email_address" as a string. We can add up to 500 properties meaning we can subscribe 500 members at one click. It's all the same, if it's an object we can store it in square brackets, if it's a string we can store it in curly brackets, whether they can hold more or less properties can be checked in the documentation and to see their specific key value pair names.  The finished code should look like this   
```js
app.post("/", function(req, res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    var data ={
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    };
    const jsonData = JSON.stringify(data);  
});  
``` 
Now all we have to do is to  request (*post*) to the Mailchimp's API by using the [https request (post) function](https://nodejs.org/api/https.html#httpsrequesturl-options-callback)
instead of `https.get` which was used to get data from an **external server**  
The API's endpoint is "`https://<dc>.api.mailchimp.com/3.0/`" and '< dc >' needs to be replaced with the server that was assigned to us in our API key, "`e4badc1a4231ae34ed1016fbf859a9ef-us8`" so mine is "`us8`" making my endpoint `https://us8.api.mailchimp.com/3.0/`  
If we click options (which is an object) in the [https.request (post) documentation](https://nodejs.org/api/http.html#httprequestoptions-callback) we can see how the auth works  

Basically '`user:password`' in our case user can be any type of string (doesn't matter) and the *API key* set as the password   
So our user:password will be '`anamaria1:e4badc1a4231ae34ed1016fbf859a9ef-us8`'  
and the rest you just do it because, here is the finished code  
```js
app.post("/", function(req, res)){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const data ={
        members: [
        { 
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }}]
    };
```
//we stored the data with the specified key value names and put them equal to our unique data fetched from the sign up page  
    const jsonData = JSON.stringify(data);  
//we stringified that js object into a json    
    const url = 'https://us8.api.mailchimp.com/3.0/lists/ba66aca36f';  
// url is equal to our unique endpoint  
    const options = {
        method: "POST",
        auth: "anamaria1:e4badc1a4231ae34ed1016fbf859a9ef-us8"
    }  
//for the https method of "options" we have specified that we wish to use the POST method and how to authenticate ourselves  
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
           console.log(JSON.parse(data)); 
        })
    });  
//we are console logging the parse version of our data, whether this data corrisponds to our js object or uniquely to the https method idk, great  
    request.write(jsonData);
    request.end();
});  
//in order to send that data through the request method we have to save our request in a constant so later on we can use that constant to send things over to the mailchimp's server with "request.write();"   
//so we're passing the json data to the mailchimp server and using request.end(); to specify that we are done with the request   
Now if we put in our info in our  signup.html page we will see a new subscription in our mailchimp account with that exact info, you can check it here:    https://us8.admin.mailchimp.com/lists/members/#p:1-s:25-sa:last_update_time-so:false
You can view all of the code in the folder "Newsletter-Signup"  

# Deploying our Server with Heroku
We are no longer just building static pages so we need to use something that unlike github pages can support that. We need something that can host a server for us. One of the best providers for us is Heroku and you can upload 5 project for free. Here is Heroku's documentation https://devcenter.heroku.com/. Here we can download Heroku, once we do we can type "heroku login" in our CLI to log us in.  
We need to switch from listening to our local port 3000 to process.env.PORT meaning any port that the server (heroku) will define on the go will be used. When we do so, we cannot test on localhost:3000 anymore, and for our test app to work both after deployement and while it's hosted locally on our maschine we can add "process.env.PORT || 3000" in the app.listen.  
Next step is to create a new file and call it "Procfile" with no extension and inside of it we must specify how to start our app and which file contains our server code (aka the root):
web: node app.js  
now we deploy our app to github. While being in our working folder within the terminal we type:  
git init  
then  
git add . 
to add all the files   
git commit -m "First Commit"  
to commit all the changes (message is optional)  
[If you get this error "warning: LF will be replaced by CRLF" then type the following command:  
git config --global core.autocrlf false]  
Next step:  
heroku create   
You can do "heroku update" aswell if you wish to update it to the latest version  
Now we can see the link in the CLI of our website https://morning-eyrie-50531-4c8b029be36a.herokuapp.com/   
git push heroku master  
this will push our local git version to heroku. Now if we give it a few minutes to set up our page then click the previous link we should be able to see our deployed page up and running on the www  
If you've made some typos and wish to update the master branch with the new version you've changed then just follow these commands: "git add." "git commit -m "shitty message of your changes" "git push heroku master"  



Commands
npm install express	-> installs Express.js
We can use nodemon which will automatically refresh our server live to the current most recent code:
npm install -g nodemon
then to activate it in our current folder:
nodemon server.js	-> nodemon will start monitering for changes in our server.js file
npm install body-parser	-> allows us to interact with user post data (form input data)
Express installation guide:
https://expressjs.com/en/starter/installing.html


# Node Module Exports and Passing Functions/Data between Files

If we look into the `node_modules` folder in our working directory we can find the folders that belong to the internal/external modules that we've been using.  
How could we **create** a module of our own from scratch? Let's say we have this function whose whole purpose is to just generate the day we're in in a nice readable format. 
(For this example we'll be using the code from the *To Do List exercise in the EJS section*)
```js
 var today = new Date();

    var options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    };

var day = today.toLocaleDateString("en-US", options);
```
This is a function does not really look good in our code as it's not strictly related to our route, what this function is doing is clutter our `app.js` server.  
To solve this we can create our own module containing this function:
 - Create a new file called *Date.js* and make it into our module that we will use in our root to generate a date by pasting the code inside a function called `getDate` which will only returns the result which is `day`:
 ```js
 function getDate(){
    var today = new Date();

    var options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    };

var day = today.toLocaleDateString("en-US", options);

return day;
}
 ```

  - Now we have to require this module in our *app.js* using `__dirname` in front of the js file containing our module because it's a local file.
  ```js
  const date = require(__dirname + "/date.js");  //we're requiring a module that is located at the current directory name + date.js
  ```  
 - In our *date.js* module we have access to the [module object](https://nodejs.org/dist/latest-v18.x/docs/api/modules.html#the-module-object). The module Object is something that gives us a reference to the **object** that represents our current **module** :
 ```js
 console.log(module);
 ```
  - If we run `node app.js`, triggering the code in date.js to run then we can see in our CLI what is contained inside of the module object.
   - We can use `module.exports` (which is also a js object) which is created by the *Module* system and allows us to say `module.exports` do something or equal to something and in another file we can tap into that module and use some of those exports. Let's  replace the console log line of code with:
   ```js
   module.exports = "Hello World";
   ```
 - If we console log our `date` variable in *app.js* we can see "Hello World" printed in our CLI.
```js
console.log(date);
```
 - If we want to **export** the function `getDate` itself then:
 ```js
 module.exports = getDate;
 ```
 We do not want to add the '( )' because this would **activate** the function inside of our module, but we want to export this function in `app.js` and activate it when we need it
  - Activate module *data.js*' function in our *app.js* 
```js 
console.log(data());
```
This, finally, will print the current date in a nice readable format. We can use it in our root route's `app.get` :
```js
app.get("/", function(req, res){
   
    let day = date();

    res.render("list", {listTitle: day, newListItems: items});
});
```
### Access multiple functions
What if we wish to have more than one function in *date.js*? We can do that by not binding the entire Object to our getDate function, instead we give it a **unique name** getDate:
```js
module.exports.getDate = getDate;
```
We can now create another function right below our first function with it's own unique export name getDay:
```js
module.exports.getDay = getDay;

function getDay(){
    var today = new Date();

    var options ={
        weekday: "long"
    };

var day = today.toLocaleDateString("en-US", options);

return day;
}
```
If we console log our module we can see it has now two functions: getDate and getDay:
```js
console.log(module.exports);
``` 
Now we can run whichever function we please in our *app.js*:
```js
let day = date.getDate();
```
### Shortening and optemizing code
One last touch should regard shortening and optimizing our code:
 - We do not need to set variable `day` equal to something that can be returned by itself && `day` won't be ever be reused:
 ```js
  return today.toLocaleDateString("en-US", options);
```
 - getDate gets typed too much, we can set the function getDate to be an **anonymous function** equal to `module.exports.getDate` and we can remove `module` from `express` since it's already a given
 ```js
 exports.getDate = function (){      //<---
    let today = new Date();

    let options ={
        weekday: "long",
        day: "numeric",
        month: "long"
    };

let day = today.toLocaleDateString("en-US", options);

return day;
}
```
 - We can replace all the `let`/`var` of variables that do not get reassigned with a new value to `const` :
 ```js
 const today = new Date();
 ```
 We can also do this with our arrays, declaring them as a `const`, because another peculiarity of Javascript is that *you cannot add new items in a const array* but *you can push new items unto it*, view more info [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const).  
 ```js
const items = ["Buy Cat Food", "Cook the Cat Food", "Serve my Cat the Cat Food"];
const workItems = [];
```
 `const` also works with objects, whereas *we cannot set them equal to a new object* but *we can change key values inside of an object*, therefore we can declare our objects as `const` if we are only going to change the key values inside 
 ```js
 const item = req.body.newItem;
 ```
