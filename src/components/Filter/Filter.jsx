import PropTypes from 'prop-types';
import style from './FilterStyle.module.css';

export const Filter = ({ filter, setFilter }) => {
  //Filtering
  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  return (
    <>
      <p className={style.label}>Find Contacts by Name</p>
      <input
        className={style.searchBox}
        type="text"
        name="filter"
        placeholder="Search by name"
        value={filter}
        onChange={handleFilterChange}
      />
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};
