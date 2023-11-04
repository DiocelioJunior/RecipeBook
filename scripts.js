document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const recipesContainer = document.getElementById('recipes');
            const selectElement = document.getElementById('drink-type');

            const renderRecipes = (selectedType) => {
                recipesContainer.innerHTML = '';
                data.drinks.forEach(drink => {
                    if (selectedType === 'all' || drink.type === selectedType) {
                        const drinkElement = document.createElement('div');
                        drinkElement.classList.add('recipe');

                        const html = `
                            <h2>${drink.name}</h2>
                            <p>${drink.description}</p>
                        `;
                        drinkElement.innerHTML = html;

                        // Set the background image using CSS
                        drinkElement.style.backgroundImage = `url('${drink.image}')`;
                        drinkElement.style.backgroundSize = 'cover';
                        drinkElement.style.backgroundPosition = 'center';

                        recipesContainer.appendChild(drinkElement);
                    }
                });
            };

            const options = document.querySelectorAll('.list-item');
            options.forEach(option => {
                option.addEventListener('click', function() {
                    const selectedType = option.id;
                    renderRecipes(selectedType);

                    // Remove a classe 'selected' de todos os elementos e adiciona ao elemento clicado
                    options.forEach(item => {
                        item.classList.remove('selected');
                    });
                    option.classList.add('selected');
                });
            });

            renderRecipes('all');
        });
});