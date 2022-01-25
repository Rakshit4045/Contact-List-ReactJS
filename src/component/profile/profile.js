import React,{ useEffect,useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faUserEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import './profile.css';

function Profile({contact, fetchId, checkType}){

	const [person,setPerson] = useState({});
	const {val} = useParams();
	
	useEffect(() => {
		const newPerson = contact.filter((data) => data.id === parseInt(val));
		setPerson(...newPerson);
	},[contact, val]);

 	const {id, name, img, phoneNum, email} = person;

	return(
		<div className="card">
			<Link className="cancel-icon" to='/'><FontAwesomeIcon icon={ faTimes }/></Link>
			<img className="profile-img" src={img} alt="profile" />
			 <div className="info"> 
			 	<p><strong>Name :</strong></p><p> {name}</p> 
			 	<p><strong>Phone :</strong></p><p> {phoneNum}</p> 
			 	<p><strong>Email  : </strong></p><p> {email}</p> 
			 </div> 
			 <div className="profile-btn"> 
			 	<button onClick={() => checkType('edit', id)}>
			 		<Link className="profile-link-btn" to='/addcontact'>
			 			<p>Edit</p>
			 			<FontAwesomeIcon icon={ faUserEdit }>
			 			</FontAwesomeIcon>
			 		</Link>
			 	</button> 
			 	<button onClick={() => fetchId(id)}>
			 		<Link className="profile-link-btn" to='/'>
			 			<p>Delete</p> 
			 			<FontAwesomeIcon icon={ faTrash }>
			 			</FontAwesomeIcon>
			 		</Link>
			 	</button> 
			 </div> 
		</div>
	)
}

export default Profile;