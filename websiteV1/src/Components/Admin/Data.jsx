function Data({ title, owner, index, children }) {
    return (
        <tr className={"data-roww"}>
            <td>{owner}</td>
            <td>{title}</td>
            {children}
        </tr>
    )
}
export default Data;