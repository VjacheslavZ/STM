import axios from 'axios';
import {
  GET_DATA, LOADING_DATA, GET_DATA_ERROR, TYPE_VIEW_TABLE, SET_SEARCH_PARAMS, GET_DESCRIPTION, CLEAR_DATA,
} from './types';
import { API_KEY } from '../constants';

const URLsGetGoodsDescription = [];

function getDataAll(URL) {
  return axios
    .get(URL)
    .then(response => ({
      success: false,
      data: response.data,
    }))
    .catch(() => {

    });
}

const getAllData = URLs => async (dispatch) => {
  let URLPromises = URLs.map(URL => getDataAll(URL));
  let res = await Promise.all(URLPromises);

  res.map((el) => {
    const { response } = el.data;
    const { TradeMark } = response.TradeMarkTransactionBody.TransactionContentDetails.TransactionData.TradeMarkDetails;
    const applicationNumber = TradeMark.ApplicationNumber;
    const markFeature = TradeMark.MarkFeature;
    const { GoodsServicesDescription } = TradeMark.GoodsServicesDetails.GoodsServices.ClassDescriptionDetails.ClassDescription;

    return dispatch({
      type: GET_DESCRIPTION,
      payload: {
        applicationNumber,
        details: GoodsServicesDescription,
        markFeature,
      },
    });
  });
};

// const getGoodsDescription = number => (dispatch) => {
//   axios.get(`/api/data?number=${number}&databases=USPTO&api_key=${API_KEY}`)
//     .then((res) => {
//       const { response } = res.data;
//       const { TradeMark } = response.TradeMarkTransactionBody.TransactionContentDetails.TransactionData.TradeMarkDetails;
//
//       const applicationNumber = TradeMark.ApplicationNumber;
//       const markFeature = TradeMark.MarkFeature;
//       const { GoodsServicesDescription } = TradeMark.GoodsServicesDetails.GoodsServices.ClassDescriptionDetails.ClassDescription;
//
//       dispatch({
//         type: GET_DESCRIPTION,
//         payload: {
//           applicationNumber,
//           details: GoodsServicesDescription,
//           markFeature,
//         },
//       });
//     })
//     .catch(() => {
//
//     });
// };

export const getData = (history, text = '', startIndex = 0, pageLimit = 10, classFilter = '', dead) => (dispatch) => {
  history.push(`/${text}/${classFilter}/${dead}`);

  dispatch({ type: LOADING_DATA });

  const uriText = encodeURIComponent(text);
  axios.get(`/api/search.json?api_key=${API_KEY}&mark=${uriText}&class=${classFilter}&database=USPTO&mode=idphrase&startIndex=${startIndex}&pageLimit=${pageLimit}&dead=${dead}}`)
    .then(res => dispatch({
      type: GET_DATA,
      payload: res.data,
    }))
    .then((res) => {
      const data = res.payload.result;
      data.map(el => URLsGetGoodsDescription.push(`/api/data?number=${el.applicationNumber}&databases=USPTO&api_key=${API_KEY}`));
    })
    .then(() => getAllData(URLsGetGoodsDescription)(dispatch))
    .catch(() => dispatch({ type: GET_DATA_ERROR }));
};

export const changeViewTable = isTable => (dispatch) => {
  dispatch({
    type: TYPE_VIEW_TABLE,
    payload: isTable,
  });
};

export const changeSearchParams = filter => (dispatch) => {
  dispatch({
    type: SET_SEARCH_PARAMS,
    payload: filter,
  });
};

export const clearSearchResults = () => (dispatch) => {
  dispatch({
    type: CLEAR_DATA,
  });
};
