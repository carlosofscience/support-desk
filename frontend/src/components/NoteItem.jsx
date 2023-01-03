import { useSelector } from "react-redux"


function NoteItem({note}) {
  
  const {user: {name}} = useSelector( state =>  state.auth)
  const {isStaff, text} = note;
  return (
    <div
      className="note"
      style={{
        backgroundColor: isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: isStaff ? "#fff":'#000'
      }}
    >
      <h3>Note from {isStaff ? <span>Staff</span>: <span>{name}</span> }</h3>
      <p>{text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
    </div>
  );
}

export default NoteItem