import {
  GET_DATA,
  LOADING_DATA,
  GET_DATA_ERROR,
  TYPE_VIEW_TABLE,
  SET_SEARCH_PARAMS,
  GET_DESCRIPTION,
  CLEAR_DATA,
} from '../actions/types';
import initialParametersApp from '../config';

const initialState = {
  data: [],
  errors: {
    searchError: '',
  },
  typeViewRow: true,
  searchParams: initialParametersApp.initialSearchParameters,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      const data = [];
      const companies = action.payload.result;
      const { totalFound } = action.payload.meta;

      companies.map((company) => {
        const currentCompany = company;
        currentCompany.goodsDescription = {
          loading: true,
          infoText: '',
        };

        return data.push(company);
      });

      return {
        ...state,
        data,
        totalFound,
        errors: {
          searchError: '',
        },
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        errors: {
          searchError: 'No results',
        },
        dataLoading: false,
      };
    case LOADING_DATA:
      return {
        ...state,
        data: [],
        dataLoading: true,
        errors: {
          searchError: '',
        },
      };
    case TYPE_VIEW_TABLE:
      return {
        ...state,
        typeViewRow: action.payload,
      };
    case SET_SEARCH_PARAMS:
      const filterParams = state.searchParams;
      return {
        ...state,
        searchParams: {
          ...filterParams,
          ...action.payload,
        },
      };
    case GET_DESCRIPTION:
      const { applicationNumber, details = '', markFeature } = action.payload;
      const dataCompanies = state.data;

      dataCompanies.forEach((item) => {
        if (item.applicationNumber === applicationNumber) {
          const currentItem = item;
          currentItem.goodsDescription.loading = false;
          currentItem.goodsDescription.infoText = details;
          currentItem.goodsDescription.markFeature = markFeature;
        }
      });

      return {
        ...state,
        data: dataCompanies,
        dataLoading: false,
      };
    case CLEAR_DATA:
      return {
        ...state,
        data: [],
        searchParams: initialParametersApp.initialSearchParameters,
      };
    default:
      return state;
  }
}
