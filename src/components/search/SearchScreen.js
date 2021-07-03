import React, { useMemo } from 'react'
import { parse } from "query-string";
import { useLocation } from "react-router-dom";

import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

  const location = useLocation();

  const { q = '' } = parse(location.search);
  
  const [values, handleInputChange, reset] = useForm({searchText: ''})
  
  let { searchText } = values;
  
  let herosFiltered = useMemo(() => getHeroesByName(q), [q]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  }
  return (
    <div>
      <h1>Search screen</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={ handleSearch }>
            <input
              type="text"
              placeholder="Find you hero.."
              className="form-control"
              onChange={ handleInputChange }
              autoComplete="off"
              name="searchText"
              value={ searchText }
            />
            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          { 
            (q === '') && 
            <div className="alert alert-info">
              Search a hero
            </div>
          }
          { 
            (q !== '' && herosFiltered.length === 0) && 
            <div className="alert alert-danger">
              There is no a hero with { q }
            </div>
          }

          {
            herosFiltered.map(hero => (
              <HeroCard
                className="animate__animated animate__fadeIn"
                key={hero.id} 
                {...hero}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
