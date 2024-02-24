function Data({ walletID, name, index, children }) {
    return (
        <tr className={"data-roww"}>
            <td>{walletID}</td>
            <td>{name}</td>
            {children}
        </tr>
    )
}
export default Data;