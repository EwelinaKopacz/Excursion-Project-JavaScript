// I CZEŚĆ: ŁADOWANIE WYCIECZEK

const pickedFile = document.querySelector('.uploader__input');
pickedFile.addEventListener('change', handleFile);
panelExcursions = document.querySelector('.panel__excursions');
excursionsItem = document.querySelector('.excursions__item');

itemTitle = excursionsItem .querySelector('.excursions__title');
itemDescription = excursionsItem .querySelector('.excursions__description');
itemPriceAdult = excursionsItem .querySelector('.excursions__price__adult');
itemPriceChild = excursionsItem .querySelector('.excursions__price__child');
const arrayItem = [itemTitle,itemDescription,itemPriceAdult, itemPriceChild];
console.log(arrayItem);


function handleFile(e){ // F-cja: obsługa wybierania pliku przez użytkownika
    const file = e.target.files[0];
    handleText(file);
}

function handleText(file){ // F-cja pobrany plik czytaj: readAsText
    if(file){
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = handleLoad;
    }
    else{
        alert('Plik nie został wybrany');
    }
}

function handleLoad(e){ // F-cja: pobranie zawartości pliku
    const resultData= e.target.result;
    splitDataAsLines(resultData);
}

function splitDataAsLines(file){ // F-cja: podział tej zawartości na wiersze (wycieczki)
    const lineData = file.split(/[\r\n]+/gm); // - g - Zwracaj wszystkie pasujące fragmenty, a nie tylko pierwszy; - m - Szukaj w tekście złożonym z kilku linii.
    splitDataAsColumns(lineData);
}

function splitDataAsColumns(file){ //F-cja: odział wiersza na poszczególne elementy (id, nazwa itp.)
    const columnData = [];
    const regExp = new RegExp(",(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))");
    for (let i=0; i<file.length; i++) {
        const splitLine = file[i].split(regExp);
        const splitItem = [];
            for (let j=0; j<splitLine.length; j++) {
                splitItem.push(splitLine[j].replace(/^"|"$/g, '')); //Usunięcie quotes na początku i na końcu
                }
        columnData.push(splitItem);
    }
        createNewExcursion(columnData,arrayItem);
        console.log(columnData);
}

function createNewExcursion(columnData,arrayItem){ //F-cja: utworzenie i odpowiednich elementów HTML, dodanie innerText z tablicy i dodanie ich do drzewa DOM 
    let tempText;
    for(let i=0; i<columnData.length; i++){
            const excursionsItemCopy = excursionsItem.cloneNode(true);
            panelExcursions.appendChild(excursionsItemCopy);
            console.log(columnData[i]);

            for(let k=1; k<columnData[i].length;k++){
                console.log(columnData[i][k]);
                tempText=columnData[i][k];
                for(let j=0; j<arrayItem.length; j++){
                    console.log('tu ' + tempText);
                    arrayItem[j].innerText = '';
                    arrayItem[j].innerText = tempText;
                }
            console.log(tempText);
        }
    }
}


//const panelExcursionsChildren = panelExcursions.children;
// for(let j=1; j<panelExcursionsChildren.length;j++){
// console.log(panelExcursionsChildren[j]);
// }


//  columnData.forEach(function(element){
//         excursionsItemCopy = excursionsItem.cloneNode(true);
//         panelExcursions.appendChild(excursionsItemCopy);
//         excursionsItemCopy.classList.remove('excursions__item--prototype');
//     });
//         excursionsItem.classList.add('hide__prototype');
//         // createArray(excursionsItemCopy,columnData);









