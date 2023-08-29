import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchRecipeById, selectRecipe } from 'redux/recipe/index';

import {
  Section,
  RecipePageHeader,
  RecipeIngredientsList,
  RecipePreparation,
} from 'components';

const Recipe = () => {
  const dispatch = useDispatch();
  const recipe = useSelector(selectRecipe.recipe);

  const location = window.location.pathname.split('recipe/');
  const recipeId = location[1];

  useEffect(() => {
    dispatch(fetchRecipeById(recipeId));
  }, [dispatch, recipeId]);

  window.scrollTo({ top: 0, behavior: 'smooth' });

  const { glass, drink, drinkThumb, ingredients, instructions } = recipe;

  const isFavorite = Math.random() < 0.5;

  return (
    <Section>
      <RecipePageHeader
        glass={glass}
        drink={drink}
        desc={null}
        favorite={isFavorite}
        drinkImage={drinkThumb}
      />
      <RecipeIngredientsList ingredients={ingredients} />
      <RecipePreparation instructions={instructions} />
    </Section>
  );
};

export default Recipe;