import "./App.css";
import {nanoid} from "nanoid";
import {React, useState} from "react";
import data from "./data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
function App() {
	const [tickets, setTickets] = useState(data);
	const [editTicket, setEditTicket] = useState(null);
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
		setEditTicket(ticket.id);

		const formValues ={
			serialNumber: ticket.serialNumber,
			ticketDate: ticket.ticketDate,
			secretCode:"Mathiga@9514",
			addedOn:addFormData.addedOn,
		};
		setEditFormData(formValues);
	};
	return (
		<div className="app-container">
			<form onSubmit={handleEditFormSubmit}>
				<table>
					<thead>
						<tr>
							<th>S.No</th>
							<th>Serial Number</th>
							<th>Ticket Date</th>
							<th>Added on</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{tickets.map((ticket)=>(
							<>
								{editTicket === ticket.id ?(
									<EditableRow 
										editFormData={editFormData} 
										key={ticket.id}
										handleEditFormChange={handleEditFormChange} 
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
			<h2>Add New Ticket</h2>
			<form onSubmit={handleAddFormSubmit}>
				<input 
					type="text"
					placeholder="Enter Serial Number"
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
