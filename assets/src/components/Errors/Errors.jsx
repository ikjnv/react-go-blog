import { ErrorBlock } from "./styled";

export default function Errors(errors) {   
	let errorList = [];          
	for (var key of Object.keys(errors)) {
		errorList.push(errors[key]);    
	}
	return (
		<ErrorBlock> 
			{errorList.map(error => <p>{error}</p>)}
		</ErrorBlock>
	)   
};
