
import AppNavigation from './src/navigation/AppNavigation';
import { ThemeProvider } from "./src/context/ThemeContext";
import { FirebaseProvider } from './src/context/FirebaseContext';

export default function App() {
  return (
    <FirebaseProvider>
    <ThemeProvider>
    <AppNavigation />
    </ThemeProvider>
    </FirebaseProvider>
  );
}


