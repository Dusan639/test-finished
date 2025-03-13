import React from 'react'
import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyles = React.memo(
  createGlobalStyle`${css`
    * {
      margin: 0;
      box-sizing: border-box;
      padding: 0;
      border: 0;
      font-family: 'Montserrat', sans-serif;
    }

    table {
      border-collapse: collapse;
      border-spacing: 0;
      margin-top: 10px;
    }

    .wrapper {
      max-width: 1440px;
      margin-inline: auto;
      padding-inline: 20px;
      padding-block: 40px;
    }

    th,
    td {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
  `}`
)
