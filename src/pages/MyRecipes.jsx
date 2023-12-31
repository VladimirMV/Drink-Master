import { Button, EmptyAndError, Section } from 'components';
import { RecipesList } from 'components';
import { useEffect, useState } from 'react';
import { deleteMyRecipe, getMyRecipes } from 'api';

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);

  const [next, setNext] = useState(9);

  useEffect(() => {
    function calculateOnPage(widthWindow) {
      return widthWindow < 1200 ? 8 : 9;
    }

    function handleResize() {
      setNext(calculateOnPage(window.innerWidth));
    }
    window.addEventListener('resize', handleResize);

    (async () => {
      try {
        const result = await getMyRecipes();
        setMyRecipes(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleRemoveRecipe = async id => {
    try {
      await deleteMyRecipe(id);
      const result = await getMyRecipes();

      setMyRecipes(result);
    } catch (error) {
      console.log(error);
    }
  };

  const seeMoreDrinks = () => {
    setNext(next + next);
  };

  const sliceRecipes = myRecipes.slice(0, next);

  const isMyRecipes = myRecipes.length > 0;

  return (
    <>
      <Section title="My recipes">
        <>
          {isMyRecipes ? (
            <RecipesList
              array={sliceRecipes}
              action={handleRemoveRecipe}
              params={{
                title:
                  'Do you really want to delete this cocktail from your recipes',
                agreementBtnText: 'Yes',
              }}
            />
          ) : (
            <EmptyAndError text="You don't have your recipes" closeModalRoot />
          )}
          {myRecipes.length !== sliceRecipes.length && (
            <>
              <div style={{ textAlign: 'center' }}>
                <Button type="button" onClick={seeMoreDrinks}>
                  see other
                </Button>
              </div>
            </>
          )}
        </>
      </Section>
    </>
  );
};

export default MyRecipes;
