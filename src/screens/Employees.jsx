import React, { useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { Breadcamps } from '../components/Breadcumps'
import { PageHeading } from '../components/PageHeading';
import { IconButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { API } from '../api/API';
import { useDispatch } from 'react-redux';
import { showToast } from '../redux/actions/toastActions';
import { SelectionTable } from '../components/Table';

export const Employees = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const header = [
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Email", field: "email" },
    { label: "Designation", field: "designation" },
    { label: "Status", field: "status" },
  ];

  useEffect(()=> {
    API.getRequest('/employee').then((result)=> {
      setEmployees(result.employees)
      console.log(result)
    })
    .catch((err)=> {
      dispatch(showToast({
        type: 'err',
        text: err.response.data.message
      }))
    })
  }, [])

  const handleSelection = (id) => {
    if (selectedRowId == id) {
      return setSelectedRowId(null);
    }
    setSelectedRowId(id);
  };
  
  const handleEmployeeEdit = () => {
    if(selectedRowId != null){
      navigate('/employee/edit/'+selectedRowId)
    }
  }

  const handleEmployeeView = () => {
    if(selectedRowId != null){
      navigate('/employee/'+selectedRowId)
    }
  }
  return (
    <Container>
      <Breadcamps paths={{ Home: "/", Employees: '/employee/all' }} />
      <PageHeading heading={"Employees"}>
        <IconButton
          text={"New Employee"}
          icon={"ic:round-plus"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={() => navigate("/employee/onboarding")}
        />
        <IconButton
          text={"View Employee"}
          icon={"ep:view"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={() => handleEmployeeView()}
        />
        <IconButton
          text={"Edit Employee"}
          icon={"fa-regular:edit"}
          bgColor={"bg-blue-500"}
          textColor={"white"}
          onClick={() => handleEmployeeEdit()}
        />
      </PageHeading>
      <SelectionTable
        headers={header}
        data={employees}
        onSelect={(id) => handleSelection(id)}
        rowId={selectedRowId}
      />
    </Container>
  )
}
