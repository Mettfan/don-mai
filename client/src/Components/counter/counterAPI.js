import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return axios.get(`http://localhost:3001/products/?id=${amount}`, ( response ) => {
    return amount
  })
  
    
  
}
