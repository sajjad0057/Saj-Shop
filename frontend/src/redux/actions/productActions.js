import * as actionTypes from '../constants/productConstant'
import axios from 'axios'



export const listProducts = (keyword = "") =>async (dispatch)=>{
    try{
        dispatch({type:actionTypes.PRODUCT_LIST_REQUEST})
        const {data} = await axios.get(`/api/products/${keyword}`)
        dispatch({
            type : actionTypes.PRODUCT_LIST_SUCCESS,
            payload : data
        })

    }catch(err){
        // console.log("sajjad",err.message,err.response,err.response.data.message);
        dispatch({
            type:actionTypes.PRODUCT_LIST_FAILED,
            payload : err.response && err.response.data.detail
            ? err.response.data.detail
            : err.message
        
        })
    }
}


export const productDetailsAction = (id) =>async (dispatch)=>{

    try{
        dispatch({type:actionTypes.PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type : actionTypes.PRODUCT_DETAILS_SUCCESS,
            payload : data
        })

    }catch(err){
        dispatch({
            type:actionTypes.PRODUCT_DETAILS_FAILED,
            payload : err.response && err.response.data.detail
            ? err.response.data.detail
            : err.message
        
        })
    }
}






export const productDeleteAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_DELETE_REQUEST,
      });
  
      const { userLogin } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/products/delete/${id}`, config);
      //console.log("productDeleteAction ----- > : ",data);
  
      dispatch({
        type: actionTypes.PRODUCT_DELETE_SUCCESS,
      });
  
  
  
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_DELETE_FAILED ,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };







  export const productCreateAction = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_REQUEST,
      });
  
      const { userLogin } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/products/create/`, {} , config);
      //console.log("productDeleteAction ----- > : ",data);
  
      dispatch({
        type: actionTypes.PRODUCT_CREATE_SUCCESS,
        payload : data,
      });
  
  
  
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_FAILED ,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };








  export const productUpdateAction = (product) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_UPDATE_REQUEST,
      });
  
      const { userLogin } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(`/api/products/update/${product.id}/`, product , config);

  
      dispatch({
        type: actionTypes.PRODUCT_UPDATE_SUCCESS,
        payload : data,
      });


      dispatch({
        type : actionTypes.PRODUCT_DETAILS_SUCCESS,
        payload : data,
      })
  
  
  
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_UPDATE_FAILED ,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };





  export const productReviewCreateAction = (product_id,review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_REVIEW_REQUEST,
      });
  
      const { userLogin } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/products/${product_id}/reviews/`, review , config);

  
      dispatch({
        type: actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS,
        payload : data,
      });
  
    } catch (error) {
      dispatch({
        type: actionTypes.PRODUCT_CREATE_REVIEW_FAILED ,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };




