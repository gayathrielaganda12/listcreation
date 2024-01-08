import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ListCreation = () => {
  
  const [data, setData] = useState(null);
  const [selectedLists, setSelectedLists] = useState({});
  const [showNewContainer, setShowNewContainer] = useState(false);
  const [newContainerItems, setNewContainerItems] = useState([]);
  const [AddButton,setShowAddButton] = useState(false);
  const [listNumberCounter, setListNumberCounter] = useState(3); // Start with list number 3






  const creatingNewList = () => {
    // Check if at least two checkboxes are selected
    const selectedCount = Object.values(selectedLists).filter(Boolean).length;
    if (selectedCount >= 2) {
      setShowNewContainer(true);
      setShowAddButton(true)
    } else {
      alert('Please select at least two checkboxes.');
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const apiUrl = 'https://apis.ccbp.in/list-creation/lists';

        // Fetch data using Axios with async/await
        const response = await axios.get(apiUrl);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the async function
    fetchData();
    
  }, []);



  const handleCheckboxChange = (listNumber) => {
    setSelectedLists((prevState) => ({
      ...prevState,
      [listNumber]: !prevState[listNumber],
    }));
  };

  const updateListItems = () => {
    setListNumberCounter((prevCounter) => prevCounter + 1);
  
    // Assuming newContainerItems is an array of items you want to add
    const updatedData = newContainerItems.map((item, index) => ({
      ...item,
      list_number:  listNumberCounter ,
      id: uuidv4(),
      index: 50 + index, // Assign indices starting from 50
    }));
  
    // Combine the existing lists and the updatedData
    const combinedLists = [...data.lists, ...updatedData];
  
    // Update the state with the combined lists
    setData({
      
      lists: combinedLists,
    });
    setShowNewContainer(false);
    setShowNewContainer([])

    console.log(data);
  };
  
  



  // const updateListItems = () => {
  //   setListNumberCounter((prevCounter) => prevCounter + 1);
  //   setData((prevData) => ({
  //     ...prevData,
      
  //     ...newContainerItems
  //   }));

  //   console.log(data)
  // };

  



 
  const handleArrowClick = (item) => {
    const newListNumber = listNumberCounter; // Use the current counter value
    setNewContainerItems((prevItems) => [
      ...prevItems,
      { ...item, list_number: newListNumber },
    ]);

    console.log(`Item added to List ${newListNumber}: ${item.name} - ${item.description}`);

    // Increment the list number counter for the next item
  
  };
 

  const renderContainers = () => {
    if (!data || !data.lists) {
      return null;
    }

    const containers = {};

    // Group the items by list_number
    data.lists.forEach((item) => {
      const listNumber = item.list_number;
      if (!containers[listNumber]) {
        containers[listNumber] = [];
      }
      containers[listNumber].push(item);
    });

    // Create containers based on the grouped data
    return Object.keys(containers).map((listNumber) => (
      <div key={listNumber} className="max-w-md mx-2 bg-white p-4 rounded shadow overflow-y-auto h-screen">
        <h2 className="text-lg font-semibold mb-4">List {listNumber}</h2>
        <input
          type="checkbox"
          id={`listCheckbox${listNumber}`}
          checked={selectedLists[listNumber] || false}
          onChange={() => handleCheckboxChange(listNumber)}
          className="mr-2"
        />
        <label htmlFor={`listCheckbox${listNumber}`}>Select List {listNumber}</label>
        <ul className="list-disc pl-4">
          {containers[listNumber].map((item) => (
            <li key={item.id} className="mb-2 h-80vh bg-blue-100 d-flex flex-col justify-center align-items-center rounded-md p-2" style={ {listStyleType:'none'}} >
            
            <h1 className='font-bold  text-1xl p-3 '>{item.name}</h1>
              <p className='p-2 font-serif'> {item.description}</p>
             {AddButton &&  <button onClick={() => handleArrowClick(item)}>➡️</button>}
            </li>
          ))}
        </ul>
      </div>
    ));
  };



  const renderNewContainer = () => {
    if (!showNewContainer) {
      return null;
    }

    return (
      <div key="newContainer" className="max-w-md mx-2 bg-white p-4 rounded shadow overflow-y-auto h-screen">
        <h2 className="text-lg font-semibold mb-4">List 3</h2>
        <ul className="list-disc pl-4">
          {newContainerItems.map((item) => (
            <li key={item.id} className="mb-2 h-80vh bg-blue-100 d-flex flex-col justify-center align-items-center rounded-md p-2" style={ {listStyleType:'none'}} >
            
            <h1 className='font-bold  text-1xl p-3 '>{item.name}</h1>
              <p className='p-2 font-serif'> {item.description}</p>
             
            </li>
          
          ))}
        </ul>
        
      </div>
    );
  };



  return (
    <div>
      <h1>List Creation </h1>
      <button className="text-white-300 bg-blue-500 font-bold text-light p-1" onClick={creatingNewList}>
        Create List
      </button>
      <div className="flex space-x-4 overflow-x-auto m-2 " style={{height:'80vh'}} >
        {renderContainers()}
        {renderNewContainer()}
      </div>
      <button onClick={updateListItems} className=' border btn btn-primary p-2  text-2xl font-bold text-center'>Update</button>
    </div>
  );
};

export default ListCreation;
