const CACHE_NAME = "swiss-kitchen-v1"

const SHELL_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./app.mjs",
    "./manifest.json",
    "./global_stuff.mjs",
    "./translations.mjs",
    "./user-panel.mjs",
    "./modules/http.mjs",
    "./modules/fetchManager.mjs",
    "./modules/viewLoader.mjs",
    "./modules/findElement.mjs",
    "./modules/router.mjs",
    "./modules/getErrorMessage.mjs",
    "./controller/navController.mjs",
    "./controller/homeController.mjs",
    "./controller/browseController.mjs",
    "./controller/recipeController.mjs",
    "./controller/myRecipesController.mjs",
    "./controller/createRecipeController.mjs",
    "./controller/editRecipeController.mjs",
    "./controller/userController.mjs",
    "./controller/loginController.mjs",
    "./controller/registerController.mjs",
    "./controller/errorController.mjs",
    "./view/navView.html",
    "./view/homeView.html",
    "./view/browseView.html",
    "./view/recipeCardView.html",
    "./view/recipeView.html",
    "./view/recipeStepView.html",
    "./view/myRecipesView.html",
    "./view/myRecipeItemView.html",
    "./view/createRecipeView.html",
    "./view/editRecipeView.html",
    "./view/stepFormView.html",
    "./view/userView.html",
    "./view/loginView.html",
    "./view/registerView.html",
    "./view/errorView.html",
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
    )
})

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            )
        )
    )
})

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url)

    if (url.pathname.startsWith("/api/")) {
        event.respondWith(fetch(event.request))
        return
    }

    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    )
})