import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");
    const [mtTop, setMtTop] = useState(112);

    const displayRef = useRef();

    const ops = ["/", "*", "+", "-", "."];

    const updateCalc = (value) => {
        if ((ops.includes(value) && calc === "") || (ops.includes(value) && ops.includes(calc.slice(-1)))) {
            return;
        }
        setCalc(calc + value);

        if (!ops.includes(value)) {
            // eslint-disable-next-line no-eval
            setResult(eval(calc + value).toString());
        }
    };

    const createDigits = () => {
        const digits = [];

        for (let i = 1; i < 10; i++) {
            digits.push(
                <button key={i} onClick={() => updateCalc(i.toString())}>
                    {i}
                </button>
            );
        }

        return digits;
    };

    const calculate = () => {
        if (ops.includes(calc.slice(-1))) {
            alert("Phép tính không hợp lệ!");
            return;
        }
        // eslint-disable-next-line no-eval
        setCalc(eval(calc).toString());
    };

    const deleteLast = () => {
        if (calc === "") {
            return;
        }

        const value = calc.slice(0, -1);
        setCalc(value);
    };

    const deleteAll = () => {
        if (calc === "") {
            return;
        }
        setCalc("");
    };

    const checkShowCalc = (value) => {
        return value.replace(/\//g, "÷").replace(/\*/g, "×");
    };

    useEffect(() => {
        setMtTop(displayRef.current.clientHeight);
    }, [calc]);

    return (
        <div className="App">
            <div className="calculator">
                <div ref={displayRef} className="display">
                    {result ? <span>({result})</span> : ""}
                    &nbsp;
                    {checkShowCalc(calc) || "0"}
                </div>

                <div className="operators" style={{ marginTop: mtTop }}>
                    <button onClick={() => updateCalc("/")}>÷</button>
                    <button onClick={() => updateCalc("*")}>×</button>
                    <button onClick={() => updateCalc("+")}>+</button>
                    <button onClick={() => updateCalc("-")}>-</button>

                    <button onClick={deleteAll}>AC</button>
                    <button onClick={deleteLast}>DEL</button>
                </div>

                <div className="digits">
                    {createDigits()}
                    <button onClick={() => updateCalc("0")}>0</button>
                    <button onClick={() => updateCalc(".")}>.</button>

                    <button onClick={calculate}>=</button>
                </div>
            </div>
        </div>
    );
}

export default App;
