
import './index.css';  
import "./App.css";
import SideBar from "./Components/SideBar";
import NavBar from  "./Components/NavBar"
function App() {
  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <SideBar />
         
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <NavBar />
        </div>
      </div>
    </>
  );
}

export default App;
