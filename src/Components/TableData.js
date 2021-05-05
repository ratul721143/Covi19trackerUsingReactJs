import React from 'react'
import './TableData.css';

function TableData({tableData}) {
    return (
        <div className="table">
            {
                tableData.map((country,index) =>(
                    <tr key={index} className="table__row">
                        <td>{country.country}</td>
                        <td><strong>{country.cases}</strong></td>
                    </tr>
                ))
            }
            
        </div>
    )
}

export default TableData;
