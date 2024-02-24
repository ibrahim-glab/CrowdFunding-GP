function Data({ walletID, title, date, amount, status, index }) {
    return (
        <tr className={`data-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
            <td>{walletID}</td>
            <td><a href="#">{title}</a></td>
            <td>{date}</td>
            <td>{amount}</td>
            {status && <td>{status}</td>}
        </tr>
    )
}
export default Data;