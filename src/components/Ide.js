import './css/ide.css';
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios'
import CodeMirror from '@uiw/react-codemirror';
import { githubDark, githubLight } from '@uiw/codemirror-themes-all';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { BsPlayFill } from 'react-icons/bs';
import { MdLightMode } from 'react-icons/md';

function Ide() {
    const [lang, setLang] = useState("cpp");
    const getLang = (() => {
        if (lang==="python") {
            return python();
        } else if (lang==="cpp") {
            return cpp();
        } else if (lang==="java") {
            return java();
        }
    })();
    //Get code from code editor
    const [code, setCode] = useState();
    const getCode = useCallback((value) => {
        setCode(value);
    }, []);
    //Get input
    const [input, setInput] = useState();
    //Run code using Compiler API
    const [output, setOutput] = useState();
    const runCode = () => {
        axios
            .post("https://asia-east1-code-thru.cloudfunctions.net/api", { 
                code: code, 
                input: input, 
                lang: lang
            })
            .then(({data}) => setOutput(data));
    };
    return (
        <div className='ide'>
            <div className='content relative flex flex-col gap-1'>
                <div className='header flex justify-between text-center'>
                    <div className='pt-4 pl-2'>
                        <select className="border-2 border-black outline-none p-1 pr-3 rounded-md" onChange={e=>{setLang(e.target.value)}}>
                            <option value="cpp">C++</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                        </select>
                    </div>
                    <div className='flex text-4xl font-extrabold font-mono pl-3'>
                        Code-Thru
                        <div className='pl-4 pt-1'>
                            <MdLightMode size={30}/>
                        </div>
                    </div>
                    <div className='pt-2 pr-2'>
                        <button className="border-2 border-black place-items-center p-1 pl-3 pr-3 text-white rounded-md bg-green-500" onClick={runCode}>
                            <BsPlayFill size={30} />
                        </button>
                    </div>  
                </div>
                <div className='body flex flex-row gap-2'>
                    <div className='basis-1/2 overflow-auto rounded-2xl bg-black'>
                        <CodeMirror
                            value="/* Happy coding! */"
                            theme={githubDark}
                            height="443px"
                            extensions={getLang}
                            onChange={getCode}
                        />
                    </div>
                    <div className='basis-1/2 overflow-auto rounded-2xl grid grid-rows-2 divide-y divide-solid bg-black'>
                        <div className="text-center p-1 text-white overflow-auto">
                            Input
                            <div className="pl-2 pr-2 text-left">
                                <textarea placeholder=">" className="font-mono text-left text-sm outline-none resize-none overflow-hidden w-full h-40 bg-black" onChange={e=>{setInput(e.target.value)}}></textarea>
                            </div>
                        </div>
                        <div className="text-center p-1 text-white overflow-auto">
                            Output
                            <div className="font-mono text-left text-sm output pl-2 pr-2 text-white">
                                {output}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer text-center'>
                    <h2>footer</h2>
                </div>
            </div>
        </div>
    );
};

export default Ide;