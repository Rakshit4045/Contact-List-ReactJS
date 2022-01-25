import React from 'react';
import ContactListItem from '../contact/contactlistitem'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import './home.css';

function Home({contact}){

	const [searchBtn, setSearchBtn] = React.useState(false);

	React.useEffect(() => {
		if(contact.length === 0){
			setSearchBtn(false);
		}else{
			setSearchBtn(true);
		}
	},[contact.length, searchBtn]);


	return(
		<div className="contact-list">		
			<div className="head">
				<strong>Contacts</strong>
				<div className='btns'>
					{ searchBtn ? <Link className="search-link" to='/searchcontact'> < FontAwesomeIcon className="search-btn" icon={ faSearch }/> </Link> : <p style={{display: 'none'}}></p>}
					<Link to='/addcontact'><FontAwesomeIcon className="add" icon={ faPlus }/></Link>
				</div>
			</div>

			<div className="list">
				{
					contact.map((people) => {
						return(
							<ContactListItem key={people.id} people={people}/>
						);
					})					
				}
			</div>
			 
		</div>
	);
}

export default Home;

