
import ManagementSplitLayout from "../../components/Modals/Common/ManagementSplitLayout";
import RackList from "../../pages/RackManagement/RackList";
import AddRack from "../../pages/RackManagement/AddRack";

const RackStep = ({ onNext, onBack }) => {
  return (
    <ManagementSplitLayout
      ListComponent={<RackList />}
      FormComponent={<AddRack onNext={onNext} onBack={onBack} />}
    />
  );
};

export default RackStep;



