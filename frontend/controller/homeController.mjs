import loadView from "../modules/viewLoader.mjs";

import { currentLanguage } from "../global_stuff.mjs";
import { homePageTranslations } from "../translations.mjs";

function homeController(targetApp) {
   render(targetApp); 
}

async function render(targetApp){
    const homeView = await loadView("homeView");
    targetApp.innerHTML = "";
    targetApp.appendChild(document.importNode(homeView.content, true));

    fillTranslations();
}

async function fillTranslations(){
    document.getElementById("home-title").textContent = homePageTranslations.homeTitle[currentLanguage];
    document.getElementById("home-text-1").textContent = homePageTranslations.homeText1[currentLanguage];
    document.getElementById("home-text-2").textContent = homePageTranslations.homeText2[currentLanguage];
}

export default homeController;
