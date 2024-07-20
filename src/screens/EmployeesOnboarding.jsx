import React, { useState } from 'react'
import { Container } from '../components/Container'
import { Breadcamps } from '../components/Breadcumps'
import { FormLayout } from '../components/FormLayout'
import { SelectInput, TextInput } from '../components/Input'
import { ButtonLayout } from '../components/ButtonLayout'
import { IconButton } from '../components/Button'
import { API } from '../api/API'
import { hasEmptyValues } from '../services/DataPreprocessing'
import { useDispatch } from 'react-redux'
import { showToast } from '../redux/actions/toastActions'
import { useNavigate } from 'react-router-dom'

export const EmployeesOnboarding = () => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    roles: ['professor'],
    designation: '',
    email: '',
    password: '',
    photo: 'https://firebasestorage.googleapis.com/v0/b/mymamcet.appspot.com/o/mamcet%2Fusers%2FDefault.jpg'
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateEmployee = () => {
    if (hasEmptyValues(employeeData)) {
      return dispatch(
        showToast({
          type: "error",
          text: "Fill all required fileds",
        })
      );
    }
    API.postRequest('/employee/add', employeeData)
      .then((result) => {
        setEmployeeData({
          firstName: '',
          lastName: '',
          roles: ['professor'],
          designation: '',
          email: '',
          password: '',
          photo: 'https://firebasestorage.googleapis.com/v0/b/mymamcet.appspot.com/o/mamcet%2Fusers%2FDefault.jpg'
        })
        dispatch(showToast({
          type: "success",
          text: result.message
        }))
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <Container>
      <Breadcamps paths={{ Home: "/", Employees: '/employee/all', 'Employee onboarding': '#' }} />
      <FormLayout>
        <TextInput
          label={'First Name'}
          value={employeeData.firstName}
          placeholder={'John'}
          required={true}
          onChange={(e) => setEmployeeData((prev) => ({ ...prev, firstName: e }))}
        />
        <TextInput
          label={'Last Name'}
          value={employeeData.lastName}
          onChange={(e) => setEmployeeData((prev) => ({ ...prev, lastName: e }))}
          placeholder={'Smith'}
          required={true}
        />
        <TextInput
          label={'Email'}
          value={employeeData.email}
          onChange={(e) => setEmployeeData((prev) => ({ ...prev, email: e }))}
          placeholder={'example@email.com'}
          required={true}
        />
        <TextInput
          label={'Password'}
          value={employeeData.password}
          type={'password'}
          onChange={(e) => setEmployeeData((prev) => ({ ...prev, password: e }))}
          placeholder={'********'}
          required={true}
        />
        <SelectInput
          label={'Designation'}
          value={employeeData.designation}
          onChange={(e) => setEmployeeData((prev) => ({ ...prev, designation: e }))}
          placeholder={'Select option'}
          options={['Assistant professor', 'Associate professor', 'HoD', 'Principle', 'Dean', 'Registrar']}
        />
        <ButtonLayout cols={12} marginTop={14}>
          <IconButton
            text={"Create Employee"}
            icon={"ic:round-plus"}
            textColor={"white"}
            bgColor={"bg-blue-700"}
            onClick={() => handleCreateEmployee()}
          />
          <IconButton
            text={"Go Back"}
            icon={"typcn:arrow-back"}
            textColor={"gray-500"}
            bgColor={"bg-white"}
            onClick={() => navigate("/employee/all")}
          />
        </ButtonLayout>
      </FormLayout>
    </Container>
  )
}
