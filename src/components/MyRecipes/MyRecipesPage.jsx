// import Paginator from 'shared/components/Paginator/Paginator';
import { RecipesList } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectMyRecipes,
} from 'redux/myRecipes/selectors';
import { useEffect } from 'react';
import { deleteMyRecipes, fetchMyRecipes } from 'redux/myRecipes/operations';
import { EmptyMyRecipesPage } from './EmptyMyRecipesPage';

export const MyRecipesPage = () => {
  const dispatch = useDispatch();
  const myRecipes = useSelector(selectMyRecipes);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  console.log(myRecipes);
  useEffect(() => {
    dispatch(fetchMyRecipes());
  }, [dispatch]);

  const isMyRecipes = myRecipes.length > 0;
  return (
    <>
      {isMyRecipes ? (
        <RecipesList array={myRecipes} action={deleteMyRecipes} />
      ) : (
        <EmptyMyRecipesPage />
      )}
      {isLoading && !error && <b>Request in progress...</b>}
    </>
  );
};