document.addEventListener('DOMContentLoaded', function () {
    // Busca o arquivo data.json
    fetch('data.json')
        .then(response => response.json()) // Converte a resposta em JSON
        .then(data => {
            // Obtém o elemento que conterá as receitas
            const recipesContainer = document.getElementById('recipes');
            // Obtém o elemento de seleção de tipo de bebida
            const selectElement = document.getElementById('drink-type');

            // Função para renderizar as receitas com base no tipo selecionado
            const renderRecipes = (selectedType) => {
                // Limpa o conteúdo do recipiente de receitas
                recipesContainer.innerHTML = '';
                // Itera sobre todas as bebidas no arquivo JSON
                data.drinks.forEach(drink => {
                    // Verifica se o tipo selecionado é 'all' ou se corresponde ao tipo da bebida
                    if (selectedType === 'all' || drink.type === selectedType) {
                        // Cria um novo elemento de receita
                        const drinkElement = document.createElement('div');
                        drinkElement.classList.add('recipe');

                        // Cria o HTML interno para o elemento de bebida
                        const html = `
                            <h2>${drink.name}</h2>
                            <p>${drink.description}</p>
                        `;
                        // Define o HTML interno do elemento de bebida
                        drinkElement.innerHTML = html;

                        // Define a imagem de fundo usando CSS
                        drinkElement.style.backgroundImage = `url('${drink.image}')`;
                        drinkElement.style.backgroundSize = 'cover';
                        drinkElement.style.backgroundPosition = 'center';

                        // Adiciona um evento de clique ao elemento de bebida
                        drinkElement.addEventListener('click', () => {
                            openModal(drink);
                        });

                        // Adiciona o elemento de bebida ao recipiente de receitas
                        recipesContainer.appendChild(drinkElement);
                    }
                });
            };

            // Obtém todas as opções de seleção de tipo de bebida
            const options = document.querySelectorAll('.list-item');
            // Adiciona um listener de clique a cada opção
            options.forEach(option => {
                option.addEventListener('click', function () {
                    // Obtém o tipo selecionado com base no ID da opção
                    const selectedType = option.id;
                    // Renderiza as receitas com base no tipo selecionado
                    renderRecipes(selectedType);

                    // Remove a classe 'selected' de todos os elementos e adiciona ao elemento clicado
                    options.forEach(item => {
                        item.classList.remove('selected');
                    });
                    option.classList.add('selected');
                });
            });

            // Renderiza as receitas inicialmente com o tipo 'all'
            renderRecipes('all');
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
        <div class="image-container">
            <img src="${drink.image}" alt="${drink.name}">
        </div>
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
