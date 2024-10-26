import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {useEffect, useState} from 'react';

function Student(){
  <Navbar expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Another action
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">
            Separated link
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  
    let [data,setData] = useState({});

    let [list,setList] = useState([]);
    let [pos,setPos] = useState(-1);
    let [city,setCity] = useState(["Surat","Bhavnagar","Rajkot","Navasari","Pune"])
    let [hob,setHob]= useState([]);
  
    useEffect(()=>{
         let stList = JSON.parse(localStorage.getItem("stdlist"));
         let newList=stList?stList:[];
         setList(newList);
    },setList)
  
    let changeInput = (e) =>{
      
          let name = e.target.name;
          let value = e.target.value;
          let hoData = [...hob];
          if(name=='hobby'){
             if(e.target.checked){
                hoData.push(value);
             }
             else{
                 let index= hoData.findIndex((v,i)=>v==value);
                 hoData.splice(index,1);
             }
             value = hoData;
             setHob(value);
          }

          console.log(name,value);
          setData({...data,[name]:value});     
    }
  
    let submitData =(e) =>{
        e.preventDefault();
        
        if(pos!=-1){
             list.map((v,i)=>{
                if(i==pos){
                    list[i] = data;
                }
             })
             localStorage.setItem('stdlist',JSON.stringify([...list]))
        }
        else{
          let updateData = [...list,data];
          setList(updateData);
          localStorage.setItem('stdlist',JSON.stringify(updateData))
        }
         
        setPos(-1);
        setData({});
        setHob([]);
      }
    
    let deleteStd = (pos) =>{
        list.splice(pos,1);
        localStorage.setItem('stdlist',JSON.stringify([...list]));
        setList([...list]);
    }
  
    let updateStd = (pos) =>{
        setPos(pos);
        let record = list.filter((v,i)=>{
            if(i==pos){
              return v;
            }
        })
        console.log(record[0]);
        setData(record[0]);
        setHob(record[0]['hobby'])
  
    }
    return (
      <>
         <div >
                <h1 style={{textAlign:"center"}}>Student Form</h1>
                
                <form method='post' onSubmit={(e)=>submitData(e)}>
                  <table border={1} align="center">
                      <tr>
                        <td>Enter Student Name:</td>
                        <td><input type="text" name="name" value={data.name?data.name:""} onChange={(e)=>changeInput(e)}/></td>
                      </tr>
  
                      <tr>
                        <td>Enter Password:</td>
                        <td><input type="password" name="password" value={data.password?data.password:""}  onChange={(e)=>changeInput(e)}/></td>
                      </tr>
  
                      <tr>
                        <td>Select Gender</td>
                        <td>
                          <input type="radio" name="gender" value="male" checked={data.gender=='male'?"checked":""} onChange={(e)=>changeInput(e)}/>Male
                          <input type="radio" name="gender" value="female" checked={data.gender=='female'?"checked":""} onChange={(e)=>changeInput(e)}/>Female
                        </td>
                      </tr>
  
                      <tr>
                        <td>City:</td>
                        <td>
                          <select name="city" onChange={(e)=>changeInput(e)}>
                              <option>-select city-</option>
                              {city.map((v,i)=>{
                                return(
                                  <option value={v} selected={data.city==v?data.city:""}>{v}</option>
                                )
                              })}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>Select Hobby</td>
                        <td>
                          <input type="checkbox" value="reading" name="hobby" checked={hob.includes('reading')?"checked":""} onChange={(e)=>changeInput(e)}/>Reading
                          <input type="checkbox" value="swimming" name="hobby" checked={hob.includes('swimming')?"checked":""} onChange={(e)=>changeInput(e)}/>Swimming
                          <input type="checkbox" value="adventure" name="hobby" checked={hob.includes('adventure')?"checked":""} onChange={(e)=>changeInput(e)}/>Adventure
                          <input type="checkbox" value="travel" name="hobby" checked={hob.includes('travel')?"checked":""} onChange={(e)=>changeInput(e)}/>Travel
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td><input type="submit" name="submit" value={pos==-1?"submit":"Edit"}/></td>
                      </tr>
                  </table>
                </form>
                <br/><br/><br/>
                <table border={1} align='center' key="sd">
                    <tr key='stat'>
                      <td>Name</td>
                      <td>password</td>
                      <td>gender</td>
                      <td>City</td>
                      <td>Hobby</td>
                      <td>Actions</td>
                    </tr>
                    {list.map((v,i)=>{
                        return(
                          <tr key={i}>
                            <td>{v.name}</td>
                            <td>{v.password}</td>
                            <td>{v.gender}</td>
                            <td>{v.city}</td>
                            <td>{v.hobby}</td>
                            <td>
                              <button onClick={()=>deleteStd(i)}>Delete</button>
                          ||
                              <button onClick={()=>updateStd(i)}>Update</button>
                              </td>
                          </tr>
                        )
                    })}
                </table>
         </div>   
      </>
    );
}

export default Student;