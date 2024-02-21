import Form from "../Components/createCampaign/Forms";
import { lazily } from 'react-lazily';
import { Suspense } from 'react';
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Progress from "../Components/Animations/Progress";
import { SendTransaction, useNotification } from "web3uikit";
import myData from '../../ABI.json';
import { getChain } from "react-moralis";
function CreateCampaign() {
    console.log(getChain);
    const Abi = JSON.stringify(myData)
    const contractaddress =  "  ";

    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: '',
        verify: false
    });
    const dialogRef = useRef();
    const handleFormFieldChange = (fieldName, e) => {
        setForm(prevForm => ({ ...prevForm, [fieldName]: e.target.value }));
    }
    const performAction = () => {
        // Call the function to open the dialog
        dialogRef.current.openDialog();
        // Perform other actions as needed
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        setForm({
            name: '',
            title: '',
            description: '',
            target: '',
            deadline: '',
            image: '',
            verify: false
        })
        console.log("Form submitted:", form);
        performAction();
    };
    return (

        <>
           <Suspense fallback={<>Loading...</>}>
            <div className="create-campaign bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
                <Progress ref={dialogRef} />
                <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                    <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create New Campaign</h1>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 w-full flex flex-col gap-[30px]">
                    <Form
                        labelName={"Name *"}
                        placeholder={"Enter Your Name"}
                        inputType="text"
                        value={form.name}
                        handleChange={(e) => handleFormFieldChange('name', e)}
                        className={`transition-opacity duration-500 ${form.name === '' ? 'opacity-0' : 'opacity-100'}`}
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
                        inputType="number"
                        value={form.target}
                        handleChange={(e) => handleFormFieldChange('target', e)}
                        className={`transition-opacity duration-500 ${form.target === '' ? 'opacity-0' : 'opacity-100'}`}
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
                        className={`transition-opacity duration-500 ${form.image === '' ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <label className="form-control">
                        <input type="checkbox" name="checkbox" checked={form.verify} onChange={(e) => setForm({ ...form, verify: e.target.checked })} />
                        Verify Your Campaign ? *
                    </label>
                    <div className="flex justify-center items-center mt-[40px]">
                    <SendTransaction
                                chainId = '11155111'
                                contractOptions={{ abi: Abi, address: contractaddress ,params: [50 , 3 , 0 , false ]}}
                                buttonConfig={{
                                    text: 'Send',
                                    theme: 'primary',
                                    type: 'submit',
                                }}
                            />
                    </div>
                </form>
            </div>
            </Suspense>
        </>
    )
}
export default CreateCampaign;

/*  uint256 minimumContribution,
        uint256 durationInDays,
        uint256 goal,
        CampaignType campType,
        bool verified*/