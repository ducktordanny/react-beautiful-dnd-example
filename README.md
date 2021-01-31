# React Beautiful Dnd

> When I wanted to use this library I had a problem when it was in a fixed and transformed sidebar so I thought it would be helpful if I publish it... Furthermore I found a link where is an example but that is for class component, but I needed it for functional component so this example is made with a functional component.

## Links

* https://codesandbox.io/s/k260nyxq9v?file=/index.js
* https://github.com/atlassian/react-beautiful-dnd/issues/128

## Problem

It was similar to this: https://codesandbox.io/s/6w8o2xx6lz
![The Issue's gif](./issue.gif)
(Here is its github issue link: https://github.com/atlassian/react-beautiful-dnd/issues/485)

## Solution

You need to use createPortal from 'react-dom'. (https://github.com/atlassian/react-beautiful-dnd/issues/128)
You can find my solution/example in the src folder in the App.js file.

I hope I could help.