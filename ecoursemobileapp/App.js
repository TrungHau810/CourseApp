import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import Lessons from "./components/Home/Lessons";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} options={title="Danh sách khóa học"}/>
      <Stack.Screen name="lessons" component={Lessons} options={title="Danh sách bài học"} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;