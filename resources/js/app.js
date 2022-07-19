//require('./bootstrap');
import { App ,createInertiaApp} from '@inertiajs/inertia-react'
import React, { Suspense } from 'react';
import { render } from 'react-dom'
import "./styles/app/app.scss";

createInertiaApp({
  id: 'app',
  resolve: name => import(`./pages/${name}`),
  setup({ el, App, props }) {
    render(<App {...props} />, el)
  },
})

