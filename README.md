# Project JavaScript Form

## About the project:
In this project I had to add the logical structure using JavaScript. I got a very basic HTML and CSS structure and csv file with two example excursion.

* Hypothetical client after loading a file, should get a two excursion with detailed about them. I had to create the function to handle the file, split the data and remove unnecessary signs using regular expression.

* After choosing the excursion client should type the number of adults and children. In this place, I created functionality to check what kind of data was typed. If data wasn't numbers client see the information about that data was inccorect. If the value will be the number, client get a summary of excursion: number the adults, childen and summary the cost. Client can remove the excursion clicked the sign "x", after that the total cost will be calculated.

* In the last step, client can order the excursion, using order form. In this place I creted functionality to check what kind of data was typed. Name, last name and email is checking using regular expression. If data is incorrect, client will get a message what kind of data is incorrect. When data is fine, client can finish the order and will get confirm the order like: thanks for order, information about total cost of the excursion and information that summary was sent to the email which was typed in order field.


## How to use
Please upload the example.csv file to see how it work. You can find the file in this project.

## Technologies:

* JavaScript
* HTML
* CSS

## Links

* Live Site URL: [E.Kopacz RWD Project](https://ekopacz-rwd-project.netlify.app)

## Solutions
Creating this project I had a opportunity to practice:
* creating code based on few smaller functions
* creating and adding differents types of events
* creating functions to check data in inputs and before sending the form
* adding data to existing HTML structure from csv file


I had opportunity to learn regular expression, for example: how to using regular expression to split data in columns. See the code below:

```
function splitDataAsColumns(file){
    const columnData = [];
    const regExp = new RegExp(",(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))");
    for (let i=0; i<file.length; i++) {
        const splitLine = file[i].split(regExp);
        const splitItem = [];
            for (let j=0; j<splitLine.length; j++) {
                splitItem.push(splitLine[j].replace(/^"|"$/g, ''));
                }
        columnData.push(splitItem);
    }
    createNewExcursion(columnData);
}
```

### Feel free to contact me:

* [Linkedin](https://www.linkedin.com/in/ewelina-kopacz-929559100/)

### Project preview

Mobile
![Project-preview](./assets/preview/screen1.png)

Mobile and tablet
![Project-preview](./assets/preview/screen2.png)

Mobile and tablet2
![Project-preview](./assets/preview/screen3.png)

Desktop
![Project-preview](./assets/preview/screen4.png)

### Thanks for project to Mateusz Bogolubow:
* See: https://github.com/devmentor-pl