import './App.css';
import { Button, Form, Input,Layout } from 'antd';
import Axios from 'axios'
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [wage, setWage] = useState("");
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data);
    });
  }

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          wage: wage,
        },
      ]);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployeeWage = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      )
    })
  }

  return (
    <div className="center-mg">
      <h1>Enployees Information</h1>
      
      <Layout className="layout">

        
          <div>
            
            <label htmlFor='name' className='form-label'>
              Name:
            </label><br />
            <Input
              style={{ width: 400 }}
              type='text'
              className='form-control'
              placeholder='Enter name'
              onChange={(event) => {
                setName(event.target.value)
              }}
            ></Input>
          </div><br />

          <div>
            <label htmlFor='age' className='form-label'>
              Age:
            </label><br />
            <Input
              style={{ width: 400 }}
              type='number'
              className='form-control'
              placeholder='Enter age'
              onChange={(event) => {
                setAge(event.target.value)
              }}
            ></Input>
          </div><br />

          <div>
            <label htmlFor='country' className='form-label'>
              Country:
            </label><br />
            <Input
              style={{ width: 400 }}
              type='text'
              className='form-control'
              placeholder='Enter country'
              onChange={(event) => {
                setCountry(event.target.value)
              }}
            ></Input>
          </div><br />




          <div>
            <label htmlFor='wage' className='form-label'>
              Wage:
            </label><br />
            <Input
              style={{ width: 400 }}
              type='number'
              className='form-control'
              placeholder='Enter wage'
              onChange={(event) => {
                setWage(event.target.value)
              }}
            ></Input>
          </div><br />

          <Button className='green-button' onClick={addEmployee}>Add Empoyees</Button>
        
      </Layout>
      <hr />
      <Button className='employees ' icon={<SearchOutlined />} onClick={getEmployees}>Show Employees</Button>
      {employeeList.map((val, key) => {
        return (
          
          <div className='employee card'><Layout>
            <div className='card-body text-left'></div>
            <p className='card-text'>Name: {val.name}</p>
            <p className='card-text'>Age: {val.age}</p>
            <p className='card-text'>Country: {val.country}</p>
            <p className='card-text'>Wage: {val.wage}</p>
            <div className=''>
              <Input
                style={{ width: 400 }}
                type='number'
                placeholder='15000...'
                onChange={(event) => {
                  setNewWage(event.target.value)
                }}
              />
              <Button className='yellow-button' onClick={() => { updateEmployeeWage(val.id) }}>Update</Button>
              <Button type='primary' onClick={() => { deleteEmployeeWage(val.id) }} danger>Delete</Button>
            </div>
            </Layout>
          </div>
        )
      })}
    </div>


  );
}

export default App;
