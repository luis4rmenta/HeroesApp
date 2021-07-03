import { heroes } from "../data/heroes"

export const getHeroesByName = (name) => {
  name = name.toLowerCase();

  if (name === ''){
    return [];
  }
  
  return heroes.filter(hero => {
    if (
        hero.superhero.toLowerCase().includes(name) ||
        hero.alter_ego.toLowerCase().includes(name) ||
        hero.characters.toLowerCase().includes(name)
      ) {
      return hero;
    } else {
      return null;
    }
  });
}