<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

During this project we'll be building a web application that allows for easily categorizing information in radar charts. Users will be able to keep track of multiple categories, with each category having multiple data sets. To keep track of this data and pass it to the correct components we'll make heavy use of Redux and React Redux.

The following diagram can serve as a useful reference point on how data is flowing in the application if you ever get a little lost.
<img src="https://raw.githubusercontent.com/DevMountain/categorizer/solution/readme_assets/categorizer-redux-flow.png" />

**A live example can be found [here](https://devmountain.github.io/categorizer/)**

<img src="https://raw.githubusercontent.com/DevMountain/categorizer/master/readme_assets/completed.png" />

## Setup

* `Fork` and `clone` this repository.
* `cd` into the project directory.
* Run `npm install` to download the included dependencies.
* In one terminal window/tab run `npm test` to start the test suite.
* In another terminal window/tab run `npm start` to spin up the development server.

## Step 1

### Summary

In this step we'll download the necessary packages to use Redux and create a reducer for our charts.

### Instructions

* Install Redux and React Redux using npm.
* Create a `chart.js` file in `src/ducks/`.
* Create an initial state and reducer inside of the `chart.js` file you just created.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by installing the following dependencies we'll need in order to use Redux with our react application. Open up a third terminal window/tab and make sure you are still in the root directory of the project and then run `npm install redux react-redux`.

Next, open the `ducks` folder ( `src/ducks` ) and create a file called `chart.js`. This is where we'll create our reducer, action types, action creators, and the initial state for our reducer.

Now let's open `src/ducks/chart.js` and start by creating an `initialState` variable. `initialState` should be an object with two properties: `activeChartIndex` and `charts`.

* `activeChartIndex` - This is where we will store the index of the chart that the user has chosen to display.
* `charts` - This will be an array of objects containing the data necessary to create the charts. 

Let's set the value of `activeChartIndex` to `0` so it will display the first chart and let's default `charts` to an array. We'll also add a default chart to the `charts` array.
The `charts` array will contain an array of chart objects that will keep track of the following information:

* `labels` (array of strings): The labels that will appear at the corners of the chart.
* `name` (string): The name of the chart.
* `datasets` (array of objects): Data required for rendering values on to the chart

Our default chart will be the following object:

<details>

<summary> <code> Default Chart Object </code> </summary>

```js
{
  labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ], 
  name: "Example Chart", 
  datasets: [
    {
      label: "My First dataset", 
      data: [65, 59, 90, 81, 56, 55, 40]
    },
    {
      label: "My Second dataset",
      data: [28, 48, 40, 19, 96, 27, 100]
    }
  ]
}
```

</details>

<br />

To explain a little bit more on `datasets`, the `data` array contains the integer values for the labels. Let's take a look at the first dataset object:

```js
{
  label: "My first dataset",
  data: [65, 59, 90, 81, 56, 55, 40]
} 
```

Since this chart has the labels: "Red", "Blue", "Yellow", "Green", "Purple", "Orange". The value for "Red" is 65, the value for "Blue" is 59, and so on till the the value for "Orange" is 40. This relationship is made through the index of the arrays.

Your `chart.js` should now look like:

<details>

<summary> <code> chart.js </code> </summary>

```js
const initialState = {
  activeChartIndex: 0,
  charts: [
    {
      labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ], 
      name: "Example Chart", 
      datasets: [
        {
          label: "My First dataset", 
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    }
  ]
};
```

</details>

<br />

Next, let's create our reducer under our `initialState` variable. Create and export by default a function named `chart` which takes two parameters: `state` and `action`.

* `state` - This will be an object representation of our application's current state.
  * It should default to `initialState`.
* `action` - An object containing information about what has occurred and any data necessary to perform a state change.

```js
export default function chart( state = initialState, action ) {

}
```

In `ES2015` we can set default parameters by using an `=` sign in the function's head. `state = initialState` means that whenever `chart` gets called and `state` is not defined, it will use the value of `initialState` instead.

Now, let's add a `switch` statement to the `chart` function that checks `action.type`. Later it will check for specific types, but for now just give it a `default` case that returns `state`.

Your chart reducer should now look like:

<details>

<summary> <code> chart reducer </code> </summary>

```js
export default function chart( state = initialState, action ) {
  switch(action.type) {
    default:
      return state;
  }
}
```

</details>

</details>

### Solution

<details>

<summary> <code> src/ducks/chart.js </code> </summary>

```js
const initialState = {
  activeChartIndex: 0,
  charts: [
    {
      labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ], 
      name: "Example Chart", 
      datasets: [
        {
          label: "My First dataset", 
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    }
  ]
};

export default function chart( state = initialState, action ) {
  switch(action.type) {
    default:
      return state;
  }
}
```

</details>

## Step 2

### Summary

In this step we'll create a store that we'll use the reducer we made in the previous step.

### Instructions

* Create a `store.js` file in `src/`
* Create a Redux store inside of the `store.js` file you just created.

<details>

<summary> Detailed Instructions </summary>

<br />

Create a new file in `src` named `store.js`. Inside of `src/store.js` we'll want to import `createStore` from `redux` and `chart` from `src/chart.js`. Then we can use `createStore` by invoking it and passing in our chart reducer. We'll also want to export this by default.

```js
import { createStore } from 'redux';
import chart from './ducks/chart';

export default createStore(chart);
```

Basically Redux is creating the store and calling our reducer `chart` with `undefined` and a dummy action as arguments. This will then cause our reducer to return the `initialState` variable and give our store an initial state.

</details>

### Solution

<details>

<summary><code>src/store.js</code></summary>

```javascript
import { createStore } from "redux";
import chart from "./ducks/chart";

export default createStore( chart );
```

</details>

## Step 3

### Summary

In this step we'll connect Redux to our application in `index.js`.

### Instructions

* Open `index.js`. ( `src/index.js` )
* Import `Provider` from `react-redux` and `store` from `src/store.js`.
* In `ReactDOM.render()`:
  * Wrap the `<App />` component in a `Provider` component.
  * Add a `store` prop to the `Provider` component that equals `store`.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's being by importing `Provider` from `react-redux` and `store` from `src/store.js` in `src/index.js`. 

```js
import { Provider } from 'react-redux';
import store from './store.js';
```

Next, let's wrap the `App` component with the `Provider` component and add a prop on `Provider` called `store` that's equal to the `store` we imported from `'./store.js'`. We use `Provider` as a wrapper component that gives the rest of the application access to our Redux store.

```js
ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById( 'root' )
);
```

</details>

### Solution

<details>

<summary><code>src/index.js</code></summary>

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";

import store from "./store";

import App from "./components/App";

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById( 'root' )
);

