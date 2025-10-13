---
title: 'React 19.2 <Activity />: Hide Components Without Losing State'
description: 'Learn how to use the new <Activity /> component in React 19.2 to hide components without unmounting, preserve UI state, and pre-render hidden content using Suspense.'
pubDate: 'Oct 12 2025'
tags:
  [
    'react',
    'Activity',
    'activity-api',
    'Activity Component',
    'React 19.2',
    'Preserve UI state',
    'Hide components',
    'Suspense rendering',
  ]
published: true
---

> The <strong>Activity</strong> Component is now available with React version <a href="https://react.dev/reference/react/Activity" target="_blank" rel="noopener noreferrer">19.2</a> release.

<details>
  <summary><strong>What does this Component do?</strong></summary>
  This Component will allow components to be
  <ul>
    <li>Visually hidden</li>
    <li>Preserve UI state with reduced performance cost compared to unmounting</li>
  </ul>
</details>

<br />

> Current behaviour of `<Activity/>` is limited to `visible/hidden`.

```jsx
<Activity mode={visibility ? 'visible' : 'hidden'}>
  <Page />
</Activity>
```

`<Activity />` Component accepts 2 props:-

- **mode-** type of string which holds value `visible` or `hidden`.
- **children-** A user interface component that is either visible or hidden.

When the `Activity` "boundary is hidden, all of its children are also hidden using CSS's `display: none` property, and all of its childrens effects are cleanedup and subscriptions are removed, but its state's are preserved, and these continue to render with the low priority than anything visible on the screen at that point of time whenever there is any update in props.

When the `Activity` boundary is visible React restores its children with their previous states and re-create their effects, and attach subscriptions if there are any. Instead of discarding the UI, React hides it and restores it whenever needed and React make sure that it should not perform any side effects.

### What benefit's does this new Component will provide?

- **Restoring the state:-** with the help of `Activity` Component, we can restore the last modified state of component before it disapper from screen.

  ```jsx
  const [inputVisible, setInputVisible] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className='form'>
      <button onClick={() => setInputVisible(!inputVisible)}>
        Toggle Input Visibility
      </button>
      <Activity mode={inputVisible ? 'visible' : 'hidden'}>
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='enter your text'
        />
      </Activity>
      <Activity mode={inputVisible ? 'hidden' : 'visible'}>
        <h3>Home Screen </h3>
      </Activity>
    </div>
  );
  ```

  If we type something into the input field, then toggle its visibility off and back on, the previously entered data will be restored.

- **Fetch and pre-render the data that the user is about to see:-** we can pre-render the data when `<Activity/>` boundry is _hidden_, as component the hidden component will render with the lowest priority, by doing this we wil make the rendering fast. we can only fetch the data from the sources which are `Suspense Enabled` like

  - `lazy loading` component with the `lazy` api.
  - Reading values of cached promise with `use api`.
  - Data Fetching with Suspense Enabled Framework like `NextJS`.

  ```jsx
  Root.js
  ---------------------------------------
  const [isHome, setIsHome] = useState(true);

  <Suspense fallback={<p>Loading...</p>}>
    <Activity mode={isHome ? 'visible' : 'hidden'}>
      <Dashboard />
    </Activity>
    <Activity mode={isHome ? 'hidden' : 'visible'}>
      <StocksList />
    </Activity>
  </Suspense>
  ```

  In above code block, when Page gets loaded we see `Loading...` in the beginning, and then we see `<Dashboard />` Component renderd on the screen. But behind the scene `<StockList />` Component also gets renderd, and it fetches the data which it needed.

  ```jsx
  StocksList.js
  ------------------------------
  const stockList = use(fetchStocks('/stocks-list'));

  return (
  <p>{stockList.map((stock) => (
    <span key={stock.id}>{stock.name}</span>
    ))}
  </p>
  )
  ```

  Now `StockList` Component is already renderd with the data which it needs.

> React’s `<Activity />` component is a powerful addition for preserving UI state while improving performance. It allows developers to toggle component visibility without unmounting and supports data prefetching through Suspense. Currently,` <Activity />` supports two props, with more functionality expected in future updates.
