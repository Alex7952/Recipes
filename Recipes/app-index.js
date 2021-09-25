// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js'
$( function() {

  

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAYdZYFCc4156W4lE4wMDwtaYjjfNgRdHU",
    authDomain: "ultimaterecipes-38001.firebaseapp.com",
    projectId: "ultimaterecipes-38001",
    storageBucket: "ultimaterecipes-38001.appspot.com",
    messagingSenderId: "619128997408",
    appId: "1:619128997408:web:d62f5dab9e99eee4e91e45"
  };

  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);
  const firestore1 = getFirestore(firebaseapp);

  

  var makeRow = function(table, rowData){
      var row = table.insertRow(-1);
      rowData.forEach(function(item){
          var cell = document.createElement('td');
          cell.innerHTML = item;
          row.appendChild(cell);
      });
    };

    var makeTable = function(){
        var table = document.createElement('table');
        table.className = "table table-bordered";
        return table;
    };

    $("#add_button").click(function(){
        addDoc(collection(firestore1, "recipes"), {
            recipe_title:$("#recipe_title").val(),
            ingredient_one:$("#ingredient_one").val(),
            ingredient_two:$("#ingredient_two").val(),
            ingredient_three:$("#ingredient_three").val(),
            ingredient_four:$("#ingredient_four").val()
        })
        .then(function(docRef){
          console.log("Document written with ID ", docRef.id);
          $("#add_recipes")[0].reset();
        })
        .catch(function(error){
          console.error("Error adding document: ", error);
        });
       
    });
    $("#show_button").click(function(){
        var table = makeTable();
        var recipes = [];
        recipes.push(["Recipe Title", "Ing1", "Ing2", "Ing3", "Ing4"]);
        getDocs(collection(firestore1, "recipes"))
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                var data = doc.data();
                recipes.push([data.recipe_title, data.ingredient_one, data.ingredient_two, data.ingredient_three, data.ingredient_four]);
            });
        })
        .then(function(){
            recipes.forEach(function(rowData){
                makeRow(table, rowData);
            });
        });
        var recipeDiv = document.getElementById("recipe_data");
        recipeDiv.innerHTML = "";
        recipeDiv.appendChild(table);
    });

} );