```

</details>

## Step 4

### Summary

In this step we will connect the `App` component definition to Redux.

### Instructions

* Open `App.js`. ( `src/components/App.js` )
* Import `connect` from `react-redux`.
* Create a `mapStateToProps` function above the `export` statement of `App`.
  * This function should use object destructuring on the first parameter.
  * This function should return an object with the following properties:
    * `activeChart` - Should equal the actual object of the active chart.
    * `charts` - Should equal the entire array of charts.
* Modify the original `export` of `App` to export it's decorated version:
  * Invoke `connect` and pass in `mapStateToProps` as the first parameter.
  * Invoke the function it returns with `App` as the first parameter.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's being by opening `src/components/App.js`. Next, import `connect` from `react-redux`. We'll use this later to connect our `App` component. Next, let's create a function above our `export` statement named `mapStateToProps` that destructures the first parameter ( `{ activeChartIndex, charts }` ). This function will be used to tell Redux which pieces of state our `App` component is interested in and also format state before reaching `App`. Let's have our `mapStateToProps` return an object with a `activeChart` and `charts` property.

* `activeChart` should equal the actual object of the chart, we can do this by using our `activeChartIndex` with our `charts` array. ( `charts[ state.activeChartIndex ]` )
* `charts` should equal the array of charts. ( `charts` )

```js
function mapStateToProps( { activeChartIndex, charts } ) {
  return {
    activeChart: charts[ activeChartIndex ],
    charts: charts
  };
}
```

Using `ES2015` we can destructure the object that gets passed into `mapStateToProps` by using `{ activeChartIndex, charts }`. This takes the object that would get passed in as the first parameter and turns its props into variables we can reference in the function. This is the same thing as doing:

```js
function mapStateToProps( state ) {
  return {
    activeChart: state.charts[ state.activeChartIndex ],
    charts: state.charts
  }
}
```

To finish connecting the `App` component definition we need to create a decorator by invoking `connect` and passing in `mapStateToProps`. This will return a function we need to then invoke and pass in our `App` component. Finally we'll then want to modify our `export` statement to equal the `decoratedComponent` instead of `App`. 

Decorators can be created one of two ways:

```js
function mapStateToProps( state ) {
  return state;
}
const decorator = connect( mapStateToProps );
const decoratedComponent = decorator( App );
export default decoratedComponent;
```

```js
function mapStateToProps( state ) {
  return state;
}
export default connect( mapStateToProps )( App );
```

Either way accomplishes the same thing, but in the solutions to come I'll be using the shorter version.

</details>

### Solution

<details>

<summary> <code> src/components/App.js </code> </summary>

```jsx
import React, { Component } from "react";
import {connect} from "react-redux";

import "./App.css";

import NewChart from "./NewChart/NewChart";
import Sidebar from "./Sidebar/Sidebar";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Sidebar />
        <main className="app__main">
          <header className="app__header">
            <h1 className="app__title">Categorizer</h1>

            <div className="app__new-chart">
              <NewChart />
            </div>
          </header>
        </main>
      </div>
    );
  }
}

function mapStateToProps( { activeChartIndex, charts } ) {
  return {
    activeChart: charts[ activeChartIndex ],
    charts
  };
}

