import { useState } from "react";
import { FaList, FaPlus } from "react-icons/fa";
import { BsList } from "react-icons/bs";

function TodoLists({ data }) {
  console.log(data);
  return (
    <>
      <div className="flex flex-row items-center pt-3 justify-between">
        <div className="ml-10"></div>
        <div className="text-3xl text-center font-bold uppercase">
          Todo Lists
        </div>

        <span className="mr-5 p-1 hover:bg-purple-500 text-green-500 rounded hover:text-white hover:rounded-lg transition-all duration-100 ">
          <FaPlus size="22" />
        </span>
      </div>
      <div className="w-full pt-5">
        {data.data.todoLists.map((todoList,index) => (
          <div className="w-full p-2 hover:bg-green-600 transition-all duration-100 rounded  flex items-center">
            <span className="mr-2">
              <BsList />
            </span>
            <div className="truncate">{todoList.title}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TodoLists;
