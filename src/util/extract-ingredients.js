(() => {
  function last(arr) {
    return arr[arr.length - 1];
  }

  function $(sel, elem = document) {
    return Array.from(elem.querySelectorAll(sel));
  }

  const sectionSel = '.garnish-choices__list';
  const itemSel = '.garnish-choices__option-desc';
  
  const sections = $(sectionSel);
  
  const mySection = sections[1];
  
  const items = $(itemSel, mySection);
  
  const allIngredients = new Set();
  
  const parsedItems = items.map(elem => {
    const [name, ingredientsStr, price] = elem.innerText.split('\n');
    
    const commaSeparatedIngr = ingredientsStr.replace(/\.$/g, '').split(/,\s+/g);
    const lastIngr = last(commaSeparatedIngr).split(/\s+e\s+/g);
    let allIngr = commaSeparatedIngr.slice(0, -1)
    allIngr.push(...lastIngr);
    
    const ingredients = allIngr.map(ingr => {
      const result = ingr.toLocaleLowerCase();
      allIngredients.add(result);
      return result;
    });
    
    return { name, price, ingredients };
  });
  
  const json = {
    ingredients: Array.from(allIngredients).sort(),
    items: parsedItems,
  };
  
  console.log(JSON.stringify(json, null, 2));
})();


