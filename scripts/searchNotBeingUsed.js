// "use strict";
// const React = window.React;
// const { useState, useEffect } = React;
// const SearchIcon = window.SearchIcon; // Assuming SearchIcon is globally available
// const CloseIcon = window.CloseIcon; // Assuming CloseIcon is globally available
// const data = window.data; // Assuming data is globally available
//
// // Importing styles
// import "../content/searchbar.css";
//
// const SearchBar = () => {
//     const [search, setSearch] = useState("");
//     const [searchData, setSearchData] = useState([]);
//     const [selectedItem, setSelectedItem] = useState(-1);
//
//     const handleChange = (e) => {
//         setSearch(e.target.value);
//     };
//
//     const handleClose = () => {
//         setSearch("");
//         setSearchData([]);
//         setSelectedItem(-1);
//     };
//
//     const handleKeyDown = (e) => {
//         if (selectedItem < searchData.length) {
//             if (e.key === "ArrowUp" && selectedItem > 0) {
//                 setSelectedItem((prev) => prev - 1);
//             } else if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
//                 setSelectedItem((prev) => prev + 1);
//             } else if (e.key === "Enter" && selectedItem >= 0) {
//                 window.open(searchData[selectedItem].link);
//             }
//         } else {
//             setSelectedItem(-1);
//         }
//     };
//
//     useEffect(() => {
//         if (search !== "") {
//             const newFilterData = data.filter((event) => {
//                 return event.title.toLowerCase().includes(search.toLowerCase());
//             });
//
//             setSearchData(newFilterData);
//         } else {
//             setSearchData([]);
//         }
//     }, [search]);
//
//     return (
//         <section className='search_section'>
//             <div className='search_input_div'>
//                 <input
//                     type='text'
//                     className='search_input'
//                     placeholder='Search...'
//                     autoComplete='off'
//                     onChange={handleChange}
//                     value={search}
//                     onKeyDown={handleKeyDown}
//                 />
//                 <div className='search_icon'>
//                     {search === "" ? <SearchIcon /> : <CloseIcon onClick={handleClose} />}
//                 </div>
//             </div>
//             <div className='search_result'>
//                 {searchData.slice(0, 10).map((data, index) => (
//                     <a
//                         href={data.link}
//                         key={index}
//                         target='_blank'
//                         className={
//                             selectedItem === index
//                                 ? "search_suggestion_line active"
//                                 : "search_suggestion_line"
//                         }
//                     >
//                         {data.title}
//                     </a>
//                 ))}
//             </div>
//         </section>
//     );
// };
//
// export default SearchBar;