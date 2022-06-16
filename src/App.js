import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tabledata from './components/TableItems';
import EditPage from './components/EditPage';
import { USERS_PER_PAGE } from './utils/Constants';
import Pagination from './components/Pagination';
import axios from 'axios';


let editingId;
let Editindex;
let editData = {};
let TempItems = [];
let checkedBoxes = [];
// let isAllChecked = false;

const baseURL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

function App() {


  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [editCount, setEditCount] = useState(0);  
  const [searchName, setSearchName] = useState('');
  const [data, setData] = useState([]);

  // const [isCheck, setIsCheck] = useState([]);

  // const [isCheckAll, setIsCheckAll] = useState(false);
  // const [isCheck, setIsCheck] = useState([]);

  const totalPages = Math.ceil(data.length / USERS_PER_PAGE);
  const startIndex = (page - 1) * USERS_PER_PAGE;
  const selectedUsers = data.slice(startIndex, startIndex + USERS_PER_PAGE);



  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setData(response.data);
      
      TempItems = response.data
    });
  }, []);


  const leftArrowClickHandler = () =>{
      if((page-1) !== 0){
          setPage(page - 1);
      }
  }
  const rightArrowClickHandler = () =>{
      if((page+1) <= totalPages){
          setPage(page + 1);
      }
  }
  const FirstArrowClickHandler = () =>{
    setPage(1);
}

const LastArrowClickHandler = () =>{
  setPage(totalPages);
}

  const searchNameHandler = (event) => {

    if (event.target.value) {
        let searchItems = [];

        data.forEach(function (arrayItem) {
            if (arrayItem.name.includes(event.target.value)) {
                console.log("exists ", arrayItem.name);
                searchItems.push(arrayItem);
            }
            else if (arrayItem.email.includes(event.target.value)) {
              console.log("exists ", arrayItem.email);
              searchItems.push(arrayItem);
          }
          else if (arrayItem.role.includes(event.target.value)) {
            console.log("exists ", arrayItem.role);
            searchItems.push(arrayItem);
        }
        });

        if (searchItems.length > 0) {
            data = searchItems;
        } else {
            data = TempItems;
        }

    } else {
        data = TempItems;
    }

    setSearchName(event.target.value);

}

  const deleteButtonHandler = (id) =>{
    const deletingId = id;
    const index = data.findIndex(x => x.id === deletingId);
    console.log('Index in deletingCampaign:>> ', index);
    data = data.filter(function (data) {
        return data.id !== id;
    });
    TempItems = data;
    setCount(count + 1);
  };

  const editButtonHandler = (id) => {
    editingId = id;
    Editindex = data.findIndex(x => x.id === editingId);
  }

  const onEditSubmit = (name, email, role) => {
    console.log('In on submit');

    editData = {
      id: editingId,
      name: name,
      email: email,
      role: role,
    };

    if (editData.name) {
      console.log('editData before splice (inIF case) :>> ', editData);
      const removeElement = function (index, editData) {
        data.splice(index, 1, editData);
        return data;
      };
      data = removeElement(Editindex, editData);
      TempItems = data;
      console.log('editCampaign after splice (inIF case) :>> ', editData);
      editData = {};
      console.log('data after all splice editing :>> ', data);
      setEditCount(editCount + 1);
    }
  }

  // const handleSelectAll = e => {
  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(list.map(li => li.id));
  //   if (isCheckAll) {
  //     setIsCheck([]);
  //   }
  // };

  // const handleClick = e => {
  //   const { id, checked } = e.target;
  //   setIsCheck([...isCheck, id]);
  //   if (!checked) {
  //     setIsCheck(isCheck.filter(item => item !== id));
  //   }
  // };

  const checkedItem = (id) =>{
    checkedBoxes.push(id);
    checkedBoxes.sort();
    console.log("All Selected : ",checkedBoxes);
    
  }

  // const handleAllClick = () =>{

  //   if(isAllChecked){
  //     isCheckedAll = data.map(li => li.id);
  //   }
  //   isAllChecked = !isAllChecked;


  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(list.map(li => li.id));
  //   if (isCheckAll) {
  //     setIsCheck([]);
  //   }
  // }

  const deleteSelectedButtonHandler= () =>{
    console.log('CheckedBoxes in deleteSelectedButtonHandler :>> ', checkedBoxes);
    for(let i=0; i< checkedBoxes.length; i++){
      let deletingId = checkedBoxes[i];
      const index = data.findIndex(x => x.id === deletingId);
      console.log('Index in deletingCampaign:>> ', index);
      data = data.filter(function (data) {
          return data.id !== deletingId;
      });
      TempItems = data;
    }
    setCount(count + 1);
  }

  const edit = useSelector(state => state.edit.editIsVisible);

  
    

  return (
    <Fragment>
      <div>
          <input className='searchBox border-solid border-gray-400 border-2 w-1/2 mt-28 mx-[28rem]' type="search" value={searchName} onChange={searchNameHandler} placeholder="Search by name, email or role"  />
      </div>
      <div>
        <table className='table border-b-2 border-gray-400 w-1/2 mt-16 mx-[28rem]'>
          <thead className='mx-44 font-semibold  ml-4'>
            <tr>
              <th>
                <div className="form-check">
                  <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="0" id="flexCheckDefault"/>
                  <label className="form-check-label inline-block text-gray-800" htmlFor="flexCheckDefault"></label>
                </div>
              </th>
              <th className='text-left'>Name</th>
              <th className='text-left'>Email</th>
              <th className='text-left'>Role</th>
              <th className='text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedUsers.map((data) => (<Tabledata deleteButtonHandler={deleteButtonHandler} editButtonHandler={editButtonHandler} checkedItem={checkedItem}
              key = {data.id}
              Name={data.name}
              Id = {data.id}
              Email={data.email}
              Role={data.role}
              Type="checkbox"
              // handleClick={handleClick}
              // isChecked={isCheck.includes(id)}
              />                    
            ))}
          </tbody>
        </table>
        <div className='flex flex-row'>
          <div>
            <button type="button" onClick={deleteSelectedButtonHandler} className="px-10 ml-[28rem] my-8 py-2.5 bg-red-600 text-white font-medium text-lg leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Delete Selected</button>
          </div>
          <div className='mx-44  my-9'>
            <Pagination page={page} leftArrowClickHandler={leftArrowClickHandler} rightArrowClickHandler={rightArrowClickHandler} FirstArrowClickHandler={FirstArrowClickHandler} LastArrowClickHandler={LastArrowClickHandler}/>
          </div>
        </div>
      </div>
      {edit && <EditPage className='mb-5 w-11' onEditSubmit={onEditSubmit}/>}
    </Fragment>
  );
}

export default App;
