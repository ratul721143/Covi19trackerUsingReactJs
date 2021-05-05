import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react'
import './InfoBox.css'


function InfoBox({title,newCases,totalCases,caseType}) {

    const colorCase={
        cases:{
            first:'#fc7303',
            middle:'rgb(223,12,52)',
            down:'#ad4836'
        },
        recovered:{
            first:'#58ad36',
            middle:'#36ad62',
            down:'#36ad93'
        },
        deaths:{
            first:'#ad3650',
            middle:'#d94843',
            down:'#401817'
        }
    }


    const style1={
        'color':colorCase[caseType].first,
    }
    const style2={
        'color':colorCase[caseType].middle,
        'margin':'7px 0px'
    }
    const style3={
        'color':colorCase[caseType].down
    }

    return (
        
            <Card className="info__card">
                <CardContent>
                    <h2 className="card__title" style={style1}>{title}</h2>
                    <h2 className="card__newcase" style={style2}>+{newCases}</h2>
                    <Typography className="card__total" style={style3}>{totalCases} Total</Typography>
                </CardContent>
            </Card>

    )
}

export default InfoBox;
