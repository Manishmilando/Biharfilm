import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import ShootingPermissionForm from "./ShootingPermissionFoam";
const YourComponent = () => {
  const navigate = useNavigate();

  const handleApplyClick = useCallback((e) => {
    e.preventDefault();
    
      navigate("/login");
    }
  , );

  return (
    <div>
        
    </div>
  );
};

export default YourComponent;
