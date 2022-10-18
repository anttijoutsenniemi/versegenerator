import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Content  from './Content';
import Songs from './Songs';

const BottomComponent : React.FC = () : React.ReactElement => {
  const [buttons, setButtons] = useState<string[]>(["SONG:"]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'versing', title: 'Versing', focusedIcon: 'pencil' },
    { key: 'songs', title: 'Saved Songs', focusedIcon: 'music-note' }
  ]);

  const VersingRoute = () => <Content buttons={buttons} setButtons={setButtons}/>;

  const SongsRoute = () => <Songs/>;

  const renderScene = BottomNavigation.SceneMap({
    versing: VersingRoute,
    songs: SongsRoute
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomComponent;