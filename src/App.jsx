/*================================================================
 This version will discuss React contolled components:
   1. HTML elements come with their internal state which is not coupled to React
   2. While we provide essential attributes like id and type in addition to a 
      handler (here: onChange), we do not tell the element its value
   3. Let's use "React" as initial state in the useState declaration line 37 instead of empty string
   4. While the stories have been filtered respectively to the new initial searchTerm,
      the HTML input field doesn't show the value in the browser. 
      Only when we start typing into the input field do we see the changes 
      reflected in it. That's because the input field doesn't know anything about 
      React's state (here: searchTerm), it only uses its handler to communicate 
      (see handleSearch()) its internal state to React state. 

    5. Solution let's pass another prop to Search component - search={searchTerm} 
        <Search search={searchTerm} onSearch={handleSearch}/>
=============================================*/
import * as React from 'react';
 
 // Eliminate "return" statement and enclosing bracket if no business 
 //business logic. Otherwise retain the {} and put a "return" statement
 const App = () => { 
     
      const stories = [
        {
          title: 'React',
          url: 'https://reactjs.org/',
          author: 'Jordan Walke',
          num_comments: 3,
          points: 4,
          objectID: 0,
        },
        {
          title: 'Redux',
          url: 'https://redux.js.org/',
          author: 'Dan Abramov, Andrew Clark',
          num_comments: 2,
          points: 5,
          objectID: 1,
        },
       ]
       console.log('App component is rendered. This renders only on first rendering of the App')

       //this is state of the searchTerm refactored. It used to be in SearchComponent

       const [searchTerm, setSearchTerm] = React.useState('React');

       //this is the callback handler. It receives the value that was passed by the 
       //Search component whenever the user types something in the Search component.
       //For example when you type Tochi in the search input field the target.value "Tochi"
       //is passed to this callback handler
       const handleSearch = (event) => {
          setSearchTerm(event.target.value); //store the value in the state updater function - setSearchTerm.
          console.log('Value of data passed to parent component named App via  Callback Handler is = ' + event.target.value);
      };

      //Add this function
      //select the record from the list based on the filter
      //Here, the JavaScript array's built-in filter method is used 
      //to create a new filtered array. The filter() method takes a function 
      //as an argument, which accesses each item in the array and returns /
      //true or false. If the function returns true, meaning the condition is 
      //met, the item stays in the newly created array; if the function 
      //returns false, it's removed from the filtered array.

      // const searchedStories = stories.filter(function (story){
      //    return story.title.includes(searchTerm);
      // });

      //refactor the above by using arrow function with an immediate return
      const searchedStories = stories.filter((story) =>
         story.title.toLowerCase().includes(searchTerm.toLowerCase()) //you be able to search 'eact', "React", or 'react'
      );


      //We'll use React props to pass the list of stories to the List component
      //We'll use props to pass the "handleSearch" callback handler to search component
      //Refactor  <List list={stories}/> --> <List list={searchedStories}/>
      //Example passing 2 props to Search compnents  <Search search={searchTerm} onSearch={handleSearch}/>
      return (
         <div>
           <h1> My Hacker Stories</h1>
           <Search search={searchTerm} onSearch={handleSearch}/> 
           <hr />
           <List list={searchedStories}/>
         </div>
       );
    }

  //Search component now has a prop with a property of onSearch populated 
  //the name of the callback function named "handleSearch"
  const Search = (props) => {     //<-- Block body
        
    //Move this to  App component
    //const [searchTerm, setSearchTerm] = React.useState(''); 
     console.log('Search box is rendered. When you start typing on the search box' +
        ' only this component will render. App component will no longer render.')
            
    //refactor onChange={handleChange} --> onChange={props.onSearch}
    return(
    <div>
        <label htmlFor="search">Search</label>
        <input id="search" value={props.search} type="text" onChange={props.onSearch}/> 
        <p> 
          Searching for <strong>{props.search}</strong>
         </p>
     </div>
    )
  };
  

  //Instantiate Item component and using"map", instantiate "Item"
  //component" and pass each record to Item component as "props". 
  //item={item} means access of the record (item) and 
  //assign it to variable "item"
  const List = (props) =>  (
         <ul>
            {props.list.map((item) => (
              <Item key={item.objectID} item={item} />
            ))}
         </ul>
        
     );
           
  //Create another component that will display list of stories. This component called "Item" encapsulates the task of displaying each stories' record
  const Item = (props) => (
    
    <li>
      <span>
        <a href={props.item.url}>{props.item.title}</a>
      </span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>
    </li>
    
  );     

 

export default App;

//========================================================== 
//Note on Map:
 //Within the map() method, we have access to each object and its properties.

 //concatenating variables into a string
 //var fullName = `${firstName} ${lastName}`
 //console.log(fullName);


 //useState
 //By using useState, we are telling React that we want to have a 
 //stateful value which changes over time. And whenever this stateful value 
 //changes, the affected components (here: Search component) 
 //will re-render to use it (here: to display the recent value).