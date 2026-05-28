document.addEventListener("DOMContentLoaded", () => {
    const loadArticles = async () => {
        const response = await fetch("articles.json");
        const articles = await response.json();

        const articleContainer = document.querySelector(".article-cards");
        const articlePage = document.querySelector("#article-content");

        if (articleContainer) {
            articles.forEach(article => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <a href="article.html?id=${article.id}">Read more</a>
                `;
                articleContainer.appendChild(div);
            });
        }

        if (articlePage) {
            const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            const article = articles.find(a => a.id === id);

            if (article) {
                document.querySelector("#article-title").textContent = article.title;
                document.querySelector("#article-date").textContent = article.date;
                document.querySelector("#article-tags span").textContent = article.tags.join(", ");
                document.querySelector("#original-link").href = article.originalUrl;
                document.querySelector("#article-content").textContent = article.content;
            } else {
                document.querySelector("#article-content").textContent = "Article not found.";
            }
        }
    };

    loadArticles();
});