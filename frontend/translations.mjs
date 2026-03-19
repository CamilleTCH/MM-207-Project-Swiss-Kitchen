import { languages } from "./global_stuff.mjs";

export const homePageTranslations = {
  homeTitle: {
    [languages.en]: "Welcome to Swiss Kitchen 🇨🇭",
    [languages.fr]: "Bienvenue sur Swiss Kitchen 🇨🇭"
  },
  homeText1: {
    [languages.en]: "Swiss Kitchen is a place to share your favourite recipes with the world.",
    [languages.fr]: "Swiss Kitchen est un endroit pour partager vos recettes favorites avec le monde."
  },

  homeText2: {
    [languages.en]: "Browse recipes from other users, or create an account to share your own.",
    [languages.fr]: "Parcourez les recettes d'autres utilisateurs, ou créez un compte pour partager les vôtres."
  },
};


export const recipePageTranslations = {
  typeText: {
    [languages.en]: "Type: ",
    [languages.fr]: "Type: "
  },
  difficultyText: {
    [languages.en]: "Difficulty: ",
    [languages.fr]: "Difficulté: "
  },
  byText: {
    [languages.en]: "By: ",
    [languages.fr]: "Par: "
  },
  stepsH2: {
    [languages.en]: "Steps: ",
    [languages.fr]: "Étapes: "
  },

  noStepDescription: {
    [languages.en]: "No description",
    [languages.fr]: "Aucune description"
  }
}



export const errorTranslations = {
  backHomeButton: {
    [languages.en]: "← Back to home",
    [languages.fr]: "← Retour à l'accueil"
  }
}
