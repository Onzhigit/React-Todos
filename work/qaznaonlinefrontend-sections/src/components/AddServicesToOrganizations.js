import React from 'react';
import Dialog from './Dialog';
import ListOfServices from './ListOfServices';



function AddServicesToOrganizations({ services, enabledAddButton, loadAddedServiceToOrganzationAction, addServicesToOrganizationAction, loadedServicesToOrganziation, setSectionId, setSelectedService }) {

  return (
    <Dialog
      title="Виды услуг"
      buttonConfirmAction="подтвердить"
      addServicesToOrganizationAction={ addServicesToOrganizationAction }
      loadedServicesToOrganziation={ loadedServicesToOrganziation }
      serviceButton={ true }
      enabledAddButton={ enabledAddButton }
      children={
        <ListOfServices
          services={ services }
          setSectionId={setSectionId}
          setSelectedService={setSelectedService}
          loadAddedServiceToOrganzationAction={ loadAddedServiceToOrganzationAction } /> }
      buttonName="добавьте услуги"

    />
  );
}

export default AddServicesToOrganizations;
