

import ManagementSplitLayout from "../../components/Modals/Common/ManagementSplitLayout";
import DataCenterList from "../OrganizationManagement/DataCenterList";
import AddDataCenter from "../OrganizationManagement/AddDataCenter";

const DataCenterStep = ({ onNext, onBack }) => {
  return (
    <ManagementSplitLayout
      ListComponent={<DataCenterList />}
      FormComponent={<AddDataCenter onNext={onNext} onBack={onBack} />}
    />
  );
};

export default DataCenterStep;
