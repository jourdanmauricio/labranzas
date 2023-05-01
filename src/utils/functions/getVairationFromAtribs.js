export function getVariationFromAtribs(variations, attributes) {
  let varSel = {};

  let found = false;
  let atribFound = true;
  variations.forEach((variation) => {
    if (found === true) return;
    atribFound = true;
    attributes.forEach((attrib) => {
      let index = variation.attribute_combinations.findIndex(
        (attrib_comb) =>
          attrib_comb.name === attrib.name &&
          attrib_comb.value_name === attrib.value_name
        // && variation.available_quantity > 0
      );
      if (index === -1) atribFound = false;
    });
    if (atribFound === true) {
      varSel = variation;
      found = true;
    }
  });
  return varSel;
}