export default connect(mapStateToProps)(App);
```

</details>

## Step 5

### Summary 

In this step we are going to dive deeper into the flow of data to remove any layers of abstraction that might have appeared. If you feel confident in the flow of data up to this point, feel free to skip this step.

<details>

<summary> Visualization </summary>

<br />

So far we've create a reducer and a store and then hooked it up to our `App`. But what exactly is the order of events in these files we've created? The first event in this chain is in our `index.js`. When we `import` `store` it goes into `store.js` and then `store.js` imports `chart.js` which causes our `initialState` variable to be created. After that `store.js` then invokes `createStore(chart)` which calls our reducer in `chart.js`. It calls our reducer with `undefined` for the state parameter and an object with a type property equal to `"@@redux/INIT"` for the action parameter. 

Since `state` was equal to undefined our default parameter sets `state` equal to our `initialState` variable in `chart.js`. Then our switch statement fires for `action.type` and returns `state` because of the `default` case. 

We then go back to `index.js` which then `imports` `App.js`. This causes the export default for `App` to fire which calls our `mapStateToProps` function above the `export`. `mapStateToProps` is called with our initial state as an object:

```js
{
  activeChartIndex: 0,
  charts: [
    {
      labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ], 
      name: "Example Chart", 
      datasets: [
        {
          label: "My First dataset", 
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    }
  ]
}
```

`mapStateToProps` then modifies this object and returns a new object. This new object then becomes the `props` for the `App` component. Be aware that there are other events happening in between these events, mostly by Redux, but at a high-level this is the chain of events for the files we created.

In the following giphy take note of which file the debugger is currently in:

<img src="https://github.com/DevMountain/categorizer/blob/solution/readme_assets/1-1g.gif" />

</details>

## Step 6

### Summary

In this step we will be creating our first action type and action creator. It will be the action of creating new charts. We'll then update our reducer to handle our first action by returning a brand new state object. 

### Instructions

* Open `chart.js`. ( `src/ducks/chart.js` )
* Create a `CREATE_CHART` action type.
* Create a `createChart` action creator underneathe the `chart` reducer.
  * This function should take two parameters:
    * `labels` - An array of labels that the chart will have.
    * `name` - A string that equals the name of the chart.
  * This function should return an object with two properties:
    * `chart` - An object containing the necessary chart data. 
      * Hint: `{ lables: [], name: string, datasets: [] }`
      * Since we do not get any `datasets` from this action, default it to an empty array.
    * `type` - A string that equals the action type, in this case `CREATE_CHART`.
  * Export this action creator function.
* Modify the `chart` reducer to handle adding a new chart:
  * Add a `case` to the `switch` statement in the reducer for `CREATE_CHART`.
  * Create and return a <b>new</b> state object with the following properties:
    * `activeChartIndex` - Should equal 0 because we add new `charts` to the beginning of the `charts` array.
    * `charts` - Should equal an array with the new chart in front and all the old charts after it.
    * <b>Remember to not mutate old state</b>

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `src/ducks/chart.js`. At the top of the file create a variable called `CREATE_CHART` and set it equal to `"CREATE_CHART"`. This variable is our action type. You can think of action types as descriptions of what happened. The action types get used by our reducer to determine how to change state.

```js
const CREATE_CHART = "CREATE_CHART";
```

Now let's create our action creator underneath the `chart` reducer. Create and export a function named `createChart` with two parameters: 

* `labels` - An array of labels that the chart will have
* `name` - A string that equals the name of the chart

This function should return an object with two properties:

* `chart` - An object containing the necessary chart data
* `type` - The action type, in this case `CREATE_CHART`

We can determine what the necessary chart data is by looking at our `initialState` object and the first object in the `charts` array. ( `labels: [], name: string, datasets: []` ) 

```js
export function createChart(labels, name) {
  return {
    chart: { labels, name, datasets: [] },
    type: CREATE_CHART
  }
}
```

In `ES2015` you can use shorthand notations for assigning properties on an object. The above solution is the same thing as doing:

```js
return {
  chart: { labels: labels, name: name, datasets: [] },
  type: CREATE_CHART
}
```

With the action creator ready to go, we now need to update the reducer function itself to handle the action. Add a new `case` to the `switch` statement, above the default case, that checks for `CREATE_CHART`. This case should return a new state object where our new `chart` is at the beginning of the `charts` array and has all of the previous state's charts after it. `activeChartIndex` should still be set to 0 since our new chart gets added to the beginning of the `charts` array.

Remember not to mutate state! You should be returning a brand new object based on the values from the previous state object.

```js
export default function chart( state = initialState, action ) {
  switch(action.type) {
    case CREATE_CHART:
      return {
        activeChartIndex: 0,
        charts: [ action.chart, ...state.charts ]
      };
    default:
      return state;
  }
}
```

We'll see this work live in our App in the next step.

</details>

### Solution

<details>

<summary> <code> src/ducks/chart.js </code> </summary>

```js
const CREATE_CHART = "CREATE_CHART";

const initialState = {
  activeChartIndex: 0,
  charts: [
    {
      labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ], 
      name: "Example Chart", 
      datasets: [
        {
          label: "My First dataset", 
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    }
  ]
};

export default function chart( state = initialState, action ) {
  switch(action.type) {
    case CREATE_CHART:
      return {
        activeChartIndex: 0,
        charts: [ action.chart, ...state.charts ]
      };
    default:
      return state;
  }
}

export function createChart(labels, name) {
  return {
    chart: { labels, name, datasets: [] },
    type: CREATE_CHART
  };
}
```

</details>

## Step 6

### Summary

In this step we'll import the `createChart` action creator into the `App` component, connect our action creator, and then pass it down as a `prop` into our `NewChart` component.

### Instructions

* Open `App.js`. ( `src/components/App.js` )
* Import `createChart` from `../ducks/chart.js`.
* Connect the `createChart` action creator:
  * Where we export our decorated `App` component add an `object` after `mapStateToProps` as a second parameter.
  * Inside this new `object` add `createChart`.
* Deconstruct `props` at the top of the `render` method.
  * Hint: `mapStateToProps` can tell you what props `App` will have.
* Create a `prop` where we `render` `NewChart` called `createChart` and set it equal to our `createChart` action creator.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `src/components/App.js`. Next let's import our `createChart` action creator from our `chart` reducer after the import of `./App.css`.

```js
import { createChart } from '../ducks/chart';
```

Now that `App.js` has access to our action creator we need a way for our `App` component to dispatch this action to our reducer. We can do this by adding an object after `mapStateToProps` where we export our decorated component.

```js
export default connect(mapStateToProps, { createChart })(App);
```

Basically this is allowing us to directly call `this.props.createChart` inside of our `App` component. Without doing it this way, you would have to use the `dispatch` function with the action creator as a parameter. Redux automatically adds the `dispatch` function to `props`. It would look like: `this.props.dispatch(this.props.createChart)`. 

Also another thing to note is that once we create this object of action creators, `dispatch` is no longer automatically added to `props`. Any future action creators will have to be added to this object as well in order to be used in the `App` component.

<details>

<summary>The magic behind <code>connect</code> wrapping action creators</summary>

<br />

It may feel a little like magic, but the wrapping of action creators in dispatch is fairly simple! The actual source code will be different, but this is accomplishing the same thing.

```javascript
// Take in an object of action creators, i.e { createChart }
function wrapActionCreator( actionCreatorsObject ) {
  // A new object that will hold the wrapped action creators
  const wrappedActionCreators = {};
  // Iterate over each action creator in the object
  for ( let actionCreator in actionCreatorsObject ) {
    // Creating a new function to capture arguments to the action creator
    // such as "labels" and "name"
    wrappedActionCreators[ actionCreator ] = ( ...args ) => {
      // Create the action, passing in the captured arguments
      const action = actionCreatorsObject[ actionCreator ]( ...args );
      // Dispatch the action to Redux
      dispatch( action );
    }
  }
  return wrappedActionCreators;
}
```

</details>

<br />

Now that our action creator is ready to be used let's pass it down as a `prop` to our `NewChart` component. Before we pass down our prop, let's deconstruct our `props` in the `App` component at the top of the `render` method. This will allow us to avoid having to use `this.props.propNameHere` every time we want to refer to a prop.

```js
render() {
  const {
      activeChart,
      charts,
      createChart
  } = this.props;
}
```

Now we can pass down our `createChart` prop where we render `NewChart`.

```jsx
<NewChart createChart={ createChart } />
```

</details>

### Solution

<details>

<summary> <code> src/components/App.js </code> </summary>

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import { createChart } from '../ducks/chart';

import NewChart from "./NewChart/NewChart";
import Sidebar from "./Sidebar/Sidebar";

class App extends Component {
  render() {
    const {
      activeChart,
      charts,
      createChart
    } = this.props;
    
    return (
      <div className="app">
        <Sidebar />
        <main className="app__main">
          <header className="app__header">
            <h1 className="app__title">Categorizer</h1>

            <div className="app__new-chart">
              <NewChart createChart={ createChart } />
            </div>
          </header>
        </main>
      </div>
    );
  }
}

function mapStateToProps( { activeChartIndex, charts } ) {
  return {
    activeChart: charts[ activeChartIndex ],
    charts: charts
  };
}

export default connect(mapStateToProps, { createChart })(App);
```

</details>

## Step 7

### Summary

In this step we will start making our `NewChart` component functional by creating a constructor method, state, and a `handleChange` method to handle user input.

### Instructions

* Open `NewChart.js`. ( `src/components/NewChart/NewChart.js` )
* Create a `constructor` method that takes `props` as a parameter.
  * Call super with `props` as a parameter.
  * Create a state object with the following properties:
    * `labels` - A list of the labels submitted so far. It should default to an empty array.
    * `name` - The text from the name input. It should default to an empty string.
    * `newLabel` - The text from the new label input. It should default to an empty string.
* Create a `handleChange` method for handling user input. It should take two parameters:
  * `field` - The name of the field that is changing.
  * `val` - The value of the element from the change event object.
* Bind `this` to the `handleChange` method at the bottom of the `constructor` method:
  * Create two different variables, one for `handleNameChange` and one for `handleInputChange`. Both should be equal to `this.handleChange.bind(this, "")` with the string being the property on state to update.
    * this.handleNameChange = this.handleChange.bind(this, "name");
    * this.handleLabelChange = this.handleChange.bind(this, "newLabel");
* Deconstruct state at the top of the `render` method.
* Update the input with the className of `"new-chart__name new-chart__input"`:
  * Create an `onChange` that calls `this.handleNameChange`.
  * Set a `value` attribute on the input element equal to `name`.
* Update the input with the className of `"new-chart__category new-chart__input"`:
  * Create an `onChange` that calls `this.handleLabelChange`.
  * Set a `value` attribute on the input element equal to `newLabel`.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `src/components/NewChart/NewChart.js`. Next let's add a `constructor` method that takes `props` as its first parameter. Then call super with `props` as a parameter. Finally create a `state` object with three properties after `super(props)`:

* `labels` - A list of the labels submitted so far. It should default to an empty array.
* `name` - The text from the name input. It should default to an empty string.
* `newLabel` - The text from the new label input. It should default to an empty string.

```js
constructor( props ) {
  super( props );

  this.state = {
    labels: [],
    name: '',
    newLabel: ''
  };
}
```

Next up we'll need a `handleChange` method so we can accept user input. `handleChange` will take two arguments:

* `field` - The name of the field that is changing, in this case that will be `"name"` or `"newLabel"`.
* `event` - The DOM event triggering the change and carrying the new value.

All this method needs to do is update the specified field on state with the specified value.

```js
handleChange(field, event) {
  this.setState({ [ field ]: event.target.value });
}
```

Before we attach this method to the JSX, let's `bind` `this` to `handleChange` two different version of `handleChange` in the constructor.

```javascript
constructor( props ) {
  super( props );

  this.state = {
    labels: [],
    name: '',
    newLabel: ''
  };

  this.handleNameChange = this.handleChange.bind( this, "name" );
  this.handleLabelChange = this.handleLabelChange.bind( this, "newLabel" );
}
```

Now let's destructure `labels`, `name`, and `newLabel` from `this.state` at the top of the `render` method so we can refer to them witout having to use `this.state`. 

```js
render() {
  const {
    labels,
    name,
    newLabel
  } = this.state;
}
```

Next, let's hook up our `handleChange` method to the input fields for chart name and chart label. 

Locate the `input` element with the `className` of `"new-chart__name new-chart__input"`. Let's add an `onChange` attribute to it that equals `this.handleNameChange`. Since we bound `this` in the constructor, we are good to go. Next let's add a `value` attribute on the `input` element equal to `name`. Since we deconstructed `state` we didn't have to use `this.state.name`.

```jsx
<input
  className="new-chart__name new-chart__input"
  type="text"
  onChange={ this.handleNameChange }
  value={ name }
/>
```

Next let's repeat the same exact steps for the `input` element with the `className` of `"new-chart__category new-chart__input"`. However, change the `onChange` attribute to equal `this.handleLabelChange` and change the `value` attribute to equal `newLabel`.

```jsx
<input
  className="new-chart__category new-chart__input"
  required
  type="text"
  onChange={ this.handleLabelChange }
  value={ newLabel }
/>
```

</details>

### Solution

<details>

<summary> <code>src/components/NewChart/NewChart.js</code> </summary>

```jsx
import React, { Component, PropTypes } from "react";

import "./NewChart.css";

export default class NewChart extends Component {
  static propTypes = { createChart: PropTypes.func.isRequired };

  constructor( props ) {
    super( props );

    this.state = {
      labels: [],
      name: '',
      newLabel: ''
    };

    this.handleNameChange = this.handleChange.bind( this, "name" );
    this.handleLabelChange = this.handleChange.bind( this, "newLabel" );
  }

  handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  render() {
    const {
      labels,
      name,
      newLabel
    } = this.state;
    return (
      <div className="new-chart">
        <div className="new-chart__form-group">
          <label className="new-chart__label">Chart Name:</label>
          <input
            className="new-chart__name new-chart__input"
            type="text"
            onChange={ this.handleNameChange }
            value={ name }
          />
        </div>
        <form className="new-chart__form-group">
          <label className="new-chart__label">Add Label:</label>
          <input
            className="new-chart__category new-chart__input"
            required
            type="text"
            onChange={ this.handleLabelChange }
            value={ newLabel }
          />
        </form>

        <div className="new-chart__labels-wrapper">
          <label className="new-chart__label">Labels:</label>
          <span className="new-chart__labels">[] (Min. 3)</span>
        </div>

        <button className="new-chart__submit">
          Submit
        </button>
      </div>
    );
  }
}
```

</details>

## Step 8

### Summary

In this step we will continue to make our `NewChart` component functional by handling adding new `labels`.

### Instructions

* Open `NewChart.js`. ( `src/components/NewChart/NewChart.js` )
* Create a new class method called `addLabel` that takes an `event` object as the first parameter.
  * This method should call `event.preventDefault();` so the browser doesn't refresh.
  * Then the method should use `setState` to update the following properties on state:
    * `labels` - Should equal the previous list of labels from state with the new label added to the end.
    * `newLabel` - Should then be reset back to its default value of `''`.
* Bind `this` to `addLabel` at the bottom of the `constructor` method.
* Add an `onSubmit` attribute to the `form` element with the `className` of `"new-chart__form-group"`.
  * It should call `this.addLabel`.
* Change the span with the `className` of `"new-chart__labels"` to display the current labels from state inside [ ].
  * For example, if I had the labels `green` and `red`:
    * "[ green, red ] (Min. 3)"

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `NewChart.js` ( `src/components/NewChart/NewChart.js` ). Next let's add a new class method called `addLabel`. `addLabel` will take a single `event` parameter. Which will be the change event object. This method should call `event.preventDefault()`, to prevent a browser refresh, and then use `this.setState()` to update two properties on state. It should update `this.state.labels` to equal a new array of all the previous labels with the new label at the end. It should also set `newLabel` back to it's default value afterwards.

```js
addLabel(event) {
  event.preventDefault();
  this.setState({
    labels: [ ...this.state.labels, this.state.newLabel ],
    newLabel: ''
  });
}
```

Next, let's `bind` `addLabel` at the bottom of the `constructor` method. 

```js
this.addLabel = this.addLabel.bind( this );
```

Then we can assign an `onSubmit` attribute to the `form` element with the `className` of `"new-chart__form-group"`. This will allow us to press the `enter` key to execute our `addLabel` method. 

```jsx
<form className="new-chart__form-group" onSubmit={ this.addLabel }>
```

Finally we'll need to update the `span` element with the `className` of `"new-chart__labels"` to show our labels. Inside the [ ] we can use `{ }` to call on `labels`. Let's use the array prototype `join` to join our labels by a comma and a space.

```jsx
<span className="new-chart__labels">[ { labels.join(', ') } ] (Min. 3)</span>
```

</details>

### Solution

<details>

<summary> <code> src/components/NewChart/NewChart.js </code> </summary>

```jsx
import React, { Component, PropTypes } from "react";

import "./NewChart.css";

export default class NewChart extends Component {
  static propTypes = { createChart: PropTypes.func.isRequired };

  constructor( props ) {
    super( props );

    this.state = {
      labels: [],
      name: '',
      newLabel: ''
    };

    this.handleNameChange = this.handleChange.bind( this, "name" );
    this.handleLabelChange = this.handleChange.bind( this, "newLabel" );
    this.addLabel = this.addLabel.bind( this );
  }

  handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }
  
  addLabel(event) {
    event.preventDefault();
    this.setState({
      labels: [ ...this.state.labels, this.state.newLabel ],
      newLabel: ''
    });
  }

  render() {
    const {
      labels,
      name,
      newLabel
    } = this.state;
    return (
      <div className="new-chart">
        <div className="new-chart__form-group">
          <label className="new-chart__label">Chart Name:</label>
          <input
            className="new-chart__name new-chart__input"
            type="text"
            onChange={ this.handleNameChange }
            value={ name }
          />
        </div>
        <form className="new-chart__form-group" onSubmit={ this.addLabel }>
          <label className="new-chart__label">Add Label:</label>
          <input
            className="new-chart__category new-chart__input"
            required
            type="text"
            onChange={ this.handleLabelChange }
            value={ newLabel }
          />
        </form>

        <div className="new-chart__labels-wrapper">
          <label className="new-chart__label">Labels:</label>
          <span className="new-chart__labels">[ { labels.join(', ') } ] (Min. 3)</span>
        </div>

        <button className="new-chart__submit">
          Submit
        </button>
      </div>
    );
  }
}
```

</details>

<br />

You should now be able to go into your app and try putting in labels by typing in the label `input` field and pressing enter. You should see the text underneath update every time you press enter.

## Step 9

### Summary

In this step we will finish the functionality for our `NewChart` component by sending data to our reducer through the prop `createChart`.

### Instructions

* Open `NewChart.js`. ( `src/components/NewChart/NewChart.js` )
* Create a new class method called `submitChart`.
  * This method should exit if `this.state.name` is falsy or there aren't at least 3 labels.
  * Otherwise this method should call `this.props.createChart` with `labels` and `name` from `state`.
  * Then the method should use `this.setState` to set all `state` values back to their default values.
* Bind `this` to `submitChart` at the bottom of the `constructor` method.
* Add an `onClick` attribute that calls `submitChart` on the element with the `className` of `"new-chart__submit"`.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `NewChart.js` ( `src/components/NewChart/NewChart.js `). Next let's create our last class method called `submitChart`. This method won't need any parameters. The first thing the method should do is check to see if `this.state.name` is not falsy and that `this.state.labels` has 3 or more labels. If either of these conditions aren't met our method should call `return` to exit the method early.

```js
submitChart() {
  if ( !this.state.name || this.state.labels < 3 ) {
    return;
  }
}
```

If both conditions are met then we should then call `this.props.createChart` with our `labels` and `name` from `state`.

```js
submitChart() {
  if ( !this.state.name || this.state.labels < 3 ) {
    return;
  }

  this.props.createChart(this.state.labels, this.state.name);
}
```

Finally our method should reset all `state` values back to their default values using `setState`.

```js
submitChart() {
  if ( !this.state.name || this.state.labels < 3 ) {
    return;
  }

  this.props.createChart(this.state.labels, this.state.name);
  this.setState({ 
    labels: [],
    name: '',
    newLabel: ''
  });
}
```

Next, let's `bind` `this` to our method at the bottom of the `constructor` method.

```js
this.submitChart = this.submitChart.bind( this );
```

Now all that's left is to hook up our method to our `Submit` button using an `onClick` attribute. Locate the `button` element with the `className` of `"new-chart__submit"` and add an `onClick` that calls our `submitChart` method.

```jsx
<button className="new-chart__submit" onClick={ this.submitChart }>
  Submit
</button>
```

</details>

### Solution

<details>

<summary> <code> src/components/NewChart/NewChart.js </code> </summary>

```jsx
import React, { Component, PropTypes } from "react";

import "./NewChart.css";

export default class NewChart extends Component {
  static propTypes = { createChart: PropTypes.func.isRequired };

  constructor( props ) {
    super( props );

    this.state = {
      labels: [],
      name: '',
      newLabel: ''
    };

    this.handleNameChange = this.handleChange.bind( this, "name" );
    this.handleLabelChange = this.handleChange.bind( this, "newLabel" );
    this.addLabel = this.addLabel.bind( this );
    this.submitChart = this.submitChart.bind( this );
  }

  handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }
  
  addLabel(event) {
    event.preventDefault();
    this.setState({
      labels: [ ...this.state.labels, this.state.newLabel ],
      newLabel: ''
    });
  }

  submitChart() {
    if ( !this.state.name || this.state.labels < 3 ) {
      return;
    }

    this.props.createChart(this.state.labels, this.state.name);
    this.setState({ 
      labels: [],
      name: '',
      newLabel: ''
    });
  }

  render() {
    const {
      labels,
      name,
      newLabel
    } = this.state;
    return (
      <div className="new-chart">
        <div className="new-chart__form-group">
          <label className="new-chart__label">Chart Name:</label>
          <input
            className="new-chart__name new-chart__input"
            type="text"
            onChange={ this.handleNameChange }
            value={ name }
          />
        </div>
        <form className="new-chart__form-group" onSubmit={ this.addLabel }>
          <label className="new-chart__label">Add Label:</label>
          <input
            className="new-chart__category new-chart__input"
            required
            type="text"
            onChange={ this.handleLabelChange }
            value={ newLabel }
          />
        </form>

        <div className="new-chart__labels-wrapper">
          <label className="new-chart__label">Labels:</label>
          <span className="new-chart__labels">[ { labels.join(', ') } ] (Min. 3)</span>
        </div>

        <button className="new-chart__submit" onClick={ this.submitChart }>
          Submit
        </button>
      </div>
    );
  }
}
```

</details>

## Step 10

### Summary

In this step we will be rendering the chart and updating the sidebar to list all past charts.

### Instructions

* Render the `ActiveChart` component into `App`
* Pass the `activeChart` prop to the `ActiveChart` component
* Create `SET_ACTIVE_CHART_INDEX` action type/creator
* Connect the `setActiveChartIndex` action creator to `App`
* Pass `charts` and `setActiveChartIndex` props to `Sidebar`
* Refactor `Sidebar` to display a list of past charts

<details>

<summary> Detailed Instructions </summary>

After all the hard work we've done so far, it's time to finally display a chart! Start by opening up `src/components/App.js` and import `ActiveChart` from `src/components/ActiveChart/ActiveChart`. At the top of the `render` method, destructure `activeChart` and `charts` from `this.props`. Inside of the `render` method's `return`, just beneath the closing `</header>` tag, add a div with the class `app__active-chart`. Place the `ActiveChart` component into this new div and give it a `chart` prop set equal to the `activeChart` object we are getting from Redux.

The example chart from initial state should now be showing up in the page! And if you create another chart, the new one will replace the example.

Now that we can create and actually _see_ multiple charts (even if we can't add data to them yet) we need a way to navigate between them. We'll set up the logic for this in`src/ducks/chart.js`. At the top of the file create a new action type of `SET_ACTIVE_CHART_INDEX` set equal to `"SET_ACTIVE_CHART_INDEX"`.

Underneath the reducer create a `setActiveChartIndex` action creator that takes a single parameter `index` and returns an object with a `type` property of `SET_ACTIVE_CHART_INDEX` and an `index` property set equal to the `index` parameter.

Lastly we need to handle this action in the `chart` reducer, luckily this will be pretty easy. Add a `case` checking against `SET_ACTIVE_CHART_INDEX`, this `case` should return a new state object where `activeChartIndex` is set equal to `action.index` and `charts` is set equal to `state.charts`.

Head back over to `src/components/App.js` and import the new `setActiveChartIndex` action creator. Add `setActiveChartIndex` as another property to the action creators object passed to `connect`. Destructure `setActiveChartIndex` in `App`'s `render` method. Pass two new props to `Sidebar` - `charts` and `setActiveChartIndex`.

Open up `src/components/Sidebar/Sidebar.js`. We'll need to `map` over the charts passed to this component to create a list of charts. Above the `return` create a new variable named `pastCharts` and set it equal to the result of mapping over `charts` and returning the following JSX:

```jsx
<li
	className="sidebar__past-chart"
	key={ chart.name }
>
	<p
		className="sidebar__chart-name"
		// Remember that .map will provide the element's index
		// as a second parameter
		onClick={ () => setActiveChartIndex( index ) }
	>
		{ chart.name }
	</p>
	<p className="sidebar__chart-datasets">{ chart.datasets.length } Datasets</p>
</li>
```

Replace the static `<li>` element and its contents with the `pastCharts` variable. You should now be able to create multiple charts and navigate between them by clicking on the appropriate sidebar links.

</details>

### Solution

<details>

<summary><code>src/components/App.js</code></summary>

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import { createChart, setActiveChartIndex } from "../ducks/chart";

import ActiveChart from "./ActiveChart/ActiveChart";
import NewChart from "./NewChart/NewChart";
import Sidebar from "./Sidebar/Sidebar";

class App extends Component {
	render() {
		const {
			  activeChart
			, charts
			, createChart
			, setActiveChartIndex
		} = this.props;

		return (
			<div className="app">
				<Sidebar
					charts={ charts }
					setActiveChartIndex={ setActiveChartIndex }
				/>
				<main className="app__main">
					<header className="app__header">
						<h1 className="app__title">Categorizer</h1>

						<div className="app__new-chart">
							<NewChart createChart={ createChart } />
						</div>
					</header>
					<div className="app__active-chart">
						<ActiveChart chart={ activeChart } />
					</div>
				</main>
			</div>
		);
	}
}

function mapStateToProps( { activeChartIndex, charts } ) {
	return {
		  activeChart: charts[ activeChartIndex ]
		, charts
	};
}

export default connect( mapStateToProps, { createChart, setActiveChartIndex } )( App );
```

</details>

<details>

<summary><code>src/ducks/chart.js</code></summary>

```javascript
const CREATE_CHART = "CREATE_CHART";
const SET_ACTIVE_CHART_INDEX = "SET_ACTIVE_CHART_INDEX";

const initialState = {
	  activeChartIndex: 0
	, charts: [ {
		  labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ]
		, name: "Example Chart"
		, datasets: [
			{
				  label: "My First dataset"
				, data: [65, 59, 90, 81, 56, 55, 40]
			}
			, {
				  label: "My Second dataset"
				, data: [28, 48, 40, 19, 96, 27, 100]
			}
		]
	} ]
};

export default function chart( state = initialState, action ) {
	switch ( action.type ) {
		case CREATE_CHART:
			return {
				  activeChartIndex: 0
				, charts: [ action.chart, ...state.charts ]
			};
		case SET_ACTIVE_CHART_INDEX:
			return {
				  activeChartIndex: action.index
				, charts: state.charts
			};
		default: return state;
	}
}

export function createChart( labels, name ) {
	return {
		  chart: { labels, name, datasets: [] }
		, type: CREATE_CHART
	}
}

export function setActiveChartIndex( index ) {
	return { index, type: SET_ACTIVE_CHART_INDEX };
}
```

</details>

<details>

<summary><code>src/components/Sidebar.js</code></summary>

```jsx
import React, { PropTypes } from "react";

import "./Sidebar.css";

export default function Sidebar( { charts, setActiveChartIndex } ) {
	const pastCharts = charts.map( ( chart, index ) => (
		<li
			className="sidebar__past-chart"
			key={ chart.name }
		>
			<p
				className="sidebar__chart-name"
				onClick={ () => setActiveChartIndex( index ) }
			>
				{ chart.name }
			</p>
			<p className="sidebar__chart-datasets">{ chart.datasets.length } Datasets</p>
		</li>
	) );
	return (
		<aside className="sidebar">
			<h3 className="sidebar__title">Past Charts</h3>

			<ul className="sidebar__past-charts">
				{ pastCharts }
			</ul>
		</aside>
	);
}

Sidebar.propTypes = {
	  charts: PropTypes.arrayOf( PropTypes.object ).isRequired
	, setActiveChartIndex: PropTypes.func.isRequired
};
```

</details>

## Step 9

### Summary

In this step we will be creating the reducer logic that allows the adding of datasets.

### Instructions

* Create an `ADD_DATASET` action type and corresponding action creator
* Alter the `chart` reducer to handle the new action type
* Connect the `addDataset` action creator to `App`
* Render the `AddDataset` component into `App`, passing the `addDataset` action creator as a prop

<details>

<summary> Detailed Instructions </summary>

We'll begin this step in `src/ducks/chart.js`. Create a new action type of `ADD_DATASET` at the top of the file. Underneath the reducer create and export the corresponding action creator - `addDataset`. `addDataset` will take a single parameter `dataset` and return an object with two properties

* `type` set equal to `ADD_DATASET`
* `dataset` set equal to the `dataset` parameter. This will be an array of numbers that corresponds to the labels on the chart.

Lastly we need to update the reducer to handle this action. Add a `case` checking the `action.type` against `ADD_DATASET`. For this `case` we will need to return a new object where:

* `activeChartIndex` is set equal to `state.activeChartIndex`
* `charts` is is a copy of `state.charts` with the a new dataset added to the active chart

It will look something like this
```javascript
// Note the brackets around this case. This prevents variables
// from leeching into a different scope.
case ADD_DATASET: {
	// Saving ourselves some typing and clean up code by destructuring
	// values we will be using often.
	const { activeChartIndex, charts } = state;
	const activeChart = charts[ activeChartIndex ];
	return {
		  activeChartIndex
		, charts: [
			  // Making a copy of all the charts before the active chart
			  ...charts.slice( 0, activeChartIndex )
			  // Replacing the active chart with a modified copy
			, Object.assign(
				  {}
				, activeChart
				, { datasets: [ ...activeChart.datasets, action.dataset ] }
			)
			  // Making a copy of all the charts after the active chart
			, ...charts.slice( activeChartIndex + 1, charts.length )
		]
	}
}
```

That's it for this reducer, now we can finish up this step in `src/components/App.js`. Import `addDataset` from `src/ducks/chart.js` and `AddDataset` from `src/components/AddDataset/AddDataset.js`. Add `addDataset` to the action creators object that is being passed to `connect` and destructure it from `this.props` in `render`.

Add the `AddDataset` component into `App`'s `render` method just below `ActiveChart`, passing two props:

* `addDataset` - The `addDataset` action creator
* `labels` - Set equal to `activeChart.labels`

You should now see the skeleton of the `AddDataset` component to the right of the chart. We can't do much with it, but we'll fix that in the next step!

</details>

### Solution

<details>

<summary><code>src/ducks/chart.js</code></summary>

```javascript
const ADD_DATASET = "ADD_DATASET";
const CREATE_CHART = "CREATE_CHART";
const SET_ACTIVE_CHART_INDEX = "SET_ACTIVE_CHART_INDEX";

const initialState = {
	  activeChartIndex: 0
	, charts: [ {
		  labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ]
		, name: "Example Chart"
		, datasets: [
			{
				  label: "My First dataset"
				, data: [65, 59, 90, 81, 56, 55, 40]
			}
			, {
				  label: "My Second dataset"
				, data: [28, 48, 40, 19, 96, 27, 100]
			}
		]
	} ]
};

export default function chart( state = initialState, action ) {
	switch ( action.type ) {
		case ADD_DATASET: {
			const { activeChartIndex, charts } = state;
			const activeChart = charts[ activeChartIndex ];
			return {
				  activeChartIndex
				, charts: [
					  ...charts.slice( 0, activeChartIndex )
					, Object.assign(
						  {}
						, activeChart
						, { datasets: [ ...activeChart.datasets, action.dataset ] }
					)
					, ...charts.slice( activeChartIndex + 1, charts.length )
				]
			}
		}
		case CREATE_CHART:
			return {
				  activeChartIndex: 0
				, charts: [ action.chart, ...state.charts ]
			};
		case SET_ACTIVE_CHART_INDEX:
			return {
				  activeChartIndex: action.index
				, charts: state.charts
			};
		default: return state;
	}
}

export function addDataset( dataset ) {
	return { dataset, type: ADD_DATASET };
}

export function createChart( labels, name ) {
	return {
		  chart: { labels, name, datasets: [] }
		, type: CREATE_CHART
	}
}

export function setActiveChartIndex( index ) {
	return { index, type: SET_ACTIVE_CHART_INDEX };
}

```

</details>

<details>

<summary><code>src/components/App.js</code></summary>

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import { addDataset, createChart, setActiveChartIndex } from "../ducks/chart";

import ActiveChart from "./ActiveChart/ActiveChart";
import AddDataset from "./AddDataset/AddDataset";
import NewChart from "./NewChart/NewChart";
import Sidebar from "./Sidebar/Sidebar";

class App extends Component {
	render() {
		const {
			  activeChart
			, addDataset
			, charts
			, createChart
			, setActiveChartIndex
		} = this.props;

		return (
			<div className="app">
				<Sidebar
					charts={ charts }
					setActiveChartIndex={ setActiveChartIndex }
				/>
				<main className="app__main">
					<header className="app__header">
						<h1 className="app__title">Categorizer</h1>

						<div className="app__new-chart">
							<NewChart createChart={ createChart } />
						</div>
					</header>
					<div className="app__active-chart">
						<ActiveChart chart={ activeChart } />
						<AddDataset
							addDataset={ addDataset }
							labels={ activeChart.labels }
						/>
					</div>
				</main>
			</div>
		);
	}
}

function mapStateToProps( { activeChartIndex, charts } ) {
	return {
		  activeChart: charts[ activeChartIndex ]
		, charts
	};
}

export default connect( mapStateToProps, { addDataset, createChart, setActiveChartIndex } )( App );

```

</details>

## Step 10

### Summary

In this step we will be updating the `AddDataset` component so a user can add data to their charts.

### Instructions

* Alter the `AddDataset` component to display a dynamic list of `input`s based on a chart's labels
* Alter the `AddDataset` component to handle user input and allow submitting of datasets

<details>

<summary> Detailed Instructions </summary>

This step will take place in `src/components/AddDataset/AddDataset.js`. We'll get started by creating a `constructor` method and creating an initial state. Normally we would create a property on state for each input, but we could have any number of inputs. How should we set up state to handle a dynamic number of inputs? In our case, we'll use an array.

`this.state` should have two properties:

* `label` - The name of the dataset currently being created, corresponds to our one static input. Defaults to an empty string
* `data` - The array where we will be storing values for the dataset. It will default to `new Array( props.labels.length ).fill( 0 )`. This will create an array with a length equal to the length of our data labels, then fill each index with `0`.

With our `state` set up, let's jump into `render` and create the dynamic data inputs. Destructure `labels` from `this.props` as well as `data` and `label` from `this.state`. Create a new variable `labelInputs` and set it equal to the result of `map`ping over `labels` and returning the following JSX:

```jsx
<div
	className="add-dataset__form-group"
	key={ label }
>
	<label className="add-dataset__label">{ label }:</label>
	<input
		className="add-dataset__input"
		max="100"
		min="0"
		required
		type="number"
		// Here is where we connect to this.state
		// If we ever re-ordered our list this wouldn't work!
		// Can you think of a solution that works even if the
		// list were to be sorted or reversed?
		value={ data[ index ] }
	/>
</div>
```

Render `labelInputs` just below the `div` with a class of `add-dataset__form-group`. While we're here, let's update the "Dataset Label" input. Pass the input a `value` prop set equal to `label`.

Now we've got a list of inputs all defaulting to 0, let's write a method to edit them! Create a new method `handleDataChange` that takes two paremeters:

* `changedIndex` - The index of the data input that changed
* `event` - The DOM event that triggered the change handler and carries the new value

This method will work in a very similar way as the `ADD_DATASET` handler in our `chart` reducer. We need to grab a copy of all the elements before the changed index, insert the updated value, and grab a copy of all the elements after the changed index. It will look something like this:

```javascript
handleDataChange( changedIndex, event ) {
	const { data } = this.state;
	this.setState( {
		data: [
			  ...data.slice( 0, changedIndex )
			, parseInt( event.target.value, 10 )
			, ...data.slice( changedIndex + 1, data.length )
		]
	} );
}
```

We'll also need a method to handle a change from the label input. `handleLabelChange` will take a single `event` parameter and will update `label` on state to equal `event.target.value`.

Bind `handleLabelChange` in the constructor and pass it to the appropriate input's `onChange` prop. Pass `handleDataChange` to the data inputs, binding in `render` and passing `index` as an argument: `onChange={ this.handleDataChange.bind( this, index ) }`.

Lastly we need to be able to submit these datasets to Redux. Create a method `handleSubmit` that takes in an `event` parameter. This method will do the following:

* Call `event.preventDefault` to stop the browser from taking its default action
* Destructure `data` and `label` from `this.state`
* Destructure `addDataset` and `labels` from `this.props`
* Call the `addDataSet` action creator, passing an object with two properties as an argument
	* `data` - Set equal to `data.map( datum => parseInt( datum, 10 ) )`
	* `label` - Set equal to the `label` variable
* Reset state back to its initial value

Finally, bind `handleSubmit` in the constructor and pass it to the `form` element's `onSubmit` prop. You should now be able to create charts, navigate between charts, add datasets to existing charts, and see those datasets display!

**But wait! A bug?**

Uh oh, it looks like creating a chart with more labels than the active chart doesn't work properly! The extra inputs won't be given a default value and React will throw some angry warnings. What is happening here?

The constructor is only invoked once, when the component is first created. This means that we are only creating the `data` array on state a single time, it never updates. To fix this we need to make use of one of React's lifecycle methods - `componentWillReceiveprops`. `componentWillReceiveProps` is called whenever props are passed to the component and takes a single argument `nextProps` - the new props being passed. What we need to do is check if `nextProps` does not equal `this.props`, and update `this.state.data` accordingly. It will look like this:

```javascript
componentWillReceiveProps( nextProps ) {
	if ( nextProps !== this.props ) {
		this.setState( { data: new Array( nextProps.labels.length ).fill( 0 ) } );
	}
}
```

Bug fixed! We're all done here!

</details>

### Solution

<details>

<summary> <code> src/components/AddDataset/AddDataset.js </code> </summary>

```jsx
import React, { Component, PropTypes } from "react";

import "./AddDataset.css";

export default class AddDataset extends Component {
	static propTypes = {
		  addDataset: PropTypes.func.isRequired
		, labels: PropTypes.arrayOf( PropTypes.string ).isRequired
	};

	constructor( props ) {
		super( props );

		this.state = {
			  data: new Array( props.labels.length ).fill( 0 )
			, label: ""
		};

		this.handleLabelChange = this.handleLabelChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps !== this.props ) {
			this.setState( { data: new Array( nextProps.labels.length ).fill( 0 ) } );
		}
	}

	handleDataChange( changedIndex, event ) {
		const { data } = this.state;
		this.setState( {
			data: [
				  ...data.slice( 0, changedIndex )
				, parseInt( event.target.value, 10 )
				, ...data.slice( changedIndex + 1, data.length )
			]
		} );
	}

	handleLabelChange( event ) {
		this.setState( { label: event.target.value } );
	}

	handleSubmit( event ) {
		event.preventDefault();

		const { data, label } = this.state;
		const { addDataset, labels } = this.props;

		addDataset( { data: data.map( datum => parseInt( datum, 10 ) ), label } );

		this.setState( {
			  data: new Array( labels.length ).fill( 0 )
			, label: ""
		} );
	}

	render() {
		const { labels } = this.props;
		const { data, label } = this.state;

		const labelInputs = labels.map( ( label, index ) => (
			<div
				className="add-dataset__form-group"
				key={ label }
			>
				<label className="add-dataset__label">{ label }:</label>
				<input
					className="add-dataset__input"
					max="100"
					min="0"
					onChange={ this.handleDataChange.bind( this, index ) }
					required
					type="number"
					value={ data[ index ] }
				/>
			</div>
		) );

		return (
			<form
				className="add-dataset"
				onSubmit={ this.handleSubmit }
			>
				<h3 className="add-dataset__header">Add Dataset</h3>
				<div className="add-dataset__form-group">
					<label className="add-dataset__label">Dataset Label:</label>
					<input
						className="add-dataset__input"
						onChange={ this.handleLabelChange }
						required
						type="text"
						value={ label }
					/>
				</div>
				{ labelInputs }
				<button
					className="add-dataset__submit"
					type="submit"
				>
					Submit
				</button>
			</form>
		);
	}
}
```

</details>

</details>

## Black Diamond

* Right now all data is lost on refresh, look into using [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to save a user's data.
* Currently the color of datasets is randomized. Try allowing users to [select colors](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color) for their datasets.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>