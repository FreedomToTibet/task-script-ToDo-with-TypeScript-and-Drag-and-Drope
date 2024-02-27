import React, {useState, useRef, useEffect} from 'react';

import {Draggable} from 'react-beautiful-dnd';

import {Task} from '../models/models';

import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import {MdDone} from 'react-icons/md';
import './components.css';

type SingleTaskProps = {
  index: number;
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const SingleTask = ({index, task, tasks, setTasks}: SingleTaskProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);

  const handleDone = (id: number) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id && !edit) {
        return {
          ...task,
          isDone: !task.isDone,
        };
      } else if (task.id === id && edit) {
        return {
          ...task,
          task: editTask,
        };
      }
      return task;
    });
    setTasks(newTasks);
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          task: editTask,
        };
      }
      return task;
    });
    setTasks(newTasks);
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`tasks__single ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onSubmit={(e) => handleEdit(e, task.id)}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="tasks__single--text"
            />
          ) : task.isDone ? (
            <s className="tasks__single--text">{task.task}</s>
          ) : (
            <span className="tasks__single--text">{task.task}</span>
          )}

          <div className="icon-container">
            <span
              className="icon"
              onClick={() => {
                if (!edit && !task.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon">
              <AiFillDelete onClick={() => handleDelete(task.id)} />
            </span>
            <span className="icon" onClick={() => handleDone(task.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTask;
