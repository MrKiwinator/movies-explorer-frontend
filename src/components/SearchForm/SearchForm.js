import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
import searchIcon from '../../images/search.svg'

export default function SearchForm(props) {
    return(
        <section className="search">
            <div className="search__container">

                <form className="search__form">
                    <fieldset className="search__input-fields">

                        <div className="search__input-container">
                            <input name="movie" type="text" className="search__input" placeholder="Фильм" />
                            <button className="search__submit-button">
                                <img className="search__submit-icon" src={searchIcon} alt="Поиск" />
                            </button>
                        </div>

                        <FilterCheckbox />

                    </fieldset>
                </form>
                
            </div>
        </section>
    )
}