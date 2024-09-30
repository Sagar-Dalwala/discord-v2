import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Test from "../app/test/page";
import Exit from "../app/exit/page";

describe("test page testing",()=>{
    test("test case 1",()=>{
        render(<Test/>);
        const ele = screen.getByTestId("test-component");
        expect(ele).toBeInTheDocument();
    })
})

describe("Exit page testing",()=>{
    test("test case 1",()=>{
        render(<Exit testing={true}/>);
        const ele = screen.getByTestId("crash-route");
        expect(ele).toBeInTheDocument();
    })
})