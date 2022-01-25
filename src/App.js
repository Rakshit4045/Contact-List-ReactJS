import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './component/home/home';
import ContactForm from './component/form/form';
import Search from './component/search/search';
import Profile from './component/profile/profile';
import ErrorPage from './component/error/errorpage';

function App() {
  const [contact, setContact] = React.useState([]);
  const [type, setType] = React.useState('add');
  const [editForId, setEditForId] = React.useState(0);
  const passVal = {type,editForId};

  const addContact = (name, phoneNum, email, img, type) => {
    if(type === 'add'){
      const id = contact.length + 1;
      const newObj = {id, name, phoneNum, email, img};
      setContact([...contact, {...newObj}]);
    }else{
      contact.filter((data) => {
        if(data.id === editForId){
          data.name = name;
          data.phoneNum = phoneNum;
          data.email = email;
          data.img = img;
        }
      })
      setType('add');
    }
  }

  const fetchId = (id) => {
    const newContact = contact.filter((data) => id !== data.id);
    setContact([...newContact]); 
  }

  const checkType = (type, id) => {
    setType(type);
    setEditForId(id);
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home contact={contact} />}/>
        <Route path="/addcontact" element={<ContactForm contact={contact}  addContact={addContact} passVal={passVal}/>} />
        <Route path="/searchcontact" element={<Search contact={contact} />}/>
        <Route path='/contacts/:val' element={<Profile contact={contact} fetchId={fetchId} checkType={checkType}/>}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
