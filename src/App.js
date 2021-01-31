import { useState, useEffect, useRef } from 'react';
// https://github.com/atlassian/react-beautiful-dnd/issues/128
import {createPortal} from 'react-dom';
// https://codesandbox.io/s/k260nyxq9v?file=/index.js
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '@material-ui/core';

// example array
let array = [];

for (let i = 0; i < 4; i++) {
	array.push({
		id: `element-${i}`,
		content: `Number ${i} content...`
	});
}

const useDraggableInPortal = () => {
	const self = useRef({}).current;

	useEffect(() => {
		const div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.pointerEvents = 'none';
		div.style.top = '0';
		div.style.width = '100%';
		div.style.height = '100%';
		self.elt = div;
		document.body.appendChild(div);
		return () => {
			document.body.removeChild(div);
		};
	}, [self]);

	return (render) => (provided, ...args) => {
		const element = render(provided, ...args);
		if (provided.draggableProps.style.position === 'fixed') {
			return createPortal(element, self.elt);
		}
		return element;
	};
};

const App = () => {
	const [ elements, setElements] = useState(array);
	
	// reorder the array
	const reorder = (arr, from, to) => {
		
		if (arr) {
			arr.splice(to, 0, arr.splice(from, 1)[0]);
			return arr;
		}
		return;
	}

	const onDragEnd = (result) => {
		// if the destinatin is null don't do anything
		if (!result.destination) {
			return;
		}

		// We need te re-order the array by these indexes
		if (elements) {
			const orderedArray = reorder(elements, result.source.index, result.destination.index);
			setElements(orderedArray);
		}

	}

	const renderDraggable = useDraggableInPortal();

	return (
		<div className='App'>
		<DragDropContext onDragEnd={ onDragEnd } >
			<Droppable droppableId='droppable'>
				{(provided, snapshot) => (
					<div
						{ ...provided.droppableProps }
						ref={ provided.innerRef }
						style={{
							padding: 8,
							width: 400
						}}
					>
						{elements.map((element, index) => (
							<Draggable key={ element.id } draggableId={ element.id } index={ index }>
								{renderDraggable(provided => (
									<div
										ref={ provided.innerRef }
										{ ...provided.draggableProps }
										{ ...provided.dragHandleProps }
										className='draggable'
									>
										<Container id={ element.id } content={ element.content } />
									</div>
								))}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
		</div>
	);
}

// example Component for array
const Container = ({ id, content }) => {
	const helloWorld = () => {
		console.log('Hello World');
	}
	return (
		<div className='Container'>
			<h1>{id}</h1>
			<p>{content}</p>
			<Button
				variant='outlined'
				color='default'
				onClick={ helloWorld }
			>
				Hello World
			</Button>
		</div>
	)
}

export default App;