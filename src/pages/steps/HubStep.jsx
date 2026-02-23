


import ManagementSplitLayout from "../../components/Modals/Common/ManagementSplitLayout";

import HubList from "../../pages/HubManagement/HubList"
import AddHub from "../../pages/HubManagement/AddHub"
const HubStep = ({ onNext, onBack }) => {
  return (
    <ManagementSplitLayout
      ListComponent={<HubList />}
      FormComponent={<AddHub onNext={onNext} onBack={onBack} />}
    />
  );
};

export default HubStep;
