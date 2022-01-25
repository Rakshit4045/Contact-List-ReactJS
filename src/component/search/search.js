import React from 'react';
import ContactListItem from '../contact/contactlistitem'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './search.css';

function Search({contact}){

	const [name, setName] = React.useState('');
	const [person, setPerson] = React.useState([]);

	 const filteredContacts = name.length === 0 ? person : 
	 contact.filter(data => data.name.toLowerCase().includes(name.toLowerCase()));


	return(
		 <div className="search"> 
		 	<div className="search-bar">
		 		<FontAwesomeIcon className="add" icon={ faSearch }/>
		 		<input 
			 		type="text"
			 		value={name}
			 		placeholder="Search"
			 		onChange={(e) => {
			 			setName(e.target.value);
			 		}}
			 	></input> 
		 		<Link to='/'><button>cancel</button></Link>
		 	</div>
		 	<div className="result">
		 		{
		 			filteredContacts.map((people) =>{
		 				return(
							<ContactListItem key={people.id} people={people}/>
						);
		 			})
		 		}
		 	</div> 
		 </div> 
	);
}

export default Search;