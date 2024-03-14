import React from "react";
import style from "./SingleTodo.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const SingleTodo = ({
  item,
  onDeleteTask,
  onCompleteTask,
  setValue,
  setEditId,
  inputRef,
}) => {
  return (
    <div className={style.single_todo_div}>
      <div
        style={{ textDecoration: item?.isCompleted ? "line-through" : "none" }}
      >
        {item?.value}
      </div>
      <div>
        <MdEdit
          className={style.cursor}
          onClick={() => {
            setValue(item?.value);
            setEditId(item?.id);
            inputRef?.current?.focus();
          }}
        />
        <input
          onChange={() => onCompleteTask(item?.id)}
          type="checkbox"
          checked={item?.isCompleted}
        />
        <MdDelete
          className={style.cursor}
          onClick={() => onDeleteTask(item?.id)}
        />
      </div>
    </div>
  );
};

export default SingleTodo;
