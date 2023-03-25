import React from 'react';
import BackupTickets from './BackupTickets/BackupTickets';
import UploadTickets from './UploadTickets/UploadTickets';
function RestoreTickets() {
    return ( <>
        <h1>RESTORE TICKETS</h1>
        <BackupTickets></BackupTickets>
        <UploadTickets></UploadTickets>
    
    </> );
}

export default RestoreTickets;