import React from 'react'
import { ReportPaperContainer } from '../../../components/Dashboard/ReportStyledComponents'

const boxContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
    padding: '20px',
    flexWrap: 'wrap'
}

const box = {
    padding: '10px',
    background: 'black',
    color: 'white',
    width:'100px',
    textAlign: 'center',
}

export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
        <ReportPaperContainer ref={ref}>
            <h3>Hello World</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo expedita dolor magnam, totam similique soluta rerum adipisci perspiciatis voluptatum dolorum itaque dolores maiores at nisi quam distinctio ipsa accusantium inventore.</p>
            <div style={boxContainer}>
                <div style={box}>1</div>
                <div style={box}>2</div>
                <div style={box}>3</div>
                <div style={box}>4</div>
                <div style={box}>5</div>
            </div>
        </ReportPaperContainer>
    )
})