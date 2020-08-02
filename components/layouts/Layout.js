import React, { Fragment } from "react";

import { Global, css } from "@emotion/core";
import Head from "next/head";
import Header from "./Header";

const Layout = (props) => {
  return (
    <Fragment>
      <Global
        styles={css`
          :root {
            --gris: #3d3d3d;
            --gris2: #6f6f6f;
            --gris3: #e1e1e1;
            --naranja: #da552f;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-boc;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            line-height: 1.5rem;
            font-family: "PT Sans", sans-serif;
          }
          h1,
          h2,
          h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5rem;
            margin-top: 2rem;
          }

          h1,
          h2 {
            font-family: "Roboto Slab", serif;
            font-weight: 700;
          }
          h3 {
            font-family: "PT Sans", sans-serif;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          a {
            text-decoration: none;
          }
          img {
            max-width: 100%;
          }
        `}
      />

      <Head>
        html
        
          <title>ProducHunt </title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
            crossorigin="anonymous"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=PT+Sans&family=Roboto+Slab:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/css/app.css" />
        
      </Head>
      <Header />

      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;