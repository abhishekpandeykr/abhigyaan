---
title: 'Activity API'
description: 'Hide Your component without loosing the state.'
pubDate: 'Sep 22 2025'
tags: ['react', 'Activity', 'activity-api']
published: false
---

> The <strong>Activity</strong> API is now available for experimentation, with its <a href="https://react.dev/blog/2023/05/03/react-canaries" target="_blank" rel="noopener noreferrer">Canary</a> release.

<details>
  <summary><strong>What does this API do now?</strong></summary>
  This API will allow components to be
  <ul>
    <li>Visually hidden</li>
    <li>Preserve UI state with reduced performance coast compared to unmounting</li>
  </ul>
</details>

Current behaviour of `<Activity/>` is limited to `true/false`.

```jsx
<Activity mode={visibility ? 'visible' : 'hidden'}>
  <Page />
</Activity>
```

`<Activity />` Component accepts 2 props:-

- **mode-** type of string which holds value `visible` or `hidden`.
- **children-** A user interface component that is either visible or hidden.

When the `Activity` "boundary is hidden, all of its children are also hidden using CSS's `display: none` property, and all of its childrens effects are cleanedup and subscriptions are removed, but its states are preserved, and these continue to render with the low priority than anything visible on the screen at that point of time.

And the moment `Activity` boundary is visible React will unleash its children with their previous states and re-create their effects, and attach subscriptions if there are any. Rather than discarding the UI completely, React hide them and unleash them when ever user wanted and React make sure that it should not perform any side effects.
