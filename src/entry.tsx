import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store'
import App from './App'

const store = setupStore()

const domContainer = document.querySelector('#app')

if (domContainer) {
  const root = ReactDOM.createRoot(domContainer)
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}
