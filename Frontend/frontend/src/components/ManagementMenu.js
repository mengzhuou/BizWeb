import { useNavigate } from "react-router-dom";

const ManagementMenu = () => {
  const navigate = useNavigate();
  const handleRegisterEmployee = () => {
    navigate("/registerEmployee");
  };

  const handleExistingEmployee = () => {
    navigate("/manageEmployee");
  };

  const handleExistingClient = () => {
    navigate("/manageClient");
  };

  const handleFinancialReport = () => {
    navigate("/financialReport");
  };

  const content = (
        <>
          <h1 className="text-xl font-bold">Management Menu</h1>
          <div className="menuButtonContainer">
            <button className="menuButton" onClick={handleRegisterEmployee}>
              Register a New Employee
            </button>
            <button className="menuButton" onClick={handleExistingEmployee}>
              Manage Employees
            </button>
            <button className="menuButton" onClick={handleExistingClient}>
              Manage Clients
            </button>
            <button className="menuButton" onClick={handleFinancialReport}>
              Financial Reports
            </button>
          </div>
        </>
  );
  return content;
};
export default ManagementMenu;
