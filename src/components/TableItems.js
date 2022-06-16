import { React } from 'react';
import { useDispatch } from 'react-redux';
import { editActions } from '../store/edit-slice';
import Edit from '../Images/tableEdit.png'; 
import Delete from '../Images/tableDelete.png'; 

const TableItems = (props) => {

  const dispatch = useDispatch();

  // const [set, setSet] = useState(0)

  const Id = props.Id;
  // let isSelected = false;

  const onEditButtonHandler = () => {
    props.editButtonHandler(Id);
    console.log('Edit ID = ', Id);
    dispatch(editActions.toggle());
  };

  const onDeleteButtonHandler = ()  => {
    props.deleteButtonHandler(Id);
    console.log('Delete ID = ', Id);
  };

  const handleClick = () => {
    props.checkedItem(props.Id);
    console.log("Selected box", props.Id);
    // isSelected = true;
    // setSet(1);
  };

  return (

    

    <tr className='taleRow border-b-2 border-gray-400'>
    {/* <td>{props.Id}</td> */}
    
    <td>
      <div className="form-check">
        <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer [backgroundColor: isSelected ? 'none' : '##d7d9db']" type={props.Type} value="" id={props.Id} onChange={handleClick} />
      </div>
    </td>


    <td>{props.Name}</td>
    <td>{props.Email}</td>
    <td>{props.Role}</td>
    <td>
      <button onClick={onEditButtonHandler}><img src={Edit} alt=""/></button>
      <button onClick={onDeleteButtonHandler}><img src={Delete} alt=""/></button>
    </td>
  </tr>
  )
}

export default TableItems