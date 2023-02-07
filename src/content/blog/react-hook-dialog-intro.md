---
title: 'React Hook Dialog: use hook to master your dialog components'
description: "The introduction for my new oss library: React Hook Dialog. It's a type-safe lib with react hooks to reuse your dialog components."
date: '2022-7-22 23:33'
language: 'en'
tags: ['code', 'react', 'dialog', 'modal']
---

> <https://dev.to/jsun969/react-hook-dialog-use-hook-to-master-your-dialog-components-38jd>

## Introduction

I made an open source lib: react-hoook-dialog (Welcome star 🌟🌟🌟)

GitHub: <https://github.com/jsun969/react-hook-dialog>

It's a type-safe lib with react hooks to reuse your dialog components.

With simple steps, we can use our dialog components everywhere. Let's start!

## Installation

```bash
npm install react-hook-dialog
```

## Usage

In this example, we use mui for the ui lib

You can see the full example in codesandbox:
<https://codesandbox.io/s/rhd-mui-example-etwz20>

First, let's initialize our default dialog props

`lib/dialog.ts`

```ts
import { createDialogs, createDialogHooks } from 'react-hook-dialog';

type CustomDialogProps = { title: string; content: string };

export const dialogs = createDialogs<CustomDialogProps, 'customDialog'>({
  customDialog: { title: '', content: '' },
});

export const dialog = createDialogHooks(dialogs);
```

Next, use `useDialogController` to control your dialog props

```tsx
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  DialogActions,
} from '@mui/material';

import { dialog } from '../lib/dialog';

const CustomDialog: React.FC = () => {
  const { isOpen, handleClose, props } =
    dialog.useDialogController('customDialog');

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
```

Add `DialogProvider` in your entry file (`main.ts`/`index.ts`)

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { DialogProvider } from 'react-hook-dialog';

import App from './App';
import CustomDialog from './components/CustomDialog';
import { dialogs } from './lib/dialog';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DialogProvider dialogs={dialogs}>
      <App />
      <CustomDialog />
    </DialogProvider>
  </React.StrictMode>,
);
```

Awesome!! Now you can use your dialog everywhere

```tsx
import { Button, Stack, Typography } from '@mui/material';

import { dialog } from './lib/dialog';

const App: React.FC = () => {
  const { isOpen, open, close } = dialog.useDialog('customDialog', {
    title: 'Some Title',
    content: 'some content',
  });

  return (
    <>
      <Typography>Dialog Status: {isOpen ? 'open' : 'closed'}</Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => open()}>
          Open Dialog
        </Button>
        <Button variant="contained" onClick={() => close()}>
          Close Dialog
        </Button>
        <Button
          variant="outlined"
          onClick={() => open({ title: 'Another Title' })}
        >
          Open Another Dialog
        </Button>
      </Stack>
    </>
  );
};

export default App;
```

## More

What's more? Check Readme in github!

API Docs: <https://github.com/jsun969/react-hook-dialog#-api>

Welcome star xD 🌟🌟🌟
