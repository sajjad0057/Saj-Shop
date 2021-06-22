import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({pages, page_no, keyword = "" , isAdmin = false}) => {
  
  if(keyword){
      keyword =keyword.split("?keyword=")[1].split("&")[0]
      console.log("Paginate ------> keyword : ", keyword);
  }
  return (
    pages > 1 && (
      <Pagination>
        {
        [...Array(pages).keys()].map((x) => (
          <LinkContainer 
          key={x + 1} 
          to={ !isAdmin ? `/?keyword=${keyword}&page=${x + 1}` 
          : `/admin/products-list/?keyword=${keyword}&page=${x + 1}`
          }>
            <Pagination.Item active={x + 1 === page_no}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))
        }
      </Pagination>
    )
  );
};

export default Paginate;