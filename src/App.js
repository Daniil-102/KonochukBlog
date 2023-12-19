import Container from "@mui/material/Container";
import {Routes, Route} from 'react-router-dom'
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, Tags } from "./pages";
import { useGetMeQuery } from "./redux/auth/auth.api";
import { useDispatch, useSelector } from 'react-redux'
import { changeAuth } from "./redux/slices";


function App() {

  const dispatch = useDispatch()
  const {data: getMe, isLoading: getMeLoading} = useGetMeQuery()
  const isAuth = !!getMe;
  dispatch(changeAuth(isAuth));

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/tag/:id' element={<Tags/>}/>
          <Route path='/posts/create' element={<AddPost/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/posts/:id' element={<FullPost/>}/>
          <Route path='/posts/:id/edit' element={<AddPost/>}/>
          <Route path='/register' element={<Registration/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
