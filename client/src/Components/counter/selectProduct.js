import axios from "axios";

// A mock function to mimic making an async request for data
export function selectProduct(id = 1) {
    return new Promise((resolve) =>
      setTimeout(() =>{
        axios.get('http://localhost:3001/products/?id=' + id).then( response => {
            
            resolve({ data: response})
        })
      }, 500)
    );
  }
  