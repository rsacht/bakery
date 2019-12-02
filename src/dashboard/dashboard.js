import React, {Component } from 'react'

import ContentHeader from '../template/contentHeader'
import Content from '../template/content'
import ValueBox from '../widget/valueBox'
import Row from  '../layout/row'

class Dashboard extends Component {
    render(){
        return(
            <div className='container fluid mw-75 bg-light shadow-sm'>
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                <Content>
                    <Row>
                        <ValueBox cols='12 4' color='danger'  value='R$ 10' text='Custos'/>
                        <ValueBox cols='12 4' color='success'  value='R$ 10' text='Faturamento'/>
                        <ValueBox cols='12 4' color='primary'  value='R$ 10' text='Lucro'/>
                    </Row> 
                </Content>
            </div>
        )
    }
}

export default Dashboard