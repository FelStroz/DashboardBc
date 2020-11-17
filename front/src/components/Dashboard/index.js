import * as React from 'react';
import {Card, CardContent} from '@material-ui/core';
import {Title} from 'react-admin';

export default () => (
    <Card>
        <Title title={'Dashboardzao SHOW'}/>
        <CardContent style={{padding: '0 20px'}}>
            <text style={{fontWeight: 'bold'}}>Dashboard Dos Bcs</text>
        </CardContent>
        <CardContent style={{padding: '20px'}}>
            {new Date().toUTCString()}
        </CardContent>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Card style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#9ab6ff',
                width: '20vw',
                height: '20vh',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <text style={{fontWeight: 'bold'}}>Bcs Devidos</text>
                <CardContent>
                    <p>10</p>
                </CardContent>
            </Card>

            <Card style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#9ab6ff',
                width: '20vw',
                height: '20vh',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '25px'
            }}>

                <text style={{fontWeight: 'bold'}}>Bcs Pagos</text>
                <CardContent>
                    <p>2</p>
                </CardContent>
            </Card>

            <Card style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#9ab6ff',
                width: '20vw',
                height: '20vh',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '25px'
            }}>
                <text style={{fontWeight: 'bold'}}>Total de Bcs</text>
                <CardContent>
                    <p>12</p>
                </CardContent>
            </Card>
        </div>
        <Card>

        </Card>
        <Card>

        </Card>
    </Card>
)
