import React from "react";


const Rating = ({ value, text}) => {
  return(
    <div className="rating">
      {
        [1,2,3,4,5].map((v,idx)=>{
          console.log("val",v);
          return(
            <span>
            <i
              style={{ color:"#a8a8a7" }}
              className={
                value >= v
                  ? "fas fa-star"
                  : value >= v-0.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
          
          )
        })
      }
      <span>{text && text}</span>

    </div>
  )

 
};

export default Rating;



/*

<span>
            <i
              style={{ color }}
              className={
                value >= 1
                  ? "fas fa-star"
                  : value >= 0.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              style={{ color }}
              className={
                value >= 2
                  ? "fas fa-star"
                  : value >= 1.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              style={{ color }}
              className={
                value >= 3
                  ? "fas fa-star"
                  : value >= 2.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              style={{ color }}
              className={
                value >= 4
                  ? "fas fa-star"
                  : value >= 3.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
          <span>
            <i
              style={{ color }}
              className={
                value >= 5
                  ? "fas fa-star"
                  : value >= 4.5
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
          <span>{text && text}</span>





          ___________________________________________________________
           return (
    <div className="rating">
      {
        // console.log(Array(value))
        Array(Math.floor(value)).fill(0).map((value,idx)=>{
          return (<span key={idx}>
          <i
          style={{ color:"red" }}
          className="fas fa-star"
        ></i>
      </span>)
        })
        
      }
      {Math.ceil(value-Math.floor(value))>0 && (<span key="frac">
          <i
          style={{ color:"red" }}
          className="fas fa-star-half-alt"
        ></i>
      </span>)}
     

      <span>{text && text}</span>

    </div>
  );

*/
