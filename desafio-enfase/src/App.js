import React from 'react';
import './App.css';


import { Query } from 'react-apollo';
import { GET_ALL_QUESTIONS } from './queries/index'
import { Icon } from 'antd'


import Home from './components/home.js'

const App = () => (
  <div>
    <Query query={GET_ALL_QUESTIONS}>
      {({ data, loading, error }) => {
        if (loading) { return <div style={styles.container}><Icon type="loading" />&nbsp; Loading</div> }
        if (error) { return <div><Icon type="warning" />error</div> }
        return (
          <Home questions={data} />
        )
      }}
    </Query>
  </div>
)

export default App;


const styles = {
  container: {
    marginTop: '20%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}