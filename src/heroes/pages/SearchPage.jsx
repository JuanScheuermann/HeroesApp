import { HeroeCard } from '../components'
import { useForm } from '../../hooks/useForm'
import { useLocation, useNavigate } from 'react-router-dom';
import queyString from 'query-string'
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queyString.parse(location.search);

    const heroes = getHeroesByName(q);

    const { onInputChange, searchText } = useForm({
        searchText: q
    });

    const onSearchSubmit = (e) => {
        e.preventDefault();
        //if (searchText.trim().length <= 1) return;

        navigate(`?q=${searchText}`)
    }
    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">

                <div className="col-5">
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={onSearchSubmit}>
                        <input type="text"
                            placeholder="buscar heroe"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={onInputChange}
                        />

                        <button className="btn btn-primary mt-3">
                            search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {
                        (q === '')
                            ? <div className="alert alert-primary">Buscar heroe</div>
                            : (heroes.length === 0)
                            && <div className="alert alert-danger">No se encontro el heroe <b>{q}</b></div>
                    }

                    {
                        heroes.map(hero => (
                            <HeroeCard key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>

            </div>
        </>
    )
}
