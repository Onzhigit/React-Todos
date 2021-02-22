import React from 'react';
import styled from 'styled-components';


const TableContainer = styled.div`
  display:flex;
  flex-direction:column;
  min-height:200px;
  /* background-color:blue; */
`;

const Row = styled.div`
  display:flex;
  width:100%;
  min-height:30px;
  padding:5px;
  /* background-color:yellow; */
  border-bottom:1px solid grey;
`;

const Half = styled.div`
  display:flex;
  align-items:center;
  justify-content:flex-left;
  flex:0.5;
  width:100%;
`;

function OraganizationsInfoTable({ org }) {
  return (
    <TableContainer>
      <Row>
        <Half><strong>Компания</strong></Half>
        <Half>{ org.organization_name }</Half>
      </Row>
      <Row>
        <Half><strong>Форма собственности</strong></Half>
        <Half>{ org.ownership.ownership_name }</Half>
      </Row>
      <Row>
        <Half><strong>График работы</strong></Half>
        <Half>{ org.work_time_start } - { org.work_time_end }</Half>
      </Row>
      <Row>
        <Half><strong>Язык обучения</strong></Half>
        <Half>{ org.languages.languages_name}</Half>
      </Row>
      <Row>
        <Half><strong>Год основания</strong></Half>
        <Half>{ org.organization_year.split("-")[0]}</Half>
      </Row>
      <Row>
        <Half><strong>Адрес</strong></Half>
        <Half>{ org.organization_address}</Half>
      </Row>
      <Row>
        <Half><strong>Контакты</strong></Half>
        <Half>{ org.organization_phone}</Half>
      </Row>
      <Row>
        <Half><strong>Тип работы</strong></Half>
        <Half>{ org.schedule.schedule_name}</Half>
      </Row>
    </TableContainer>
  );
}

export default OraganizationsInfoTable;
