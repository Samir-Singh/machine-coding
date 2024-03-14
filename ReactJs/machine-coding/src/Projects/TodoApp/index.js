import React, { useRef, useState } from "react";
import style from "./TodoApp.module.css";
import SingleTodo from "./components/SingleTodo";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState(null);
  const inputRef = useRef();

  const onSubmitButton = () => {
    if (value === "") {
      return;
    }

    if (editId) {
      const updatedTodoList = todoList?.map((item) =>
        item?.id === editId ? { ...item, value: value } : item
      );

      setTodoList(updatedTodoList);
    } else {
      setTodoList([
        ...todoList,
        {
          id: todoList?.length + 1,
          isCompleted: false,
          value: value,
        },
      ]);
    }

    setValue("");
  };

  const onDeleteTask = (id) => {
    const newTodoList = todoList?.filter((item) => item?.id !== id);

    setTodoList(newTodoList);

    setValue("");

    setEditId(null);
  };

  const onCompleteTask = (id) => {
    const updatedTodoList = todoList?.map((item) =>
      item?.id === id ? { ...item, isCompleted: !item?.isCompleted } : item
    );

    setTodoList(updatedTodoList);
  };

  return (
    <div className={style.main_todo_div}>
      <div className={style.input_box_div}>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e?.target?.value)}
          className={style.input_box}
          placeholder="Enter text..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmitButton();
            }
          }}
        />
        <button onClick={() => onSubmitButton()} className={style.submit}>
          {editId ? "Edit" : "Submit"}
        </button>
      </div>

      <div className={style.todo_list_div}>
        {todoList?.map((item) => (
          <SingleTodo
            item={item}
            onDeleteTask={onDeleteTask}
            onCompleteTask={onCompleteTask}
            setValue={setValue}
            setEditId={setEditId}
            inputRef={inputRef}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
