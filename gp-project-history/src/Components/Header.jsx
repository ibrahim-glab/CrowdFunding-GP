function Header({ onSortChange }) {
    const handleSort = (event) => {
        const selectedStatus = event.target.value;
        onSortChange(selectedStatus);
    };
    return (
        <div className="flex" id='header'>
            <h2 className="bg-[#4acd8d]">History Of Transactions</h2>
            <div>
                <select className="select-dropdown" onChange={handleSort}>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </div>
        </div>
    )
}

export default Header;