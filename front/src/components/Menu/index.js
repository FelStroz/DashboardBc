import * as React from 'react';
import {createElement, useState} from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {MenuItem, ContainerImage, LetterImage, TextName, Container, LogoutButton} from "./styles";

const Menu = ({ onMenuClick, logout }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(() => true);
    const resources = useSelector(getResources);

    const completeName = localStorage.getItem('username');
    const firstLetter = completeName? completeName.substring(0,1).toLowerCase() : 'A';
    const [selected, setSelected] = useState(false);

    return (
        <Container>
            <ContainerImage>
                <LetterImage
                    src={`https://img.icons8.com/ios-filled/96/000000/circled-${firstLetter}.png`}
                    alt={"Loading..."}
                />
                <TextName>{completeName}</TextName>
            </ContainerImage>
            <MenuItem
                key={'Dashboard'}
                to="/"
                primaryText="Dashboard"
                leftIcon={<DashboardIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                selected={selected}
            />

            {resources.map(resource => (
                <MenuItem
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={resource.options && resource.options.label || resource.name}
                    leftIcon={createElement(resource.icon)}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    selected={true}
                />
            ))}
            <LogoutButton>
                {logout}
            </LogoutButton>
            <div>
                Desenvolvido por Gabriel e Felipe do Bluelab
            </div>
        </Container>
    );
}

export default withRouter(Menu);
