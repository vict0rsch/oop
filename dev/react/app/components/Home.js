import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
    render() {
        return (
            <div className='home-div'>
                Home.js Component
                <Link to='/graph/12'>Go to Graph 12</Link>
            </div>
        );
    }
};

export default Home;