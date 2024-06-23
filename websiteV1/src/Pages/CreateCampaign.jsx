import Form from "../Components/createCampaign/Forms";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../Components/Animations/Progress.jsx";
import {
  useContract,
  useContractWrite,
  Web3Button,
  useStorageUpload,
} from "@thirdweb-dev/react";
import { contractABI } from "../constants/index.js";
import { ethers } from "ethers";

function CreateCampaign() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { mutateAsync: upload } = useStorageUpload();
  const {
    contract,
    isLoading: contractLoading,
    error,
  } = useContract(import.meta.env.VITE_CONTRACTADDRESS, contractABI);
  const { mutateAsync } = useContractWrite(contract, "createProject");
  const dialogRef = useRef();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
    verify: false,
  });

  // IPFS
  const uploadToIpfs = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }
    const uploadUrl = await upload({
      data: [file],
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true,
      },
    });
    console.log("uploadUrl: ", uploadUrl);
    return uploadUrl;
  };

  const handleFormFieldChange = async (fieldName, e) => {
    if (fieldName !== "image")
      setForm((prevForm) => ({ ...prevForm, [fieldName]: e.target.value }));
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // STORE Data in campaign
  const handleData = async () => {
    const uploadedUrl = await uploadToIpfs();
    console.log("uploadedUrl: ", uploadedUrl);

    // If the upload was successful, update form.image with the uploaded URL
    const campaignData = [
      form.title,
      form.description,
      uploadedUrl[0],
      Math.floor(new Date(form.deadline).getTime() / 1000), // convert to UNIX timestamp
      ethers.utils.parseEther(form.target),
      0, // Assuming 0 for CampaignType
      form.verify,
    ];

    console.log("Form submitted:", campaignData);
    return campaignData;
  };
  const performAction = () => {
    dialogRef.current.openDialog();
  };
  const handleDataLoading = async () => {
    setIsLoading(true);
    try {
      performAction();
      const campaignData = await handleData();
      await mutateAsync({ args: [...campaignData] });
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating campaign:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="create-campaign bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        <Dialog ref={dialogRef} load={isLoading} />
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Create New Campaign
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 w-full flex flex-col gap-[30px]"
        >
          <Form
            labelName={"Name *"}
            placeholder={"Enter Your Name"}
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <Form
            labelName={"Title *"}
            placeholder={"Enter Campaign Title"}
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
          <Form
            labelName={"Description *"}
            placeholder={"Enter Campaign Title"}
            inputType="text"
            isTextArea={true}
            value={form.description}
            handleChange={(e) => handleFormFieldChange("description", e)}
          />
          <Form
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <Form
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
          <Form
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="file"
            handleChange={(e) => handleFormFieldChange("image", e)}
          />
          <label className="form-control">
            <input
              type="checkbox"
              name="checkbox"
              checked={form.verify}
              onChange={(e) => setForm({ ...form, verify: e.target.checked })}
            />
            Verify Your Campaign ? *
          </label>
          <div className="flex justify-center items-center mt-[40px]">
            <button
              type="submit"
              className="bg-[#1dc071] font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-fit hidden"
            >
              Submit Campaign
            </button>
            <Web3Button
              contractAddress={import.meta.env.VITE_CONTRACTADDRESS}
              action={handleDataLoading}
              style={{ color: "white", backgroundColor: "#2c645b" }}
              type="submit"
              deadline
            >
              Submit
            </Web3Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateCampaign;
