function HistoryData({ walletID, title, date, amount, index }) {
    return (
        <tr className={`data-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
            <td>{walletID}</td>
            <td><a href="#">{title}</a></td>
            <td>{date}</td>
            <td>{amount}</td>
        </tr>
    )
}
export default HistoryData;