/* eslint-disable react/prop-types */
import React from "react";

const EditableRow = ({ticket, editFormData, handleEditFormChange, handleCancelClick}) => {
	return (
		<tr>
			<td>
				{ticket.id}
			</td>
			<td>
				<input 
					type="text"
					placeholder="Enter Ticket Number"
					name="serialNumber"
					required="required"
					onChange={handleEditFormChange}
					defaultValue={editFormData.serialNumber}
				/> 
			</td>
			<td><input 
				type="date"
				placeholder="Select Ticket Date"
				name="ticketDate"
				required="required"
				defaultValue={editFormData.ticketDate}
				onChange={handleEditFormChange}
			/></td>
			<td><input placeholder="Enter Secret Code"  name="secretCode" required="required" type="text" onChange={handleEditFormChange}/></td>
			<td className="NewRow">
				<button type="submit">Save</button> 
				<button type="button" onClick={handleCancelClick}>Cancel</button>
			</td>
		</tr>
	);
};

export default EditableRow;