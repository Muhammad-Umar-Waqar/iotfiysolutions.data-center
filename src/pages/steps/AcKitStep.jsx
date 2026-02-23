
import ManagementSplitLayout from "../../components/Modals/Common/ManagementSplitLayout";
import AddAcKit from "../../pages/AckitManagement/AddAckit"
import AckitList from "../../pages/AckitManagement/AckitList"

const AcKitSteps = ({ onNext, onBack }) => {
  return (
   <ManagementSplitLayout
  ListComponent={<AckitList />}
  FormComponent={<AddAcKit onNext={onNext} onBack={onBack} />}
/>
  );
};

export default AcKitSteps;

