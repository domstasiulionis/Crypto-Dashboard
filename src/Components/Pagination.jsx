import "../Styles/Pagination.scss";

const Pagination = ({ coinsPerPage, totalCoins, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pag = (number) => {
    window.scrollTo({ top: 0, left: 0 });
    paginate(number);
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination__item">
            <button className="pagination__button" onClick={() => pag(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
