/// <reference types="jquery"/>

interface InputLimiterOptions{
	limit?:number;
	boxAttach?:boolean;
	boxId?:string;
	boxClass?:string;
	remText?:string;
	remTextFilter?:(opts:InputLimiterOptions, charsRemaining:number) => void;
	remTextHideOnBlur?:boolean;
	remFullText?:string;
	limitTextShow?:boolean;
	limitText?:string;
	limitTextFilter?: (opts:InputLimiterOptions) => void;
	zeroPlural?:boolean;
	allowExceed?:boolean;
	useMaxlength?:boolean;
	limitBy?:string; 
	lineReturnCount?:number;
}
interface JQuery {
	inputlimiter(options:InputLimiterOptions);
}