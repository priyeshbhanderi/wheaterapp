// src/App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    checkboxes: [],
    radioButton: 'all',
    select: ''
  });

  const items = [
    { id: 1, class: 'color-1 check1 radio2 option3', src: 'img/img-1.jpg', alt: 'Image 1' },
    { id: 2, class: 'color-2 check2 radio2 option2', src: 'img/img-2.jpg', alt: 'Image 2' },
    { id: 3, class: 'color-1 check3 radio3 option1', src: 'img/img-3.jpg', alt: 'Image 3' },
    { id: 4, class: 'color-1 check3 radio2 option4', src: 'img/img-4.jpg', alt: 'Image 4' },
    { id: 5, class: 'color-1 check1 radio3 option2', src: 'img/img-5.jpg', alt: 'Image 5' },
    { id: 6, class: 'color-2 check2 radio3 option3', src: 'img/img-6.jpg', alt: 'Image 6' },
    { id: 7, class: 'color-2 check2 radio2 option1', src: 'img/img-7.jpg', alt: 'Image 7' },
    { id: 8, class: 'color-1 check1 radio3 option4', src: 'img/img-8.jpg', alt: 'Image 8' },
    { id: 9, class: 'color-2 check1 radio2 option3', src: 'img/img-9.jpg', alt: 'Image 9' },
    { id: 10, class: 'color-1 check3 radio2 option4', src: 'img/img-10.jpg', alt: 'Image 10' },
    { id: 11, class: 'color-1 check3 radio3 option2', src: 'img/img-11.jpg', alt: 'Image 11' },
    { id: 12, class: 'color-2 check1 radio3 option1', src: 'img/img-12.jpg', alt: 'Image 12' }
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;
    setActiveFilters((prev) => {
      const updatedCheckboxes = checked
        ? [...prev.checkboxes, value]
        : prev.checkboxes.filter((checkbox) => checkbox !== value);
      return { ...prev, checkboxes: updatedCheckboxes };
    });
  };

  const handleRadioButtonChange = (e) => {
    setActiveFilters({ ...activeFilters, radioButton: e.target.value });
  };

  const handleSelectChange = (e) => {
    setActiveFilters({ ...activeFilters, select: e.target.value });
  };

  const filteredItems = items.filter((item) => {
    const matchesSearchText = item.class.toLowerCase().includes(searchText);
    const matchesCheckboxes = activeFilters.checkboxes.every((filter) => item.class.includes(filter));
    const matchesRadioButton = activeFilters.radioButton === 'all' || item.class.includes(activeFilters.radioButton);
    const matchesSelect = activeFilters.select === '' || item.class.includes(activeFilters.select);
    return matchesSearchText && matchesCheckboxes && matchesRadioButton && matchesSelect;
  });

  return (
    <div>
      <header className="cd-header">
        <h1>Content Filters</h1>
      </header>

      <main className="cd-main-content">
        <div className="cd-tab-filter-wrapper">
          <div className="cd-tab-filter">
            <ul className="cd-filters">
              <li className="placeholder">
                <a href="#0" onClick={() => setActiveFilters({ checkboxes: [], radioButton: 'all', select: '' })}>All</a>
              </li>
              <li className="filter"><a className="selected" href="#0" onClick={() => setActiveFilters({ checkboxes: [], radioButton: 'all', select: '' })}>All</a></li>
              <li className="filter"><a href="#0" onClick={() => setActiveFilters({ ...activeFilters, radioButton: 'color-1' })}>Color 1</a></li>
              <li className="filter"><a href="#0" onClick={() => setActiveFilters({ ...activeFilters, radioButton: 'color-2' })}>Color 2</a></li>
            </ul>
          </div>
        </div>

        <section className="cd-gallery">
          <ul>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <li key={item.id} className={`mix ${item.class}`}>
                  <img src={item.src} alt={item.alt} />
                </li>
              ))
            ) : (
              <div className="cd-fail-message">No results found</div>
            )}
          </ul>
        </section>

        <div className="cd-filter">
          <form>
            <div className="cd-filter-block">
              <h4>Search</h4>
              <div className="cd-filter-content">
                <input type="search" placeholder="Try color-1..." value={searchText} onChange={handleSearch} />
              </div>
            </div>

            <div className="cd-filter-block">
              <h4>Check boxes</h4>
              <ul className="cd-filter-content cd-filters list">
                <li>
                  <input className="filter" value="check1" type="checkbox" id="checkbox1" onChange={handleCheckboxChange} />
                  <label className="checkbox-label" htmlFor="checkbox1">Option 1</label>
                </li>
                <li>
                  <input className="filter" value="check2" type="checkbox" id="checkbox2" onChange={handleCheckboxChange} />
                  <label className="checkbox-label" htmlFor="checkbox2">Option 2</label>
                </li>
                <li>
                  <input className="filter" value="check3" type="checkbox" id="checkbox3" onChange={handleCheckboxChange} />
                  <label className="checkbox-label" htmlFor="checkbox3">Option 3</label>
                </li>
              </ul>
            </div>

            <div className="cd-filter-block">
              <h4>Select</h4>
              <div className="cd-filter-content">
                <select className="filter" name="selectThis" id="selectThis" onChange={handleSelectChange}>
                  <option value="">Choose an option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
              </div>
            </div>

            <div className="cd-filter-block">
              <h4>Radio buttons</h4>
              <ul className="cd-filter-content cd-filters list">
                <li>
                  <input className="filter" value="all" type="radio" name="radioButton" id="radio1" checked={activeFilters.radioButton === 'all'} onChange={handleRadioButtonChange} />
                  <label className="radio-label" htmlFor="radio1">All</label>
                </li>
                <li>
                  <input className="filter" value="radio2" type="radio" name="radioButton" id="radio2" checked={activeFilters.radioButton === 'radio2'} onChange={handleRadioButtonChange} />
                  <label className="radio-label" htmlFor="radio2">Choice 2</label>
                </li>
                <li>
                  <input className="filter" value="radio3" type="radio" name="radioButton" id="radio3" checked={activeFilters.radioButton === 'radio3'} onChange={handleRadioButtonChange} />
                  <label className="radio-label" htmlFor="radio3">Choice 3</label>
                </li>
              </ul>
            </div>
          </form>
          <a href="#0" className="cd-close">Close</a>
        </div>
        <a href="#0" className="cd-filter-trigger">Filters</a>
      </main>
    </div>
  );
};

export default App;
