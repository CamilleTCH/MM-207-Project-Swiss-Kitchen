import router from "./modules/router.mjs";
import homeController from "./controller/homeController.mjs";
import recipeController from "./controller/recipeController.mjs";

const app = document.getElementById("app");


router.on("home", () => {
    homeController(app);
});

router.on("recipe", (recipeId) => {
    recipeController(app, recipeId);
});


router.on("not-found", () => {
    errorController(app, "404", "Page not found.")
})


console.log("Script loaded.");

router.start();