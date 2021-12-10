import { Fragment } from 'react';
import Header from '../Header';

export default function Layout(props) {
  return (
    <Fragment>
      <Header />

      <main>
        <div>{props.children}</div>
      </main>
    </Fragment>
  );
}
