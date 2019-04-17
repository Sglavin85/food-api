foodFactory = (foodItem) => {
    return `<div class="card"> 
                <h1>${foodItem.name}</h1>
                    <h2>Country Of Origin: ${foodItem.countryOfOrigin}</h2>
                    <h3>Calories: ${foodItem.calories}</h3>
                    <h3>Fat Per Serving: ${foodItem.fatPerServing}</h3>
                    <h3>Sugar Per Serving: ${foodItem.sugarPerServing}</h3>
                    <p>Ingredients: ${foodItem.ingredients}</p>
             </div>`
}

addFoodToDom = (foodAsHTML) => {
    const el = document.querySelector(".foodList");
    el.innerHTML += foodAsHTML;
}

    fetch("http://localhost:8088/food")
        
        .then(foods => foods.json())
        .then(parsedFoods => {
            parsedFoods.forEach(food => {  
                fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                    .then(response => response.json())
                    .then(productInfo => {
                        food.ingredients = productInfo.product.ingredients_text
                        food.calories = productInfo.product.nutriments.energy_value
                        food.countryOfOrigin = productInfo.product.countries
                        food.fatPerServing = productInfo.product.nutriments.fat_100g
                        food.sugarPerServing = productInfo.product.nutriments.sugars_value
                        console.table(food)
                        console.log(food.ingredients)
                        const foodAsHTML = foodFactory(food)
                        addFoodToDom(foodAsHTML)
                    })
                    
            })
            
            
            
        })
 
