document.addEventListener('DOMContentLoaded', function () {
    // Busca o arquivo data.json
    fetch('data.json')
        .then(response => response.json()) // Converte a resposta em JSON
        .then(data => {
            // Obtém uma lista de todas as receitas disponíveis
            const allRecipes = data.drinks;
            // Embaralha as receitas para garantir uma ordem aleatória
            const shuffledRecipes = allRecipes.sort(() => Math.random() - 0.5);
            // Seleciona 3 receitas aleatórias
            const selectedRecipes = shuffledRecipes.slice(0, 3);

            // Obtém o elemento que conterá as receitas
            const recipesContainer = document.getElementById('recipes');

            // Exibe as receitas sorteadas
            selectedRecipes.forEach(drink => {
                // Cria um novo elemento de receita
                const drinkElement = document.createElement('div');
                drinkElement.classList.add('recipe');

                // Define a imagem de fundo usando CSS
                drinkElement.style.backgroundImage = `url('${drink.image}')`;
                drinkElement.style.backgroundSize = 'cover';
                drinkElement.style.backgroundPosition = 'center';

                // Cria o HTML interno para o elemento de bebida
                const html = `
                    <h2>${drink.name}</h2>
                    <p>${drink.description}</p>
                `;
                // Define o HTML interno do elemento de bebida
                drinkElement.innerHTML = html;

                // Adiciona um evento de clique ao elemento de bebida
                drinkElement.addEventListener('click', () => {
                    openModal(drink);
                });

                // Adiciona o elemento de bebida ao recipiente de receitas
                recipesContainer.appendChild(drinkElement);
            });
        })
        .catch(error => console.error('Ocorreu um erro ao buscar os dados:', error));

    // Função para abrir o modal com as informações detalhadas da receita
    const openModal = (drink) => {
        // Crie um elemento de modal
        const modal = document.createElement('div');
        modal.classList.add('modal');

        // Crie o HTML interno do modal com base nos dados da receita
        const html = `
            <h2>${drink.name}</h2>
            <img src="${drink.image}" alt="${drink.name}">
            <p><strong>Tipo:</strong> ${drink.type}</p>
            <p><strong>Descrição:</strong> ${drink.description}</p>
            <p><strong>Ingredientes:</strong> ${drink.ingredients.join(', ')}</p>
            <p><strong>Instruções:</strong> ${drink.instructions}</p>
            <button onclick="closeModal()">Fechar</button>
        `;

        // Define o HTML interno do modal
        modal.innerHTML = html;

        // Adiciona o modal ao corpo do documento
        document.body.appendChild(modal);
    };

    // Função para fechar o modal
    const closeModal = () => {
        // Remove o modal do corpo do documento
        const modal = document.querySelector('.modal');
        document.body.removeChild(modal);
    };

    
    // Adicione a função closeModal ao objeto global (window)
    window.closeModal = closeModal;
});