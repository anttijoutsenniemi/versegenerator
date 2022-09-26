import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Content  from './Content'

const ContentRoute = () => <Content/>;

const SecondRoute = () => <Text>Juu</Text>;

const BottomComponent : React.FC = () : React.ReactElement => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'content', title: 'Content', focusedIcon: 'map' },
    { key: 'second', title: 'Second', focusedIcon: 'camera' }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    content: ContentRoute,
    second: SecondRoute
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