import { FaPlus } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Spinner from "./Spinner";

function TodoLists({ data, setData, selectedTodo, setSelectedTodo }) {
  const addNewList = () => {
    setData({
      data: { todoLists: [...data.data.todoLists, data.data.todoLists[0]] },
    });
  };

  return (
    <>
      {data ? (
        <>
          <div className="flex flex-row items-center pt-3 justify-between">
            <div className="ml-10"></div>
            <div className="text-3xl text-center font-bold uppercase">
              Todo Lists
            </div>

            <span
              onClick={addNewList}
              className="mr-5 p-1 hover:bg-purple-500 text-green-500 rounded hover:text-white hover:rounded-lg transition-all duration-100 "
            >
              <FaPlus size="22" />
            </span>
          </div>
          <div className="w-full pt-5">
            {data.data.todoLists.map((todoList, index) => (
              <div
                onClick={() => setSelectedTodo(index)}
                className={
                  selectedTodo === index
                    ? "w-full p-2 bg-green-600 transition-all duration-100 rounded  flex items-center"
                    : "w-full p-2 hover:bg-green-600 transition-all duration-100 rounded  flex items-center cursor-pointer"
                }
              >
                <span className="mr-2">
                  <BsList />
                </span>
                <div className="truncate">{todoList.title}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-full">
          <Spinner />
        </div>
      )}
    </>
  );
}

export default TodoLists;
