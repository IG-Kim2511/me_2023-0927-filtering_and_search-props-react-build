import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import FilterBybutton from './components/FilterBybutton';

import data_products from './data';

const App = () => {

  // 👉105
  const [selected, setSelected] = useState(null)

  // ----------- Input Filter -----------  
  //🍀js 100  query : nav input search bar에서의 value
  const [query, setQuery] = useState('');

  // 👉js 100
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    console.log("handleQueryChange")
  };

  
  // 🍀js 105 ------ Radio Filtering -----------
  const handleSelectedChange =(e)=>{
    setSelected(e.target.value);   
    console.log("handleSelectedChange")

  }

  // ------------ Button Filtering -----------
  const handleSelectedClick =(e)=>{
    setSelected(e.target.value);
    console.log("handleSelectedClick")
  }


  /* 🍉👉js 0223. filteredItems
    query (input search 검색어) === data_products.title
    filter(~)
    indexOf(~)
    검색 결과가 -1이 아니면 해당 상품을 결과 배열에 포함시킵니다.
  */
  const filteredItems= data_products.filter((product)=> product.title.toLowerCase().indexOf(query.toLowerCase())!== -1 );


  /* 🍀js 0223. filteredData 함수:
    위에 수집한 products, selected, query 변수들 데이터로 rendering  */

  const filteredData=(data_products, selected, query)=>{
    // console.log(data_products)

    let filtered_Products = data_products;  

    // Filtering : query (input search 검색어) === data_products.title
    // 검색어 필터링: 검색어(query)가 있을 경우, 상품 목록을 filteredItems 배열로 대체합니다. 
    // 이렇게 하면 검색어와 일치하는 상품만 남게 됩니다.

    if (query) {
      filtered_Products = filteredItems;      
    }
    
    // 선택한 필터 적용: 선택한 카테고리(selected)가 있을 경우, 해당 카테고리와 일치하는 상품만 남기고 나머지는 제거합니다. 
    // 여기서 filter 메서드를 사용하여 필터링 작업을 수행합니다.
    if (selected) {
      console.log(filtered_Products)
      filtered_Products = filtered_Products.filter(({ category, color, company, newPrice, title })=>
        category === selected ||
        color === selected ||
        company === selected ||
        newPrice === selected ||
        title === selected      
      )      
    }
    // 필터링된 상품들을 map 함수를 사용하여 컴포넌트(Card)로 렌더링합니다.
    // filtering 끝나면 <product.js에 rendering함

    return filtered_Products.map(({img, title, star, reviews, prevPrice, newPrice})=>(        
       <section className="card">
          <img src={img} alt={title} className="card-img" />
          <div className="card-details">
            <h3 className="card-title">{title}</h3>
            <section className="card-reviews">
              {star} {star} {star} {star}
              <span className="total-reviews">{reviews}</span>
            </section>
            <section className="card-price">
              <div className="price">
                <del>{prevPrice}</del> {newPrice}
              </div>
              <div className="bag">
                <span className="bag-icon" />
              </div>
            </section>
          </div>
        </section>
    ))
  }

  const result = filteredData(data_products, selected, query);

  return (
    <div>
      <div>Query: {query}</div>
      <Nav query={query} handleQueryChange={handleQueryChange} />
      <main className="container">
        <div className="left">
          <FilterBybutton handleSelectedClick={handleSelectedClick}/>
          <Sidebar handleSelectedChange={handleSelectedChange}/>
        </div>
        <div className="right">      
          {/*👉js 0223 */}      
          <div className='Products'>
          {result} 
          </div>
        </div> 
      </main>
    </div>
  );
};

export default App;
