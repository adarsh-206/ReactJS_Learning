import React, {useState, useEffect} from 'react';
import './App.css';
import View from './components/View';

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem('books')
  if(data) {
    return JSON.parse(data);
  }
  else{
    return []
  }
}

function App() {
  
  // main array of objects
  const [books, setbooks] = useState(getDatafromLS());

  // input field state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('');
  
  // form submit event
  const handleAddBooksSubmit = (e) => {
      e.preventDefault();
      // creating an object
      let book = {
          title,
          author,
          isbn
      }
      setbooks([...books,book])
      setAuthor('');
      setTitle('');
      setIsbn('');
  }

// saving data to local storage (we can only save string in localStorage not object or array of object)
useEffect(() => {
   localStorage.setItem('books', JSON.stringify(books));
}, [books])

// delete book from LS 
const deleteBook = (isbn) => {
  const filteredBooks=books.filter((element,index)=>{
      return element.isbn !== isbn
  })
  setbooks(filteredBooks);
}

  return (    
   <div className='wrapper'>
      <h1>BookList App</h1>
      <p>Add and view your books using local storage</p>
      <div className='main'>
         <div className='form-container rounded-3'>
              <form autoComplete='off' className='form-group' onSubmit={handleAddBooksSubmit}>
                  <label>Title</label>
                  <input type="text" className='form-control' required
                  onChange={(e) => setTitle(e.target.value)} value={title}></input>
                  <br></br>
                  <label>Author</label>
                  <input type="text" className='form-control' required
                  onChange={(e) => setAuthor(e.target.value)} value={author}></input>
                  <br></br>
                  <label>ISBN</label>
                  <input type="text" className='form-control' required
                  onChange={(e) => setIsbn(e.target.value)} value={isbn}></input>
                  <br></br>
                  <button type='submit' className='btn btn-success btn-md'>Submit</button>
              </form>
         </div>
         <div className='view-container rounded-3'>
              {books.length > 0 && 
              <>
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>ISBN</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View books={books} deleteBook={deleteBook}/>
                  </tbody>
                </table>
              </div>
              <button class="btn btn-danger btn-md"
              onClick={() => setbooks([]) }>Remove All</button>
              </>}
             {books.length < 1 && <div>No books are yet</div>}
         </div>
      </div>
   </div>
  );
}

export default App;
