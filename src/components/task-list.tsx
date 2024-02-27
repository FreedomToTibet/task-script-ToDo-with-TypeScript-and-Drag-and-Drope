import React from 'react';

import {Droppable} from 'react-beautiful-dnd';

import {Task} from '../models/models';
import './components.css';
import SingleTask from './single-task';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTasks: Task[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TasksList">
        {(provided, snapshot) => (
          <div className={`tasks ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="tasks__heading">Active Tasks</span>
            {tasks.map((task: Task, index:number) => (
              <SingleTask index={index} key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
            ))}
						{provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TasksRemove">
        {(provided, snapshot) => (
          <div className={`tasks remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="tasks__heading">Completed Tasks</span>
            {completedTasks.map((task: Task, index) => (
              <SingleTask
								index={index}
                key={task.id}
                task={task}
                tasks={completedTasks}
                setTasks={setCompletedTasks}
              />
            ))}
						{provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
