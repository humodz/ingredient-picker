# ingredient-picker

Sometimes it's hard for a group of people order something on iFood, specially when the restaurant has lots of options and not everyone likes every ingredient.

This project is an interface that lets you filter and sort dishes based on wanted and unwanted ingredients. The dishes were scraped from a specific restaurant, using `./src/util/extract-ingredients.js`.

The current sorting logic is (from top to bottom):
- Dishes with wanted ingredients but no unwanted ingredients
- Dishes with neither
- Dishes with both wanted and unwanted ingredients
- Dishes with unwanted ingredients but no wanted ingredients (greyed out)

## TODO

- More screens
- Multiple languages
- User-supplied dishes
