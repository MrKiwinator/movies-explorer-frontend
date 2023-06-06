import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

import './SearchForm.css';
import searchIcon from '../../images/search.svg'

export default function SearchForm(props) {

    return(
        <section className="search">
            <div className="search__container">

                <form className="search__form" onSubmit={props.handleSubmitClick}>
                    <fieldset className="search__input-fields">

                        <div className="search__input-container">
                            <input
                                onChange={props.handleSearchInputChange}
                                value={props.value}
                                name="movie"
                                type="text"
                                className="search__input"
                                placeholder="Фильм"
                                // required
                            />
                            <button 
                                className="search__submit-button"
                                type="submit"
                            >
                                <img className="search__submit-icon" src={searchIcon} alt="Поиск" />
                            </button>
                        </div>

                        <FilterCheckbox 
                            onChange={props.onChechboxChange}
                            value={props.fiterIsActive}
                            label="Короткометражки"
                        />

                    </fieldset>
                </form>
                
            </div>
        </section>
    )
}