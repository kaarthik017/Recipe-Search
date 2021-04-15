// Function to create Title and Searchbar 

function createSearchBar(){
    // Title and Tagline creation 
    
    var jumbotron = createElements('div',' bar');
    var h1 = createElements('h1','heading','Recipe World');
    var p = createElements('h2','tagline','Search for your favorite recipe here!!!');
    jumbotron.append(h1,p);
    document.body.append(jumbotron);
    // Searchbar creation 
    var input = createElements('div','input-group mb-3 input-group-prop');
    var searchbar = createElements('input','form-control','','search');
    searchbar.type = "text";
    searchbar.placeholder = "Enter your search here";
    var button = createElements('div','input-group-append button');
    var buttonElement = createElements('button','btn btn-success btn-lg','Search');
    buttonElement.type = "submit";

    buttonElement.addEventListener('click',generateRecipes);

    async function generateRecipes(){
        try{
        var keyword = document.getElementById('search');
        var key = keyword.value;
        
        var apiCall = await fetch(`https://api.edamam.com/search?q=${key}&app_id=af780cad&app_key=e50df37710aba4e0a0a66fa06d510f59`);
        var apiData = await apiCall.json();
        var app = apiData.hits;
        var containerCheck = document.getElementById('container');
        var contain = loadcontents(app);
        
        if(containerCheck !== null){
            document.body.replaceChild(contain,containerCheck); 

        }
        else{
        document.body.append(contain);

        }
           
        }
        
        catch(err){
            console.log('Data not found'+err);
        }    
    }
    button.append(buttonElement);
    input.append(searchbar,button);
     document.body.append(input);
}

function loadcontents(app){
    var container = createElements('div','container','','container');
    var col1 = createElements('div','col-lg-12');
    
    app.forEach(data => {
       
        var card = createElements('div','card box');
        var row = createElements('div','row no-gutters');
        var col2 = createElements('div','col-md-8');
        var cardBody = createElements('div','card-body');
        var h2 = createElements('div','card-title')
        var h2element = createElements('h2','',data.recipe.label);
        h2.append(h2element);
        var h5 = createElements('div','card-title');
        var h5element = createElements('h5','','Calories: '+Math.round(data.recipe.calories));
        h5.append(h5element);
        var p = createElements('p','para','Ingredients:');
        var ul = createElements('ul','unorderedList');

        data.recipe.ingredientLines.forEach(list =>{
            var li = createElements('li','list-type',list);
            ul.appendChild(li);
        });
        var table = createElements('table','card-table table');
        var thead = createElements('thead');
        var tr = createElements('tr');
        var th = createElements('th','','Vitamin');
        var th1 = createElements('th','','Quantity');
        var tbody = createElements('tbody');
        
        tr.appendChild(th);
        tr.appendChild(th1);
        thead.append(tr);

        var nutrientList = ['ENERC_KCAL','FAT','CA','CHOLE','VITA_RAE','VITC','VITB6A','VITB12','VITD','VITK1'];
        
        var nutrients = data.recipe.totalNutrients;
        
        nutrientList.forEach(list =>{
            var tr1 = createElements('tr');
            var td1 = createElements('td','',(nutrients[list]).label);
            tr1.appendChild(td1);
            var td2 = createElements('td','',Math.round((nutrients[list]).quantity)+' '+(nutrients[list]).unit);
            tr1.appendChild(td2);
            tbody.appendChild(tr1);
         })  
        
           
        table.append(thead,tbody);
        cardBody.append(h2,h5,p,ul,table);
        col2.append(cardBody);
       
        
        var col3 = createElements('div','col-md-4');
        var img = createElements('img','card-img');
        img.src = data.recipe.image;
        var icons = createElements('div','icons');
        
        data.recipe.healthLabels.forEach(list =>{
            var span = createElements('span','badge badge-pill badge-success badges',list);
            
            icons.appendChild(span); 
        })
        
        var hr = createElements('hr');
        var hr1 = createElements('hr');

        var link = createElements('a','btn btn-success link-success','Recipe-Link');
        link.href = data.recipe.url;
        link.target="blank";

        col3.append(img,hr,link,hr1,icons);
        row.append(col2,col3);
        card.append(row);
        col1.append(card);

    });


    container.append(col1);
    return container;
}



function createElements(elem,elemclass="",value="",elemid=""){
    var element = document.createElement(elem);
    element.setAttribute('class',elemclass);
    element.innerHTML = value;
    element.setAttribute('id',elemid);
    return element;
}

createSearchBar();