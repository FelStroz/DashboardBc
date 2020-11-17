import * as React from 'react';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import {
    List,
    Datagrid,
    TextField,
    NumberField,
    BooleanField,
} from "react-admin";

const CrewList = props => (
    <List {...props} bulkActionButtons={false} actions={false} exporter={false}>
        <Datagrid rowClick={'edit'}>
            <TextField label={"Nome"} source={"name"}/>
            <TextField label={"Email"} source={"email"}/>
            <NumberField label={"Total de Bcs"} source={"bcsCount"}/>
            <BooleanField label={"Admin"} source={"isAdmin"} TrueIcon={CheckCircleOutlinedIcon} FalseIcon={HighlightOffOutlinedIcon}/>
        </Datagrid>
    </List>
)

export default CrewList;
