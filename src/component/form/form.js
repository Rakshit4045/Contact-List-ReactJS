import React,{ useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUser, faMobile, faEnvelope, faUpload, faSync } from '@fortawesome/free-solid-svg-icons'
import './form.css';

function ContactForm({contact, addContact, passVal}){
	let imgUrl = "https://tse1.mm.bing.net/th?id=OIP.ZT-Tw8tYy38htqch69vsGQAAAA&pid=Api&rs=1&c=1&qlt=95&w=108&h=108";
	const [img, setImg] = useState(imgUrl);
	const [name, setName] = useState("");
	const [phoneNum, setPhoneNum] = useState("");
	const [email, setEmail] = useState("");
	const [validPhoneNum, setValidPhoneNum] = useState(false); 
	const [validName, setValidName] = useState(false);
	const [validEmail, setValidEmail] = useState(false);

	const hiddenFileInput = useRef(null);

	const { type, editForId} = passVal;

	useEffect(() => {
		if(type === 'edit'){
			contact.filter((data) => {
				if(data.id === editForId){
					setImg(data.img);
					setName(data.name);
					setEmail(data.email);
					setPhoneNum(data.phoneNum);
				}
				return true;
			})
		}
	}, [contact, editForId, type])

	useEffect(() => {
		contact.filter((data) => {
			if(data.phoneNum === phoneNum){
				setValidPhoneNum(true);
			}else if(data.name === name){
				setValidName(true);
			}else if(data.email === email){
				setValidEmail(true);
			}else{
				setValidPhoneNum(false);
				setValidName(false);
				setValidEmail(false);
			}
			return true;
		});
	})

	const handleSubmit = (e) => {
		if(name === "" || phoneNum === "" || email === ""){
			e.preventDefault();
			alert("Please enter all values");
			return false;
		}else if(validPhoneNum === true && type !== 'edit'){
			e.preventDefault();
			alert("Number already exits");
		}else if(validName === true && type !== 'edit'){
			e.preventDefault();
			alert("Name already exits");
		}else if(validEmail === true  && type !== 'edit'){
			e.preventDefault();
			alert("Email already exits");
		}else{
			addContact(name, phoneNum, email, img, type);
			setName(""); 
			setPhoneNum(""); 
			setEmail(""); 	
		}
	}

	const handleClick = (event) => {
		event.preventDefault();
		hiddenFileInput.current.click();
	};

	const handleChange = (event) => {
		event.preventDefault();
		const fileUploaded = event.target.files[0];
		let url = URL.createObjectURL(fileUploaded);
		setImg(url);
		console.log(url);
	}


	return(
		<form className="contact-form" >
			<Link className="font-icon" to='/'><FontAwesomeIcon icon={ faTimes }/></Link>
			<div>
				<img src={img} alt="profile" ></img>
				<button className="img-btn" onClick={handleClick}>
					{ img === imgUrl ? <FontAwesomeIcon className="upload" icon={ faUpload } /> : <FontAwesomeIcon className="upload" icon={ faSync } />}
				</button>
				<input className="img" ref={hiddenFileInput} type="file" name="myImage" onChange={handleChange}></input>
			</div>
			<section>
				<label htmlFor="name"><FontAwesomeIcon className="icon" icon={ faUser }/></label>
				<input 
					type="text" 
					placeholder="Enter name"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				>
				</input>
			</section>
			<section>
				<label htmlFor="contactNumber"><FontAwesomeIcon className="icon" icon={ faMobile }/></label>
				<input 
					type="text" 
					placeholder="Enter Phone Number"
					name="phoneNumber"
					value={phoneNum}
					onChange={(e) => setPhoneNum(e.target.value)}
					required	
				>
				</input>
			</section>
			<section>
				<label htmlFor="email"><FontAwesomeIcon className="icon" icon={ faEnvelope }/></label>
				<input 
					type="email" 
					placeholder="Enter Email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				>
			</input>
			</section>
			<Link className="btn-link" to='/'><button className="submit" type="submit" onClick={handleSubmit}>Submit</button></Link>
		</form>
	);
}

export default ContactForm;