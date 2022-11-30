import './css/home.css';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className='home'
        >
            <div className='relative flex flex-col gap-2 text-center p-52'>
                <h1 className='text-6xl font-mono font-extrabold'>Code-Thru</h1>
                <h1 className='font-mono font-medium'>A fast, lightweight web ide for everyone. Powered by JDoodle.</h1>
                <div className='pt-3'>
                    <Link to="/ide">
                        <button className='p-2 pr-4 pl-4 border-2 border-transparent rounded-2xl font-mono font-medium transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:bg-green-500 hover:border-black duration-250'>Start Coding</button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;