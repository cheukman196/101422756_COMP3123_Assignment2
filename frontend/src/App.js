import logo from './logo.svg';
import './App.css';
import EmployeeList from './components/EmployeeList';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeUpdate from './components/EmployeeUpdate';
import EmployeeCreate from './components/EmployeeCreate';
import UserLogin from './components/UserLogin';
import UserSignUp from './components/UserSignUp';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmployeeList/>}></Route>
          <Route path='/employee' element={<EmployeeList/>}></Route>
          <Route path='/employee/details/:employeeId' element={<EmployeeDetails/>}></Route>
          <Route path='/employee/update/:employeeId' element={<EmployeeUpdate/>}></Route>
          <Route path='/employee/create' element={<EmployeeCreate/>}></Route>
          <Route path='/user/login' element={<UserLogin/>}></Route>
          <Route path='/user/signup' element={<UserSignUp/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
