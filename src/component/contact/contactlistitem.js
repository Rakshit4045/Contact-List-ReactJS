import React from 'react';
import {Link} from 'react-router-dom';
import './contactlistitem.css';

function ContactListItem({people}){

	return(
		<Link className="idLink" to={`/contacts/${people.id}`}>
			<div className="item">
				<img src={people.img}
					alt="profile"></img>
				<div className="content">
					 <h3>{people.name}</h3> 
				</div>
			</div>
		</Link>
	);
}
export default ContactListItem;