

// Fixing the UI and coding
import ManagementSplitLayout from "../../components/Modals/Common/ManagementSplitLayout";
import AddRackCluster from "../RackClusterManagement/AddRackCluster";
import RackClusterList from "../RackClusterManagement/RackClusterList";

const RackClusterStep = ({ onBack, onNext,  onFinish }) => {
  return (
    <ManagementSplitLayout
  ListComponent={<RackClusterList />}
  FormComponent={<AddRackCluster onNext={onNext} onBack={onBack} onFinish={onFinish}  />}
/>
  );
};

export default RackClusterStep;





