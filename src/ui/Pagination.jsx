import { useLocation, useNavigate } from "react-router-dom";
import useGetFilteredProduct from "../Utility/getFilteredProduct";

function Pagination() {
  const { search, pathname } = useLocation();
  const { data } = useGetFilteredProduct(search);

  const { pageCount, page } = data.meta.pagination;

  const navigate = useNavigate();

  function nextPage() {
    let next = page + 1;
    if (next < 1) next = pageCount;

    const searchParams = new URLSearchParams(search);
    searchParams.set("page", next);
    navigate(`${pathname}?${searchParams.toString()}`);
  }

  function prevePag() {
    let prev = page - 1;
    if (prev < 1) prev = pageCount;

    const searchParams = new URLSearchParams(search);
    searchParams.set("page", prev);
    navigate(`${pathname}?${searchParams.toString()}`);
  }

  return (
    <div className="join mt-10 flex justify-end">
      <button className="join-item btn" onClick={() => prevePag()}>
        «
      </button>
      <div className="join">
        {/* Render page buttons based on pageCount */}
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            className={`join-item btn ${
              page === index + 1 ? "btn-active" : ""
            }`}
            onClick={() => {
              const searchParams = new URLSearchParams(search);
              searchParams.set("page", (index + 1).toString());
              navigate(`${pathname}?${searchParams.toString()}`);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button className="join-item btn" onClick={() => nextPage()}>
        »
      </button>
    </div>
  );
}

export default Pagination;
