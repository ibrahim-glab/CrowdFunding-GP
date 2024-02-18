import Form from "../Components/createCampaign/Forms";
import { useState } from "react";
import Verify from "../Components/createCampaign/VerifyCampaign";
function CreateCampaign() {
    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: '',
        verify: false
    });
    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }
    return (
        <div className="create-campaign bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create New Campaign</h1>
            </div>
            <form className="mt-8 w-full flex flex-col gap-[30px]">
                <Form
                    labelName={"Name *"}
                    placeholder={"Enter Your Name"}
                    inputType="text"
                    value={form.name}
                    handleChange={(e) => handleFormFieldChange('name', e)}
                />
                <Form
                    labelName={"Title *"}
                    placeholder={"Enter Campaign Title"}
                    inputType="text"
                    value={form.title}
                    handleChange={(e) => handleFormFieldChange('title', e)}
                />
                <Form
                    labelName={"Description *"}
                    placeholder={"Enter Campaign Title"}
                    inputType="text"
                    isTextArea={true}
                    value={form.description}
                    handleChange={(e) => handleFormFieldChange('description', e)}
                />
                <Form
                    labelName="Goal *"
                    placeholder="ETH 0.50"
                    inputType="text"
                    value={form.target}
                    handleChange={(e) => handleFormFieldChange('target', e)}
                />
                <Form
                    labelName="End Date *"
                    placeholder="End Date"
                    inputType="date"
                    value={form.deadline}
                    handleChange={(e) => handleFormFieldChange('deadline', e)}
                />
                <Form
                    labelName="Campaign image *"
                    placeholder="Place image URL of your campaign"
                    inputType="file"
                    image={"image/*"}
                    value={form.image}
                    handleChange={(e) => handleFormFieldChange('image', e)}
                />
                <label className="form-control">
                    <input type="checkbox" name="checkbox" checked={form.verify} onChange={(e) => setForm({ ...form, verify: e.target.checked })} />
                    Verify Your Campaign ? *
                </label>
                <div className="flex justify-center items-center mt-[40px]">
                    <button type="submit" className="bg-[#1dc071] font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]  w-fit">
                        Submit Campaign
                    </button>
                </div>
            </form>
        </div>
    )
}
export default CreateCampaign;