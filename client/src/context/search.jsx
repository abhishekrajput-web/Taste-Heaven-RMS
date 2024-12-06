import {useState, useContext, createContext} from "react";
const SearchContext = createContext();

const SearchProvider = ({children}) => {

    const [values, setValues] = useState({
        keyword:"",
        results:[]
    });



return (
    <SearchContext.Provider value={{values, setValues}}>
        {children}
    </SearchContext.Provider>
)

}

// custom hooks
const useSearch = () => {
   return useContext(SearchContext);
}

export {SearchProvider, useSearch};