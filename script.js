// --- OOPS: Recipe Class Definition (Requirement 1) ---
class Recipe {
    constructor(id, title, time, rating, imageUrl) {
        this.id = id;
        this.title = title;
        this.time = time;
        this.rating = rating;
        this.imageUrl = imageUrl;
    }

    // Method to generate the HTML for a card
    toHTML() {
        return `
            <a href="recipe_detail.html?id=${this.id}" class="recipe-card-dynamic">
                <img src="${this.imageUrl}" alt="${this.title}" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x180?text=Recipe+Image'">
                <div class="recipe-info">
                    <h3>${this.title}</h3>
                    <p>🕒 ${this.time} | ⭐ ${this.rating}</p>
                    <button class="view-btn">View Recipe</button>
                </div>
            </a>
        `;
    }
}
// ----------------------------------------

document.addEventListener('DOMContentLoaded', () => {

    // Function to display all recipes in the dedicated container (used by categories.html)
    function displayRecipes(recipes) {
        const container = document.getElementById('recipeListContainer');
        if (!container) return;

        let htmlContent = '';
        
        if (recipes && recipes.length > 0) {
            recipes.forEach(recipeData => {
                // OOPS Implementation: Creating an Object and calling its Method
                const recipeObject = new Recipe(
                    recipeData.id, 
                    recipeData.title, 
                    recipeData.time, 
                    recipeData.rating, 
                    recipeData.image_url
                );

                htmlContent += recipeObject.toHTML();
            });
            
            container.innerHTML = htmlContent;
            container.classList.add('dynamic-recipe-grid');
            
        } else {
            container.innerHTML = '<p style="text-align:center; padding: 50px; color:#333;">No recipes found in the database.</p>';
        }
    }


    // --- 1. DATA FETCHING (JSON Loading for Requirement 2) ---
    function fetchAndRenderRecipes() {
        const API_ENDPOINT = 'recipes.json'; 

        fetch(API_ENDPOINT)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load recipe data from JSON file.');
                }
                return response.json();
            })
            .then(data => {
                console.log("SUCCESS: Recipes loaded from JSON Mockup. Total Recipes:", data.recipes.length);
                
                // Display the recipes on the Categories/Discover page
                displayRecipes(data.recipes);

            })
            .catch(error => {
                console.error("ERROR: Could not fetch data:", error);
                const container = document.getElementById('recipeListContainer');
                if (container) {
                    container.innerHTML = '<p style="text-align:center; padding: 50px; color:red;">Error loading data. Check console.</p>';
                }
            });
    }

    fetchAndRenderRecipes(); 


    // --- 2. ADD RECIPE FORM SUBMISSION ---
    const recipeForm = document.querySelector('#addRecipeForm');

    if (recipeForm) {
        recipeForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = {
                title: document.getElementById('title').value,
                category: document.getElementById('category').value,
                ingredients: document.getElementById('ingredients').value, 
                prepTime: document.getElementById('prep-time').value,
                cookTime: document.getElementById('cook-time').value,
                instructions: document.getElementById('instructions').value,
            };

            console.log("New Recipe Data (JSON object ready for submission):", formData);

            alert(`SUCCESS! Data (JSON) is packed and ready for submission.`);
            recipeForm.reset(); 
        });
    }


    // --- 3. HOMEPAGE SEARCH FUNCTIONALITY ---
    const searchInput = document.querySelector('.search-box-new input');
    const searchButton = document.querySelector('.search-box-new button');

    if (searchButton && searchInput) {
        function handleSearch() {
            const query = searchInput.value.trim();
            if (query.length > 2) {
                alert(`Searching the recipes using query: "${query}"`); 
            } else {
                alert('Please enter at least 3 characters to search.');
            }
        }
        
        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // --- 4. NAVIGATION FIX (Fallback for Dropdown Click) ---
    const profileBtn = document.querySelector('.profile-btn');
    const dropdown = document.querySelector('.dropdown-content');

    if (profileBtn && dropdown) {
        profileBtn.addEventListener('click', (e) => {
            const isVisible = dropdown.style.display === 'block';
            dropdown.style.display = isVisible ? 'none' : 'block';
            e.stopPropagation();
        });
        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    }
});