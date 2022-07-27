import React, {useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate'
import '../style/style.css'

export default function Pagination(props) {
    const {data} = props
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 3;
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);
  

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      setItemOffset(newOffset);
    };
  
    return (
      <>
       <div className="products-cont">
        {currentItems.map(each => {
            return (
                <div>
                    <h1>{each.name}</h1>
                </div>
            )
        })}
       </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
}
