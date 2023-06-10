import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { BsFilterLeft } from 'react-icons/bs';
import { baseUrl } from '../../utils/urls';

const Dashboard = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const fetchSearchResults = async (selectedFilters) => {
    try {
      let url = `${baseUrl}/patients/`;
      if (selectedFilters.length > 0) {
        url += `?selectedFilters=${selectedFilters
          .map((filter) => `${filter.label}:${filter.subfilter}`)
          .join(",")}`;
      }
      const response = await fetch(url);
      const data = await response.json();
  
      console.log("Response data:", data); // Add this console.log statement
  
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };   
  

  useEffect(() => {
    fetchSearchResults(selectedFilters);
  }, [selectedFilters]);

  const handleFilterClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  
    if (isDropdownOpen) {
      fetchSearchResults(selectedFilters);
    }
  };

  const handleFilterOptionClick = (filter, subfilter) => {
    const filterIndex = selectedFilters.findIndex((item) => item.label === filter);
  
    if (filterIndex > -1) {
      const updatedFilters = [...selectedFilters];
      updatedFilters[filterIndex].subfilter = subfilter;
      setSelectedFilters(updatedFilters);
      fetchSearchResults(updatedFilters); // Pass updatedFilters to fetchSearchResults
    } else {
      const updatedFilters = [...selectedFilters, { label: filter, subfilter }];
      setSelectedFilters(updatedFilters);
      fetchSearchResults(updatedFilters); // Pass updatedFilters to fetchSearchResults
    }
  };
  
  
  
  
  const mainFilters = [
    {
      label: 'stage',
      subfilters: ['Initial authorisation', 'Enhancement', 'Discharge', 'Final authorisation'],
    },
    {
      label: 'status',
      subfilters: ['Pending Approval', 'TPA Query'],
    },
    // Add more main filters and subfilters as needed
  ];


  return (
    <div className='filter'>
    <div className='filter__container'>
      <button className='filter__button' onClick={handleFilterClick}>
        <BsFilterLeft className='filter__icon' />
        Filter
      </button>
      {isDropdownOpen && (
        <div className='filter__dropdown'>
          {mainFilters.map((filter) => (
            <div key={filter.label} className='filter-option'>
              <div className='main-filter'>{filter.label}</div>
              <div className='subfilters'>
                {filter.subfilters.map((subfilter) => (
                  <div
                    key={subfilter}
                    className={`subfilter ${selectedFilters.find(item => item.label === filter.label && item.subfilter === subfilter) ? 'selected' : ''}`}
                    onClick={() => handleFilterOptionClick(filter.label, subfilter)}
                  >
                    {subfilter}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <hr />
      <table className='dashboard__table'>
        <thead>
          <tr>
            <th>Claim</th>
            <th>Name</th>
            <th>Ailment</th>
            <th>SLA</th>
            <th>P-TAT</th>
            <th>Stage</th>
            <th>Status</th>
            <th>Approved Amount</th>
            <th>Hospital</th>
          </tr>
        </thead>
        <tbody>
  {searchResults.length > 0 ? (
    searchResults.map((patient) => (
      <tr key={patient.id}>
        <td>{patient.claimid}</td>
        <td>{patient.name}</td>
        <td>{patient.ailment}</td>
        <td>{patient.sla}</td>
        <td>{patient.ptat}</td>
        <td>{patient.stage}</td>
        <td>{patient.status}</td>
        <td>{patient.approvedAmount}</td>
        <td>{patient.hospital}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9">No results found.</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default Dashboard;
