import logo from './logo.svg';
import './App.css';
import EmployeeList from './components/EmployeeList';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeUpdate from './components/EmployeeUpdate';
import EmployeeCreate from './components/EmployeeCreate';
import UserLogin from './components/UserLogin';
import UserSignUp from './components/UserSignUp';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
      <div>
          <BrowserRouter>
            <AuthProvider>
                    <Routes>
                        <Route path='/' element={<UserLogin/>}></Route>
                        <Route path='/user/signup' element={<UserSignUp/>}></Route>
                        <Route path='/employee' element={ <PrivateRoute><EmployeeList/></PrivateRoute>}></Route>
                        <Route path='/employee/details/:employeeId' element={ <PrivateRoute><EmployeeDetails/></PrivateRoute>}> </Route>
                        <Route path='/employee/update/:employeeId' element={ <PrivateRoute><EmployeeUpdate/></PrivateRoute>}> </Route>
                        <Route path='/employee/create' element={<PrivateRoute><EmployeeCreate/></PrivateRoute>}> </Route>
                    </Routes>
            </AuthProvider>
          </BrowserRouter>
      </div>
  );
}

export default App;
