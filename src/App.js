import "./App.css";
import {nanoid} from "nanoid";
import {React, useState} from "react";
import data from "./data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
// import { useEffect } from "react";
function App() {
	var [date,setDate] = useState(new Date());
	console.log(setDate);
	const [tickets, setTickets] = useState(data);
	const [search, setSearch] = useState("");
	console.log(search);
	const [addFormData, setAddFromData] = useState({
		serialNumber:"",
		ticketDate:"",
		addedOn:new Date().toLocaleString() + "",
		secretCode:"Mathiga@9514"
	});

	const[editFormData, setEditFormData]=useState({
		serialNumber:"",
		ticketDate:"",
		addedOn:new Date().toLocaleString() + "",
		secretCode:"Mathiga@9514"
	});

	const [editTicketId, setEditTicketId] = useState(null);

	const handleAddFormChange = (event) =>{
		event.preventDefault();
		const fieldName =event.target.getAttribute("name");
		const fieldValue = event.target.value;
		const newFormData = {...addFormData};
		newFormData[fieldName] = fieldValue;
		setAddFromData(newFormData);
	};

	const handleEditFormChange =(event) =>{
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = {...editFormData};
		newFormData[fieldName] = fieldValue;
		
		setEditFormData(newFormData);
	};

	const handleAddFormSubmit = (event) =>{
		event.preventDefault();
		const newContact={
			id: nanoid(),
			serialNumber:addFormData.serialNumber,
			ticketDate:addFormData.ticketDate,
			addedOn:addFormData.addedOn,
		};
		const newContacts =[...tickets, newContact];
		setTickets(newContacts);
		
	};

	const handleEditFormSubmit = (event) =>{
		event.preventDefault();
		const editedTicket={
			id: editTicketId,
			serialNumber:editFormData.serialNumber,
			ticketDate:editFormData.ticketDate,
			addedOn:editFormData.addedOn,
		};
		
		const newTickets =[...tickets];
		console.log(tickets,"dsa");
		console.log(tickets.id,"Manikandan Thirupathi");
		const index = tickets.findIndex((ticket)=>ticket.id === editTicketId);
		
		newTickets[index] = editedTicket;
		console.log(editedTicket,"dsa");
		setTickets(newTickets);
		setEditTicketId(null);

	};
	const handleEditClick = (event, ticket) =>{
		event.preventDefault();
		setEditTicketId(ticket.id);

		const formValues ={
			serialNumber: ticket.serialNumber,
			ticketDate: ticket.ticketDate,
			secretCode:"Mathiga@9514",
			addedOn:addFormData.addedOn,
		};
		setEditFormData(formValues);
	};

	const handleCancelClick = () =>{
		setEditTicketId(null);
	};

	return (
		<div className="app-container">
			<div className="innerContainerheading">
				<div>
					<h1>Lottery Ticket Details</h1>
					<p>Total Data Available - {tickets.length} </p>
				</div>
				<p style={{textAlign:"right"}}> {date.toLocaleDateString()+"     "+ date.toLocaleTimeString()}</p>
			</div>
			<div className="tableOuterContainer">
				<div className="searchSection">
					<input 
						type="search"
						placeholder="Search Ticker Number..."
						name="searchTicket"
						onChange={(e)=>setSearch(e.target.value)}
					/>
					<button>Login</button>
				</div>
				<form onSubmit={handleEditFormSubmit} className="tableContainer">
					<table>
						<thead>
							<tr>
								<th>S.No</th>
								<th>Ticket Number</th>
								<th>Ticket Date</th>
								<th>Added on</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{tickets.filter((item)=>{
								return search.toLowerCase()=== ""? item : item.serialNumber.toLowerCase().includes(search);
							}).map((ticket)=>(
								<>
									{console.log(tickets.length)}
									{editTicketId === ticket.id  ?(
										<EditableRow 
											editFormData={editFormData} 
											key={ticket.id}
											ticket={ticket} 
											handleEditFormChange={handleEditFormChange}
											handleCancelClick={handleCancelClick}
										/> 
									)
										: 
										<ReadOnlyRow 
											handleEditClick={handleEditClick} 
											key={ticket.id} 
											ticket={ticket} 
										/>}
								</>
							))}
						</tbody>
					</table>
				</form>
			</div>
			
			<h2>Add New Ticket</h2>
			<form onSubmit={handleAddFormSubmit} className="secondForm">
				<input 
					type="text"
					placeholder="Enter Ticket Number"
					name="serialNumber"
					required="required"
					onChange={handleAddFormChange}
				/> 
				<input 
					type="date"
					placeholder="Select Ticket Date"
					name="ticketDate"
					required="required"
					onChange={handleAddFormChange}
				/> 
				<input placeholder="Enter Secret Code" onChange={handleAddFormChange} name="secretCode" required="required" type="text"/>
				<button type="submit">Add</button>
			</form>
		</div>
	);
}

export default App;
