import React, {useRef} from 'react';
import './components.css';

interface InputFieldProps {
	task: string;
	setTask: React.Dispatch<React.SetStateAction<string>>;
	handleAddTask: (e: React.FormEvent) => void;
}

const InputField:React.FC<InputFieldProps> = ({task, setTask, handleAddTask}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	return (
		<form className="input" onSubmit={(e) => {
			handleAddTask(e);
			inputRef.current?.blur();
			}
		}>
			<input 
				className='input__box' 
				type="input" 
				placeholder="What's next?"
				value={task}
				onChange={(e) => setTask(e.target.value)}
				ref={inputRef}
			/>
			<button className='input__submit' type="submit">Let's go!</button>
		</form>
	)
}

export default InputField