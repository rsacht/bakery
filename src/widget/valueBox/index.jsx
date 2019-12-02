import React from 'react'

import Grid from '../../layout/grid'
import './valueBox.css'

export default props => (
    <Grid cols={props.cols}> 
        <div className={`shadow-sm p-2 mb-2 bg-${props.color}`}> 
            <div className='inner'> 
                <h3>{props.value}</h3>
                <p className="mb-0">{props.text}</p>
            </div> 
        </div> 
    </Grid> 
)