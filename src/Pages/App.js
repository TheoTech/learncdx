import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ZumeInstallBanner from 'Components/zume/ZumeInstallBanner';
import ZumeLogo from 'Components/zume/ZumeLogo';
import { useSelector } from 'react-redux';
import SessionGridList from 'Components/shared/session/SessionGridList';
import { getSessionTitles } from 'Redux/sessions';

function App() {
  const titles = useSelector(getSessionTitles);

  return (
    <Container component="main" maxWidth="md">
      <Box pb={10}>
        <ZumeInstallBanner />
        <br />
        <div className="App">
          <header className="App-header">
            <Box display="flex" m={1} p={1} justifyContent="center">
              <ZumeLogo size="large" />
            </Box>
          </header>
          <p>
            This learning path guides you through church digital transformation.
            There are 6 modules covering strategy, history, youth, equity,
            creativity, and experimentation.
          </p>
          <p>
            Follow them at your own pace or convene a group to discuss each
            module with you. Click on a module to get started.
          </p>
          <SessionGridList sessions={titles} variant="wrapped" animate={true} />
          <br />
        </div>
      </Box>
    </Container>
  );
}

export default App;
