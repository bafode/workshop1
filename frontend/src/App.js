
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';

const App=()=> {
  return (
    <Router>
      <div className="App">
      <Navbar />
      <div className="container">  
     
        {/* <Routes>
          <Route exact path='/' element={
            <>
              <Fragment>
                <Search
                searchPictures={searchPictures}
                clearPicture={clearPictures}
                showClear={pictures.length > 0 ? true : false}
                setAlert={showAlert}
                />
                <Pictures pictures={pictures} loading={loading} />
              </Fragment>  
            </>
          } />
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='*' element={<Notfound/>}/>
        </Routes> */}
      </div>
    </div>
    </Router>
  );
}

export default App;
