import { FormProvider } from './context/FormContext';
// import Home from './pages/index'
import Form from './components/Form';
import Schema from './data/Schema.json'


function App() {
  return (
    <div >
      <FormProvider>
          <Form schema={Schema} />
      </FormProvider>
    </div>
  );
}

export default App;
