/* eslint-disable react/prop-types */
import React from "react";

const ReadOnlyRow = ({ ticket, handleEditClick}) => {
	return (
		<tr >
			<td>{ticket.id}</td>
			<td>{ticket.serialNumber}</td>
			<td>{ticket.ticketDate}</td>
			<td>{ticket.addedOn}</td>
			<td><button type="button" onClick={(event)=>handleEditClick(event, ticket)}>Edit</button></td>
		</tr>
	);
};

export default ReadOnlyRow;