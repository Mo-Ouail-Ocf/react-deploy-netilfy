import Layout from './Layout'
import Home from './Home'
import PostPage from './PostPage'
import NewPost from './NewPost'
import About from './About'
import Missing from './Missing'
import EditPost from './EditPost'

import { DataProvider } from './context/DataContex'

import { Routes , Route  } from 'react-router-dom'

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>}/>
          <Route path='post'>
              <Route index element={<NewPost/>}/> 
              <Route path='edit/:id' element={<EditPost/>}/> 
              <Route
              path=':id' element={<PostPage/>}/>
          </Route> 
          <Route path='about' element={<About/>}/> 
          <Route path='*' element={<Missing/>}/> 
          <Route/>
          </Route>
          
      </Routes>
    </DataProvider>
  )
}

export default App
