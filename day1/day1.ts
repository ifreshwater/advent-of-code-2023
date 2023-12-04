import { INPUT_EX, INPUT_EX2, INPUT } from "./inputs";

const SPELLED = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

(async() => {
    function numberRep(input: string): string| number{
        const index = SPELLED.indexOf(input) 
        if (index == -1){
            return input
        } else {
            return index
        }
    }
    function lineNumbers(line: string): number {
        const found = [...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)].map(m=>m[1])
        console.log(line)
        console.log(found);
        if(found){
            
            return parseInt([numberRep(found[0]), numberRep(found[found.length-1])].join(''))
        } else {
            return 0
        }
    }
    const lines = INPUT.split('\n');

    const res = lines.reduce((acc: number, cur: string): number => {
        const val = lineNumbers(cur);
        console.log(val);
        return acc + val
    }, 0)
    console.log(res)
})()