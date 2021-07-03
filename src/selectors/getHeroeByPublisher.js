import { heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher) => {
  const validPublicher = ['DC Comics', 'Marvel Comics'];
  
  if (!validPublicher.includes(publisher)) {
    throw new Error(`Publisher ${ publisher } no es correcto`);
  }

  return heroes.filter(hero => hero.publisher === publisher );
}