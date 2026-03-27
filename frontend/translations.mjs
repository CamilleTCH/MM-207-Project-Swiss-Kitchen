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

  browseRecipes: {
    [languages.en]: "Browse Recipes",
    [languages.fr]: "Parcourir les recettes"
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

export const userPanelTranslations = {
  editAccount: {
    [languages.en]: "Edit account",
    [languages.fr]: "Modifier le compte"
  },

  username: {
    [languages.en]: "Username: ",
    [languages.fr]: "Nom d'utilisateur: "
  },

  email: {
    [languages.en]: "Email: ",
    [languages.fr]: "Email: "
  },

  newUsername: {
    [languages.en]: "New username",
    [languages.fr]: "Nouveau nom d'utilisateur"
  },

  newEmail: {
    [languages.en]: "New email",
    [languages.fr]: "Nouvel email"
  },

  newPassword: {
    [languages.en]: "New password",
    [languages.fr]: "Nouveau mot de passe"
  },

  saveChanges: {
    [languages.en]: "Save changes",
    [languages.fr]: "Enregistrer les modifications"
  },

  logout: {
    [languages.en]: "Logout",
    [languages.fr]: "Déconnexion"
  },

  deleteMyAccount: {
    [languages.en]: "Delete my account",
    [languages.fr]: "Supprimer mon compte"
  },

  accountUpdateSuccess: {
    [languages.en]: "Account updated successfully.",
    [languages.fr]: "Compte mis à jour avec succès."
  },

  confirmDeleteMessage: {
    [languages.en]: "All your recipes will also be deleted. Are you sure you want to do this ?",
    [languages.fr]: "Toutes vos recettes seront également supprimées. Êtes-vous sûr de vouloir faire cela ?"
  }
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
    [languages.fr]: "Conflit avec une ressource existante"
  },

  clientError: {
    [languages.en]: "Your request is not valid",
    [languages.fr]: "Votre requête n'est pas valable"
  },

  serverError: {
    [languages.en]: "An server error occured",
    [languages.fr]: "Une erreur serveur s'est produite"
  },

  unauthorized: {
    [languages.en]: "No authorization for this",
    [languages.fr]: "Pas d'autorisation pour cela"
  }
}

export const loginTranslations = {
  generic: {
    [languages.en]: "An error occured",
    [languages.fr]: "Une erreur est survenue"
  },
}
export const registerTranslations = {
  title: {
    [languages.en]: "Create an account",
    [languages.fr]: "Créer un compte"
  },
  usernameLabel: {
    [languages.en]: "Username",
    [languages.fr]: "Nom d'utilisateur"
  },
  emailLabel: {
    [languages.en]: "Email",
    [languages.fr]: "Email"
  },
  passwordLabel: {
    [languages.en]: "Password",
    [languages.fr]: "Mot de passe"
  },
  gdprLabel: {
    [languages.en]: "I accept that my username and email address will be stored to manage my account.",
    [languages.fr]: "J'accepte que mon nom d'utilisateur et mon adresse email soient stockés pour gérer mon compte."
  },
  gdprRequired: {
    [languages.en]: "You must accept the data storage policy to create an account.",
    [languages.fr]: "Vous devez accepter la politique de stockage des données pour créer un compte."
  },
  submitButton: {
    [languages.en]: "Create account",
    [languages.fr]: "Créer un compte"
  },
  alreadyHaveAccount: {
    [languages.en]: "Already have account? ",
    [languages.fr]: "Vous avez déjà un compte ? "
  },
  loginLink: {
    [languages.en]: "Login",
    [languages.fr]: "Se connecter"
  }
}

// missing translations in the code are due to bad time managment at the end of the project