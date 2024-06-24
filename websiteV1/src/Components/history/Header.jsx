function Headerr({ onFilterChange, onSortChange, pageTitle }) {
    const handleChange = (event) => {
        const selectedStatus = event.target.value;
        onFilterChange(selectedStatus);
    };

    const handleSort = (event) => {
        const selectedSort = event.target.value;
        onSortChange(selectedSort);
    };

    return (
        <div className="flex" id='header'>
            <h2 className="bg-[#4acd8d]">{pageTitle}</h2>
            <div>
                {/* Conditionally render the filtering dropdown for the Request Page */}
                {pageTitle === "Requests" && (
                    <select className="select-dropdown mr-[5px]" onChange={handleChange}>
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="successful">Successful</option>
                        <option value="failed">Failed</option>
                    </select>
                )}
                <select className="select-dropdown" onChange={handleSort}>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </div>
        </div>
    );
}

export default Headerr;