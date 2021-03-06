import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ZumeInstallButton from 'Components/zume/ZumeInstallButton';
import ZumeLogo from 'Components/zume/ZumeLogo';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from 'Components/shared/navigation/ListItemLink';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import ForumIcon from '@material-ui/icons/Forum';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BookIcon from '@material-ui/icons/BookOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  useAppTranslation,
} from 'Components/zume/translationHooks';
import { RESET_STATE } from '@redux-offline/redux-offline/lib/constants';
import { reset } from 'Redux/store';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Menu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const trans = useAppTranslation();
  const [resetting, setResetting] = useState(false);

  return (
    <div className={classes.root}>
      <Box display="flex" p={1}>
        <Box flexGrow={1}>
          <ZumeLogo size="small" />
        </Box>
        <Box>
          <ZumeInstallButton />
        </Box>
      </Box>
      <List
        subheader={<ListSubheader>{t('menu|settings')}</ListSubheader>}
        component="nav"
        aria-label={t('menu|settings')}
      >
        <ListItem
          button
          onClick={() => {
            const shouldReset = window.confirm(t(t('menu|reset_app_warning')));
            if (shouldReset) {
              setResetting(true);
              dispatch(reset());
              dispatch({ type: RESET_STATE });
              setTimeout(() => {
                setResetting(false);
                window.location.reload();
              }, 500);
            }
          }}
        >
          <ListItemIcon>
            <DeleteForeverIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu|reset_app')} />
          {resetting && (
            <ListItemSecondaryAction>
              <CircularProgress />
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </List>
      <List
        subheader={<ListSubheader>{trans('About CDX')}</ListSubheader>}
        component="nav"
        aria-label={trans('About CDX')}
      >
        <ListItemLink href="/about">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={t('navigation|about')} />
        </ListItemLink>
        <ListItemLink href="https://cdx.theotech.org" target="_blank">
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu|forum')} />
        </ListItemLink>
        <ListItemLink
          href="https://digitalcommons.spu.edu/churchdxrepository/"
          target="_blank"
        >
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu|repository')} />
        </ListItemLink>
      </List>
    </div>
  );
}
