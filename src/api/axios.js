import axios from "axios";

const api = axios.create({
  baseURL: "/ttb/api/"
});

export const bookApi = {
  info: (isbn) => api.get("ItemLookUp.aspx", { 
    params: {
      ttbkey: process.env.REACT_APP_TTB_KEY,
      itemIdType: 'ISBN13',
      ItemId: isbn,
      output: 'js',
      Version: 20131101
    }
  }),
  search: (term, page) =>
    api.get("ItemSearch.aspx", {
      params: {
        ttbkey: 'ttbdas19051700001',
        Query: term,
        QueryType: 'Title',
        MaxResults: 10,
        start: page,
        SearchTarget : 'Book',
        output: 'js',
        Version: 20131101
      }
    })
};
