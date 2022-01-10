# JavaScript Form - Excursion Project

## About the project:
In this project I had to add the logical structure using JavaScript. I had to plan all the functionality and decided what steps should I take to make it work. I got a very basic HTML and CSS structure and CSV file with two example excursion.

* Hypothetical client after loading a file, should get a two excursion with detailed about them. I had to create the function to handle the file, split the data and remove unnecessary signs using regular expression.

* After choosing the excursion client can type the number of adults and children. In this place, I this step I created functionality to check what kind of data was typed. If data wasn't numbers client see the information about the wrong value. If the value will be the number, client get a summary of excursion: number the adults, childen and cost. Client can remove the excursion clicked the sign "x", after that the total cost will be calculated.

* In the last step, client can order the excursions using order form. In this step I creted functionality to check what kind of data was typed. Name and last name should contains only characters. Email is checking using regular expression /^[-\w.]+@([-\w]+.)+[a-z]+$/i. If data is incorrect, client will get an alert what kind of data should change. If data is fine, the order is finish and client will get the confirm with information:
    * "thank you for the order"
    * about total cost of the excursion
    * that summary was sent to the email which was typed in order field.


## How to use
Please upload the example.csv file to see how it work. You can find the file in this project.

## Technologies:

* JavaScript
* HTML
* CSS
* Desktop only version

## Links

* Live Site URL: [E.Kopacz JS Form Excursion Project](https://ekopacz-js-form-project.netlify.app)

## Solutions
Creating this project I had a opportunity to practice:
* creating code based on a few smaller functions
* creating and adding differents types of events
* creating functions to check if data in inputs and correct before sending the form
* adding data to existing HTML structure from CSV file
* how to bind event listeners to dynamically-created elements in JavaScript
* how to add CSV file to the website and how to using FileReader() object

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

FileReader() object:

```
function handleText(file){
    if(file){
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = handleLoad;
    }
    else{
        alert('Plik nie został wybrany');
    }
}
```

### Feel free to contact me:

* [Linkedin](https://www.linkedin.com/in/ewelina-kopacz-929559100/) - Ewelina Kopacz

### Project preview

Added excursions to the summary
![Project-preview](./assets/preview/screen1.png)

Order form validation
![Project-preview](./assets/preview/screen2.png)

### Sources:
* [Typeofnan.dev](https://typeofnan.dev/how-to-bind-event-listeners-on-dynamically-created-elements-in-javascript/) - event listeners to dynamically-created elements in JavaScript
* [Codegrepper.com](https://www.codegrepper.com/code-examples/javascript/REMOVE+all+children+from+div+javascript) - how to remove all children
* [Pretagteam.com](https://pretagteam.com/question/remove-quotes-from-array-javascript) - how to remove quotes from array using regular expressions
* [Web Dev Simplified](https://www.youtube.com/watch?v=rhzKDrUiJVk&t=113s) - amaizing video about regular expressions


### Thanks for project and support to Mateusz Bogolubow:
* Mentor i Trener Programowania JavaScript - [See a website](https://devmentor.pl/) - Mateusz Bogolubow