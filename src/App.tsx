import React, {useState} from 'react';
import './App.css';

import { DragDropContext, DropResult} from "react-beautiful-dnd";

import InputField from './components/input-field';
import TaskList from './components/task-list';

import {Task} from './models/models';

const {v4} = require('uuid');

const App: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAddTask = (e: React.FormEvent): void => {
    e.preventDefault();

    if (task) setTasks([...tasks, {id: v4(), task, isDone: false}]);
    setTask('');
  };

	const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = tasks;
    let complete = completedTasks;
    // Source Logic
    if (source.droppableId === "TasksList") {
      add = {...active[source.index], isDone: true};
      active.splice(source.index, 1);
    } else {
      add = {...complete[source.index], isDone: false};
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TasksList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTasks(complete);
    setTasks(active);
  };

  return (
		<DragDropContext onDragEnd={onDragEnd}>
						<div className="App">
							<span className="heading">TaskScript</span>
							<InputField task={task} setTask={setTask} handleAddTask={handleAddTask} />
							<TaskList
								tasks={tasks}
								setTasks={setTasks}
								completedTasks={completedTasks}
								setCompletedTasks={setCompletedTasks}
							/>
						</div>
		</DragDropContext>
  );
};

export default App;
