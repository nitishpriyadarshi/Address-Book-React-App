import AddressBookForm from "./components/AddressBookForm";
import { Routes, Route, Router } from "react-router-dom";
import './App.css';
import AddressBookHome from "./components/AddressBookHome";
import Header from "./Header";
//import { Router } from "express";


function App() {
  return (
    <div>
      
      <Routes>

        <Route path="/form" element={<AddressBookForm />} />
        <Route path="/" element={<AddressBookHome />} />
        <Route path="/form/:id" element={<AddressBookForm />} />


      </Routes>
    </div>
  );
}

export default App;