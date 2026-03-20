import router from "./modules/router.mjs";
import homeController from "./controller/homeController.mjs";
import recipeController from "./controller/recipeController.mjs";
import browseController from "./controller/browseController.mjs";
import navController from "./controller/navController.mjs";
import errorController from "./controller/errorController.mjs";
import registerController from "./controller/registerController.mjs";
import loginController from "./controller/loginController.mjs";
import userController from "./controller/userController.mjs";

const app = document.getElementById("app");


router.on("home", () => {
    homeController(app);
});

router.on("browse", () => {
    browseController(app);
});

router.on("recipe", (recipeId) => {
    recipeController(app, recipeId);
});

router.on("login", () => {
    loginController(app);
});

router.on("register", () => {
    registerController(app);
});

router.on("user", () => {
    userController(app);
});

router.on("not-found", () => {
    
    errorController(app, "404", "Page not found.")
})

navController();
router.start();