import './css/ide.css';
import { motion } from "framer-motion";
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import CodeMirror from '@uiw/react-codemirror';
import { githubDark } from '@uiw/codemirror-themes-all';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { BsPlayFill, BsGithub } from 'react-icons/bs';
import { MdLightMode } from 'react-icons/md';

function Ide() {
    const [darkIndex, setdarkIndex] = useState(0);
    const [color, setColor] = useState('#F3F4F9');
    const handleColorClick = () => {
        setdarkIndex(prevState => prevState + 1);
        if (darkIndex===0) {
            setColor('#F3F4F9');
        } else if (darkIndex === 1) {
            setColor('#ADAEB3');
        } else if (darkIndex === 2) {
            setColor('#828388');
        } else if (darkIndex === 3) {
            setColor('#55565B');
        } else if (darkIndex === 4) {
            setColor('#393A3F');
            setdarkIndex(0);
        }
    };
    //Get lang, set version, set CodeMirror lang package
    const [lang, setLang] = useState("cpp");
    const [ver, setVer] = useState("");
    const getLang = (() => {
        let version;
        if (lang==="python3") {
            version = "4";
            return python();
        } else if (lang==="cpp") {
            version = "5";
            return cpp();
        } else if (lang==="java") {
            version = "4";
            return java();
        }
        setVer(version);
        
    })();
    //Get code from code editor
    const [code, setCode] = useState();
    const getCode = useCallback((value) => {
        setCode(value);
    }, []);
    //Get input
    const [input, setInput] = useState();
    //Run code by API call
    const [output, setOutput] = useState();
    const runCode = () => {
        axios
            .post("https://asia-east1-online-judge-platform-29469.cloudfunctions.net/api/execute", {
                code: code,
                input: input,
                lang: lang,
                ver: ver
            })
            .then(({data}) => {
                console.log(data);
                setOutput(data.output);
            })
            .catch(({err}) => {
                console.log(err);
            })
    };
    const githubPage = () => {
        window.open('https://github.com/maverickw5/code-thru', '_blank');
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className='ide' style={{backgroundColor:`${color}`}}
        >
            <div className='content relative flex flex-col gap-1'>
                <div className='header flex justify-between text-center'>
                    <div className='pt-4 pl-2'>
                        <select className="border-2 border-black bg-yellow-500 outline-none p-1 pr-3 rounded-md transition ease-in-out delay-50 hover:scale-105" onChange={e=>{setLang(e.target.value)}}>
                            <option value="cpp">C++</option>
                            <option value="python3">Python</option>
                            <option value="java">Java</option>
                        </select>
                    </div>
                    <div className='flex text-4xl font-extrabold font-mono pr-8'>
                        <Link to="/">Code-Thru</Link>
                    </div>
                    <div className='pt-2 pr-2'>
                        <button className="border-2 border-black place-items-center p-1 pl-3 pr-3 text-black rounded-md bg-green-500 transition ease-in-out delay-50 hover:scale-105" onClick={runCode}>
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
                <div className='footer flex justify-between text-center pt-2 text-sm font-light'>
                    <button className='pl-2 transition ease-in-out delay-50 hover:scale-110' onClick={handleColorClick}><MdLightMode size={25}/></button>
                    <h2>© 2022 Maverick Woentono</h2>
                    <button className='pr-2 transition ease-in-out delay-50 hover:scale-110' onClick={githubPage}><BsGithub size={25}/></button>
                </div>
            </div>
        </motion.div>
    );
};

export default Ide;