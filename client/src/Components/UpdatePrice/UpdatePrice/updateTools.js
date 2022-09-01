export function checkIfProductIsUpdated(lastUpdatedMonth, lastUpdatedDay, currentMonth, currentDay, messageType){
    console.log(lastUpdatedMonth, lastUpdatedDay, currentMonth, currentDay );
    let sinceMonth = currentMonth - lastUpdatedMonth
    
    let sinceDay = currentDay - lastUpdatedDay + 1
    
    let updatedMessage = <div>

        {'Producto Actualizado hace '} <span style={ {
            backgroundColor: sinceMonth !== 0 ? 'red' : 'green',
            color: 'white',
            padding: '3px'
        
        
        } }>{sinceMonth}</span> {' meses y '} <span  style={ {
            backgroundColor: sinceDay >= 12 ? sinceDay >=20 ? 'red' : 'orange' : 'green',
            color: 'white',
            padding: '3px'
            } }>{sinceDay}</span> {' días'}

    </div>
    let onlyMessageNumbers = <div>
        <span style={ {
            backgroundColor: sinceMonth !== 0 ? 'red' : 'green',
            color: 'white',
            padding: '3px'
        
        
        } }>{sinceMonth}</span>
        <span style={ {
            backgroundColor: sinceDay >= 12 ? sinceDay >=20 ? 'red' : 'orange' : 'green',
            color: 'white',
            padding: '3px'
            } }>{sinceDay}</span>
    </div>
    if(messageType === 'onlyNumbers'){
        return onlyMessageNumbers
    }
    if(sinceMonth > 0){
        return 'Desactualizado'
    }
    else{
        return updatedMessage

    }
    
}   