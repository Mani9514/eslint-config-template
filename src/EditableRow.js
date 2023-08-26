/* eslint-disable react/prop-types */
import React from "react";

const EditableRow = ({editFormData, handleEditFormChange}) => {
	return (
		<tr>
			<td>
			</td>
			<td>
				<input 
					type="text"
					placeholder="Enter Serial Number"
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
			<td>
				<button type="submit">Save</button> 
				<button>Cancel</button>
			</td>
		</tr>
	);
};

export default EditableRow;