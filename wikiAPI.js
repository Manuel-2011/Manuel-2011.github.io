// Fetch a summary info from wikipedia for types.html page

//api url
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";

// function to fetch the summary info
function getSummaryInfo(name) {
    fetch(wikiUrl + name)
      .then(res => res.json())
      .then((res) => {
          res.typeName = name;
          return res
        })
      .then(InsertHTML)
}

// function to insert the summary info into the html
function InsertHTML(data) {
    const newDiv = document.getElementById('summary');
    const typeName = data.typeName;
    const summary = data.extract;
    const imgSource = data.thumbnail.source;
    const fullUrl = data.content_urls.desktop.page;
    const divContent = `
    <h2>${typeName}</h2>
    <p>${summary}</p>
    <img src=${imgSource}>
    <p>Learn more about <a href=${fullUrl} target="_blank">${typeName} ice cream</a></p>
    `;
    newDiv.innerHTML = divContent;
}

// eventlistener that when the value of the select tag is changed or when the html is loaded triggers the api
document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("select-form");
    let typeName = select.value
    getSummaryInfo(typeName);
    select.addEventListener('change', (e) => {
        typeName = select.value;
        getSummaryInfo(typeName);
    });
})

