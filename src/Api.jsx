import { useEffect, useRef, useState } from "react";
import Movies from "./Movies";
// import { isDisabled } from "@testing-library/user-event/dist/utils";


function Api() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState();
    const [load, setLoad] = useState();
    const [page, setPage] = useState([1, 2, 3, 4, 5])

    const APIURL =
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}`;
    // most popular movies
    const SEARCHAPI =
        `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&page=${currentPage}&query=${query}`;

    const inpRef = useRef();


    const getMovies = async (api) => {
        setLoad(true)

        const response = await fetch(api);
        const movieData = await response.json();
        setData(movieData.results)
        console.log(movieData.results);
        setLoad(false)

    }
    useEffect(
        () => {
            if (inpRef.current.value != "") {
                getMovies(SEARCHAPI)
            } else {
                getMovies(APIURL)
            }
        }
        , [currentPage, query]
    )
    function incPage() {
        setPage(page.map(
            (d) => d +5
        ))
    }
    useEffect(
        () => {
            
        },[currentPage]
    )
    
    function descPage() {
        setPage(page.map(
            (d) => d - 5
        ))
    }
    const inCurrent = () => setCurrentPage(currentPage + 1);
    const deCurrent = () => setCurrentPage(currentPage - 1);
    return (
        <div className="main text-center">
            <input type="text" className="form-control rounded my-3 mx-auto width d-inline" placeholder="Search here..."
                ref={inpRef} onChange={() => {
                    setQuery(inpRef.current.value)
                    setCurrentPage(1)
                }}
            />
            <div className="p-2 d-flex justify-content-center">
                <ul className="pagination">
                    <li className={`page-item`} style={{cursor:"pointer"}}>
                        <span className={`d-none d-md-block page-link`}>
                            <button disabled={page[0] == 1? true : false} style={{border:"none",outline:"none",padding:"0px"}} onClick={descPage}>

                            Previous
                            </button>
                        </span>
                        <span className="d-block d-md-none page-link">
                            &lt;&lt;
                        </span>
                    </li>
                    {
                        page.map(
                            (d) => {
                                return (
                                    <li className="page-item" style={{cursor:"pointer"}} onClick={() => setCurrentPage(d)}>
                                        <span className={`page-link ${currentPage == d ? "active" : ""}`}>
                                            {d}
                                        </span>
                                    </li>
                                )
                            }
                        )
                    }


                    <li className="page-item" style={{cursor:"pointer"}} onClick={incPage}>
                        <span className="d-none d-md-block page-link">
                           Next
                        </span>
                        <span className="d-block d-md-none page-link">
                            &gt;&gt;
                        </span>
                    </li>
                </ul>

            </div>
            <div className="buttons">
                <button className="p-2 btn btn-primary rounded m-2" onClick={() => {
                    if(currentPage%5==1){
                        descPage()
                        deCurrent()
                    }else{
                        deCurrent()
                    }
                }} disabled={currentPage == 1 ? true : false}>Previos</button>
                <button className="p-2 btn btn-primary rounded m-2" onClick={() => {
                    if(currentPage%5==0){
                        incPage()
                        inCurrent()
                    }else{
                        inCurrent()
                    }
                }}>Next</button>
            </div>
            {data.length == 0 && load == false ? <h1 className="text-light">NO Record found</h1> : <Movies data={data} load={load} />}

        </div>
    )
}
export default Api;