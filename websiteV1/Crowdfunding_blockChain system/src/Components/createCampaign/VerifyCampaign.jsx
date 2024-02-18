function Verify({ labelName, handleChange }) {
    const handleCheckboxChange = (e) => {
        handleChange(e.target.checked ? 'Yes' : 'No');
    };
    return (
        <label className="flex-1 flex flex-col w-fit">
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{labelName}</span>
            <input
                type="checkbox"
                checked // If the value is 'Yes', checkbox is checked
                onChange={handleCheckboxChange} // Toggle between 'Yes' and 'No' when clicked
                className="mr-2"
            />
        </label>
    )
}
export default Verify;