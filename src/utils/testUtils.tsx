import { PreloadedState } from '@reduxjs/toolkit'
import { render, RenderOptions } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { RootState, setupStore } from '../redux/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
}

const store = setupStore()

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {}, ...renderOptions }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
    <Provider store={store}>{children}</Provider>
  )

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
