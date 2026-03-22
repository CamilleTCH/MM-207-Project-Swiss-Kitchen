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

  noRecipeDescription: {
    [languages.en]: "No description",
    [languages.fr]: "Aucune description"
  },

  noStepDescription: {
    [languages.en]: "No description",
    [languages.fr]: "Aucune description"
  }
}

export const browsePageTranslations = {
  noRecipeDescription: {
    [languages.en]: "No description",
    [languages.fr]: "Aucune description"
  },
  byText: {
    [languages.en]: "By: ",
    [languages.fr]: "Par: "
  },
}

export const errorTranslations = {
  backHomeButton: {
    [languages.en]: "← Back to home",
    [languages.fr]: "← Retour à l'accueil"
  }
}

export const myRecipePageTranslations = {
  noRecipeDescription: {
    [languages.en]: "No description",
    [languages.fr]: "Aucune description"
  },
}


export const editRecipePageTranslations = {
  noRecipeDescription: {
    [languages.en]: "No description",
    [languages.fr]: "Aucune description"
  },

  noStepDescription: {
    [languages.en]: "No description",
    [languages.fr]: "Aucune description"
  },
}




export const getErrorMessageTranslations = {
  generic: {
    [languages.en]: "An error occured",
    [languages.fr]: "Une erreur est survenue"
  },

  notFound: {
    [languages.en]: "The ressource was not found",
    [languages.fr]: "La ressource n'a pas été trouvée"
  },

  conflict: {
    [languages.en]: "Conflict with an existing ressource",
    [languages.fr]: "Conflict avec une ressource existante"
  },

  clientError: {
    [languages.en]: "Your request is not valid",
    [languages.fr]: "Votre requête n'est pas valable"
  },

  serverError: {
    [languages.en]: "An server error occured",
    [languages.fr]: "Une erreur serveur a eu lieu"
  },

  unauthorized: {
    [languages.en]: "No authorization for this",
    [languages.fr]: "Pas d'authorisation pour faire ça"
  }
}