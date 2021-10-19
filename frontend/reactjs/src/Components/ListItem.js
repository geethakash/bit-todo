import React, { useState } from "react";

function ListItem({todo}) {

    const [title, setTitle] = useState(todo.title)
    
  return (
    <li className="p-2 flex flex-row hover:bg-gray-700 roundeds">
      <div className="ml-2 mr-5">
        <input type="checkbox" className="form-checkbox text-green-500" />
      </div>
      <input className="bg-transparent outline-none w-10/12" onChange={e => setTitle(e.target.value)} value={title} />
    </li>
  );
}

export default ListItem;
